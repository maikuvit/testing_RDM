import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";


export class ConstraintInAtMost extends Assert {
    public fullfilRequirements(rules: Rule[], input: Atom[]): { [id: string]: AspInput; } {
        

        console.log(this.constraints)
        let outp : { [id: string]: AspInput; } = {}

        let stringRules : string[] = []

        rules.forEach((r) => stringRules.push(r.content))

        this.constraints.forEach(element => {
            let tempRules : string[]= stringRules
            tempRules.push(`constrAux :- ${element}`)
            tempRules.push(":- not constrAux.")
            outp[element] = (new AspInput(tempRules,input))
        });

        return outp;
    }

    public assert(outputs: { [id: string]: Output; }): string[] {
        let ret : string []= [] 
        Object.entries(outputs).forEach((o) => {
            if(o[1].answers.length != this.number) 
            ret.push(`the constraint ${o[0]} is not satisfied in exactly ${this.number} answer set (${o[1].answers.length}).`) })
        return ret;
    }


    public constructor(
        public number: number,
        public constraints: string[]
    ) { super() }

    public preConditions(): preConditions {
        return new preConditions(["EVERY_ATOM_CONSTRAINT"], "-n0", true);
    }

}