import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";


export class ConstraintInAtMost extends Assert {
    public fullfilRequirements(rules: Rule[], input: Atom[]): { [id: string]: AspInput; } {
        
        let outp : { [id: string]: AspInput; } = {}

        let stringRules : string[] = []

        rules.forEach((r) => stringRules.push(r.content.stringify()))

        this.constraints.forEach(element => {
            if(element == '') return
            let tempRules : string[]= Object.assign([], stringRules);
            tempRules.push(`constrAux(1) :- ${element}.`)
            tempRules.push(":- not constrAux(1).")
            outp[element] = (new AspInput(tempRules,input))
        });
        
        return outp;
    }

    public assert(outputs: { [id: string]: Output; }): string[] {
        let ret : string []= [] 
        Object.entries(outputs).forEach((o) => {
            if(o[1].answers.length > this.number) 
            ret.push(`the constraint ${o[0]} is not satisfied in at most ${this.number} answer set (${o[1].answers.length}).`) })
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