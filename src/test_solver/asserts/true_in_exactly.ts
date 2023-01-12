import { Assert } from "../../common/interfaces/assert";
import { DlvOutputModel } from "../../common/interfaces/dlv_model";
import { preConditions } from "../../common/pre_conditions";
import { arrayContainsAll } from "../../common/utils";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";

export class TrueInExactly extends Assert {
    
    public fullfilRequirements(rules: Rule[], input: Atom[]): { [id: string]: AspInput; } {
    
        let outp : { [id: string]: AspInput; } = {}

        let stringRules : string[] = []

        rules.forEach((r) => stringRules.push(r.content.stringify()))

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
            if(o[1].answers.length != this.number) 
            ret.push(`the atom ${o[0]} appears in a number of answer sets different than ${this.number} (${o[1].answers.length}).`) })
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

    /*

    public fullfilRequirements(model: DlvOutputModel): [DlvOutputModel] {
         
        return [model];
    }

    public preConditions(): preConditions {
        return new preConditions([""], "-n0", false);
    }

    public override assert(output: Output): boolean {
    public override fullfilRequirements(model: DlvOutputModel): [DlvOutputModel] {
        return model;
    }

    public override validate(output: Output): boolean {
        let count = 0
        output.answers.forEach(ans => count += arrayContainsAll(ans.atoms, this.atoms) ? 1 : 0)
        return count === this.number
    }
*/

}