import { Atom } from "../../dlv_output_parser/models/atom";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";

import { preConditions } from "../pre_conditions";
import { DlvOutputModel } from "./dlv_model";

export abstract class Assert {

    //Asserts can require different conditions to be satisfied, that will be implemented in this method 

    //restituisco per comodità direttamente array di string 
    //      (non il massimo, ma manca obj che rappresenti gruppo rules/atoms )

    //edit: ho creato un obj che rappresenti gruppo rules/atoms (#quickCoding)
    public abstract fullfilRequirements(rules : Rule[], input: Atom[]): AspInput[]

    public abstract assert(models: DlvOutputModel[]): boolean

    public abstract preConditions(): preConditions
}