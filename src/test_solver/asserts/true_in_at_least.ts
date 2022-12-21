import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";

export class TrueInAtLeast extends Assert {

    public fullfilRequirements(rules: Rule[], input: Atom[]): { [id: string]: AspInput; } {
        
        let outp : { [id: string]: AspInput; } = {}

        let stringRules : string[] = []

        rules.forEach((r) => stringRules.push(r.content))

        this.atoms.forEach(element => {
            let tempRules : string[]= stringRules
            tempRules.push(`:- not ${element.stringify()}`)
            outp[element.stringify()] = (new AspInput(tempRules,input))
        });

        return outp;
    }    

    public assert(outputs: { [id: string]: Output; }): string[] {
        let ret : string []= [] 
        Object.entries(outputs).forEach((o) => {
            if(o[1].answers.length >= this.number) 
            ret.push(`the atom ${o[0]} appears in more than ${this.number} answer sets (${o[1].answers.length}).`) })
        return ret;
    }


    public preConditions(): preConditions {
        return new preConditions([""],"-n0");
    }
    
    public constructor(
        public number: number,
        public atoms: Atom[]
    ) {
        super()
    }

}