import { DlvOutputModel } from "../../common/interfaces/dlv_model";
import { areArrayEqualNoOrder, fillMissingValues } from "../../common/utils";
import { AnswerSet } from "./answer_set";

export class Output extends DlvOutputModel {
    constructor(
        public answers: AnswerSet[]) {
        super()
    }

    public static override get regex(): RegExp {
        return /^(\{\})|(INCOHERENT)|{((?:(?:[a-z]\w*)\((?:\w+(?:,\w+)*)\)[,\s]*)+)}(?:\nCOST ((?:\d+@\d+[\s\n]*)+))*\n*(OPTIMUM)*/gm
    }

    protected static override tranform(matches: RegExpMatchArray): Output {
        
        if (matches.length === 1 && matches[0] === "INCOHERENT") return new Output([])
        if (matches.length === 1 && matches[0] === "{}") return new Output([])

        let answer_sets: AnswerSet[] = matches.map((raw_answer: string) => AnswerSet.parse(raw_answer) as AnswerSet)

        if(answer_sets.length <= 1) new Output(answer_sets);

        for (let i = 0; i < answer_sets.length; i++) {
            for (let j = i + 1; j < answer_sets.length; j++) {
                let first = answer_sets[i]
                let second = answer_sets[j]
                //if there are two answer set with same atoms
                if (areArrayEqualNoOrder(first.atoms, second.atoms)) {
                    //merge costs & optimatility into first
                    first.costs = fillMissingValues(second.costs, first.costs)
                    first.optimum = second.optimum || first.optimum
                    //remove second
                    answer_sets.splice(j, 1)
                }
            }
        }

        //'dall'ultimo che ha un costo fino in fondo hanno tutti lo stesso costo e sono tutti ottimi
        let ultimoConCosto : number | undefined = Output.getUltimoConCosto(answer_sets);
        if(ultimoConCosto !== undefined){
            let propagator : AnswerSet = answer_sets[ultimoConCosto];
            for (let i = ultimoConCosto; i < answer_sets.length; i++) {
                const as = answer_sets[i];
                as.optimum = true;
                as.costs = propagator.costs;
            }
        }

        return new Output(answer_sets);
    }

    public override stringify(): string {
        return `${this.answers.map(ans => ans.stringify()).join("\n\n")}`
    }

    private static getUltimoConCosto(answers : AnswerSet[]) : number | undefined {
        for (let i = answers.length-1; i > -1; i--) {
            const answer = answers[i];
            if(answer.costs.length > 0)
                return i;
        }
        return undefined;
    }

}