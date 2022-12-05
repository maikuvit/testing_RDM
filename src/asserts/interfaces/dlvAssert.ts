import { DlvModel } from "../../dlv_output_parser/interfaces/dlv_model";

export abstract class DlvAssert {

    public abstract validate(model : DlvModel) : boolean

}