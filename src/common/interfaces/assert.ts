import { DlvOutputModel } from "./dlv_model";

export abstract class Assert {

    //Asserts can require different conditions to be satisfied, that will be implemented in this method 
    public abstract fullfilRequirements(model: DlvOutputModel): DlvOutputModel

    public abstract validate(model: DlvOutputModel): boolean

    public assert(model: DlvOutputModel): boolean {
        return this.validate(this.fullfilRequirements(model));
    }

    public abstract preConditions(): any
}