import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { arrayContainsAll } from "../../utils/utils";
import { DlvAssert } from "../interfaces/dlvAssert";

export class TrueInAll extends DlvAssert {

    public constructor(
        public atoms : Atom[]
    ){super()}

    public validate(output: Output): boolean {
        return output.answers.every(ans => arrayContainsAll(ans.atoms, this.atoms))
    }
}