import { Assert } from "../../../common/interfaces/assert";
import { DlvOutputModel } from "../../../common/interfaces/dlv_model";
import { Output } from "../../../dlv_output_parser/models/output";
import { AspTest } from "../../../test_parser/models/asp_test";

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
            if (output.answers[j].containsAllAtoms(AspTest.convertedAtoms(this.atoms))) {
                count++
            }
        }
        return count === this.number
    }


}