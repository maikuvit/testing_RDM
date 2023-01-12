import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";


export class TrueInAll extends Assert {
    public fullfilRequirements(rules: Rule[], input: Atom[]): { [id: string]: AspInput; } {
        
        let outp : { [id: string]: AspInput; } = {}

        let stringRules : string[] = []

        rules.forEach((r) => stringRules.push(r.content.stringify()))

        this.atoms.forEach(element => {
            let tempRules : string[]= stringRules
            tempRules.push(`:- ${element.stringify()}`)
            outp[element.stringify()] = (new AspInput(tempRules,input))
        });

        return outp;
    }

    public assert(outputs: { [id: string]: Output; }): string[] {
        let ret : string []= [] 
        Object.entries(outputs).forEach((o) => {
            if(o[1].answers.length != 0) 
            ret.push(`the atom ${o[0]} does not appear in every answer set (${o[1].answers.length} without it).`) })
        return ret;
    }


    public constructor(
        public atoms: Atom[]
    ) { super() }

    public preConditions(): preConditions {
        return new preConditions(["EVERY_ATOM_CONSTRAINT"], "-n0", true);
    }

}