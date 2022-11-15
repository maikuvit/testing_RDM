import { areArrayEqualNoOrder, fillMissingValues } from "../../utils/utils";
import { DlvModel } from "../interfaces/dlv_model";
import { AnswerSet } from "./answer_set";

export class Output extends DlvModel {
    constructor(
        public answers: AnswerSet[]) {
        super()
    }

    public static get regex(): RegExp {
        return new RegExp(AnswerSet.regex, 'g')
    }

    protected static tranform(matches: RegExpMatchArray): Output {
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

        return new Output(answer_sets);
    }

}