import { Assert } from "../../../common/interfaces/assert";
import { DlvOutputModel } from "../../../common/interfaces/dlv_model";
import { Atom } from "../../../dlv_output_parser/models/atom";
import { Output } from "../../../dlv_output_parser/models/output";

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
        public atoms: Atom[]
    ) {
        super()
    }

    protected override validate(output: Output): boolean {
        let count = 0
        for (let j = 0; j < output.answers.length; j++) {
            if (output.answers[j].containsAllAtoms(this.atoms)) {
                count++
            }
        }
        return count === this.number
    }


}