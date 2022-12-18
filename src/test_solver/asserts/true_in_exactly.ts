import { Assert } from "../../common/interfaces/assert";
import { DlvOutputModel } from "../../common/interfaces/dlv_model";
import { preConditions } from "../../common/pre_conditions";
import { arrayContainsAll } from "../../common/utils";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";

export class TrueInExactly extends Assert {
    public fullfilRequirements(rules: Rule[], input: Atom[]): [AspInput] {
        return [new AspInput(rules,input)]
    }
    public assert(models: DlvOutputModel[]): boolean {
        throw new Error("Method not implemented.");
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