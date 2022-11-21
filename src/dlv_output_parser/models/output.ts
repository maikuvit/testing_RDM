import { areArrayEqualNoOrder, fillMissingValues } from "../../utils/utils";
import { DlvModel } from "../interfaces/dlv_model";
import { AnswerSet } from "./answer_set";
import { Cost } from "./cost";

export class Output extends DlvModel {
    constructor(
        public answers: AnswerSet[]) {
        super()
    }

    public static override get regex(): RegExp {
        return /^(INCOHERENT)|{((?:(?:[a-z]\w*)\((?:\w+(?:,\w+)*)\)[,\s]*)+)}(?:\nCOST ((?:\d+@\d+[\s\n]*)+))*\n*(OPTIMUM)*/gm
    }

    protected static override tranform(matches: RegExpMatchArray): Output {

        if(matches.length === 1 && matches[0] === "INCOHERENT") return new Output([])

        let answer_sets: AnswerSet[] = matches.map((raw_answer: string) => AnswerSet.parse(raw_answer) as AnswerSet)

        for(let i = 0; i < answer_sets.length; i++){
            for(let j = i + 1; j < answer_sets.length; j++){
                let first = answer_sets[i]
                let second = answer_sets[j]
                //if there are two answer set with same atoms
                if(areArrayEqualNoOrder(first.atoms, second.atoms)){
                    //merge costs & optimatility into first
                    first.costs = fillMissingValues(second.costs, first.costs)
                    first.optimum = second.optimum || first.optimum
                    //remove second
                    answer_sets.splice(j, 1)
                }
            }
        }

        //propaga ottimalità e costi in caso di piu answer_set (significa che ha weak ed è stato lanciato con -n0)
        //se ho piu di un answer_set sono tutti ottimi e hanno tutto lo stesso costo
        if(answer_sets.length > 1){
            let propagation_answer : AnswerSet | undefined = answer_sets.find((ans) => ans.costs.length > 0)
            if(propagation_answer){
                answer_sets = answer_sets.map(answer => {
                    answer.costs = propagation_answer?.costs || []
                    answer.optimum = true
                    return answer;
                })
            }
        }

        return new Output(answer_sets);
    }

    public override stringify(): string {
        return `${this.answers.map(ans => ans.stringify()).join("\n")}`
    }
}