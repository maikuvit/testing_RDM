import { Assert } from "../../common/interfaces/assert";
import { DlvOutputModel } from "../../common/interfaces/dlv_model";
import { arrayContainsAll } from "../../common/utils";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";

export class TrueInExactly extends Assert {
    
    public constructor(
        public number: number,
        public atoms: Atom[]
    ) {
        super()
    }

    public override fullfilRequirements(model: DlvOutputModel): DlvOutputModel {
        return model;
    }

    public preConditions(): any {
        return {
            "input": [""],
            "options": ["-n0"]
        };
    }

    public override validate(output: Output): boolean {
        let count = 0
        output.answers.forEach(ans => count += arrayContainsAll(ans.atoms, this.atoms) ? 1 : 0)
        return count === this.number
    }


}