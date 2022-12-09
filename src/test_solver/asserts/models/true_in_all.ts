import { Assert } from "../../../common/interfaces/assert";
import { DlvOutputModel } from "../../../common/interfaces/dlv_model";
import { Atom } from "../../../dlv_output_parser/models/atom";
import { Output } from "../../../dlv_output_parser/models/output";
import { arrayContainsAll } from "../../../utils/utils";

export class TrueInAll extends Assert {
    public preConditions(): object {
        return {
            "input": [""], //TO IMPLEMENT: add constraint for each atom in original input ...
            "options": ["-n0"]
        };
    }
    protected fullfilRequirements(model: DlvOutputModel): DlvOutputModel {
        let modcopy = model;

        return modcopy;
    }

    public constructor(
        public atoms: Atom[]
    ) { super() }

    protected validate(output: Output): boolean {
        return output.answers.every(ans => arrayContainsAll(ans.atoms, this.atoms))
    }
}