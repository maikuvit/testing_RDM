import { DlvModel } from "../../dlv_output_parser/interfaces/dlv_model";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { arrayContainsAll } from "../../utils/utils";
import { DlvAssert } from "../interfaces/dlvAssert";

export class TrueInAll extends DlvAssert {
    public PreConditions(): object {
        return {
            "input": [], //TO IMPLEMENT: add constraint for each atom in original input ...
            "options" : ["-n0"]
        };
    }
    protected FullfilRequirements(model: DlvModel): DlvModel {
        let modcopy = model; 
        
        return modcopy;
    }

    public constructor(
        public atoms : Atom[]
    ){super()}

    public validate(output: Output): boolean {
        return output.answers.every(ans => arrayContainsAll(ans.atoms, this.atoms))
    }
}