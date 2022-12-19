import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";

export class TrueInAtLeast extends Assert {
    public fullfilRequirements(rules : Rule[], input: Atom[]): AspInput[] {

        let outp : AspInput[]= []

        let stringRules : string[] = []

        rules.forEach((r) => stringRules.push(r.content))

        this.atoms.forEach(element => {
            let tempRules : string[]= stringRules
            tempRules.push(`:- not ${element.stringify()}`)
            outp.push(new AspInput(tempRules,input))
        });

        return outp;
    }
    

    public assert(outputs: [Output]): boolean {
        return outputs.every((o) => o.answers.length >= this.number);
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