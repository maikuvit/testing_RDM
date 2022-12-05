import { DlvModel } from "../../dlv_output_parser/interfaces/dlv_model";

export abstract class DlvAssert {

    //Asserts can require different conditions to be satisfied, that will be implemented in this method 
    protected abstract FullfilRequirements(model : DlvModel) : DlvModel

    protected abstract validate(model : DlvModel) : boolean

    public assert(model : DlvModel): boolean{
        return this.validate(this.FullfilRequirements(model));
    }

    public abstract PreConditions() : any
}