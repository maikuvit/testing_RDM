import { DlvOutputModel } from "../../../dlv_output_parser/interfaces/dlv_model";
import { Output } from "../../../dlv_output_parser/models/output";
import { convertedAtoms } from "../../../utils/utils";
import { Assert } from "../interfaces/assert";

export class TrueInExactly extends Assert {
    
    protected override fullfilRequirements(model: DlvOutputModel): DlvOutputModel {
        return model;
    }

    public preConditions(): any {
        return {
            "input": [""],
            "options": ["-n0"]
        };
    }

    public constructor(
        public number: number,
        public atoms: string[]
    ) {
        super()
    }

    protected override validate(output: Output): boolean {
        let count = 0
        for (let j = 0; j < output.answers.length; j++) {
            if (output.answers[j].containsAllAtoms(convertedAtoms(this.atoms))) {
                count++
            }
        }
        return count === this.number
    }


}