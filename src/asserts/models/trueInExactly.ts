import { DlvModel } from "../../dlv_output_parser/interfaces/dlv_model";
import { AnswerSet } from "../../dlv_output_parser/models/answer_set";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { convertedAtoms } from "../../utils/utils";
import { DlvAssert } from "../interfaces/dlvAssert";

export class TrueInExactly extends DlvAssert {
    protected FullfilRequirements(model: DlvModel): DlvModel {
        return model;
    }

    public PreConditions(): object {
        return {
            "input": [""],
            "options" : ["-n0"]
        };
    }
    
    public constructor(
        public number:number,
        public atoms : string[]
    ){
        super()
    }

    public override validate(output: Output): boolean {
        let count = 0
        for(let j=0;j < output.answers.length;j++){
            if(output.answers[j].containsAllAtoms(convertedAtoms(this.atoms))){
                count++
            }
        }
        return count === this.number
    }

    
}