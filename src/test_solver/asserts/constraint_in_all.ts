import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";


export class ConstraintInAll extends Assert {
    public fullfilRequirements(rules: Rule[], input: Atom[]): { [id: string]: AspInput; } {

        let outp : { [id: string]: AspInput; } = {}

        let stringRules : string[] = []

        rules.forEach((r) => stringRules.push(r.content.stringify()))

        this.constraints.forEach(element => {
            if(element == '') return
            let tempRules : string[]= stringRules
            tempRules.push(`constrAux(1) :- ${element}.`)
            tempRules.push(":- not constrAux(1).")
            outp[element] = (new AspInput(tempRules,input))
        });

        return outp;
    }

    public assert(outputs: { [id: string]: Output; }): string[] {
        let ret : string []= [] 
        Object.entries(outputs).forEach((o) => {
            if(o[1].answers.length != 0) 
            ret.push(`the constraint ${o[0]} is not satisfied in every answer set (${o[1].answers.length} not satisfying).`) })
        return ret;
    }


    public constructor(
        public constraints: string[]
    ) { super() }

    public preConditions(): preConditions {
        return new preConditions(["EVERY_ATOM_CONSTRAINT"], "-n0", true);
    }

}