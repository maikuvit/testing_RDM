import { DlvModel } from "../../dlv_output_parser/interfaces/dlv_model";
import { AnswerSet } from "../../dlv_output_parser/models/answer_set";
import { Atom } from "../../dlv_output_parser/models/atom";
import { arrayContainsAll } from "../../utils/utils";

export abstract class DlvAssert {
    
    public abstract validate(model : DlvModel) : boolean
}

export abstract class AssertTrueIn {
    
    public constructor(
        public atoms: Atom[],
    ){}

    protected true_in_one(ans: AnswerSet): boolean{
        return arrayContainsAll(ans.atoms, this.atoms)
    }

    public abstract validate(model : DlvModel) : boolean

}