import { preConditions } from "../pre_conditions";
import { DlvOutputModel } from "./dlv_model";

export abstract class Assert {

    //Asserts can require different conditions to be satisfied, that will be implemented in this method 
    // nota: passare l'input del test a questo metodo! Non l'intero scope (non logicamente sensato) 
    
    //appunto: potrebbe avere senso includere tutte e due le info per generalizzare? 
    //      posso fare direttamente il return della roba da scrivere così 
    
    public abstract fullfilRequirements(input: DlvOutputModel): [DlvOutputModel]
    //     public abstract fullfilRequirements(input: Atom[]): [Atom]

    public abstract assert(model: DlvOutputModel): boolean

    public abstract preConditions(): preConditions
}