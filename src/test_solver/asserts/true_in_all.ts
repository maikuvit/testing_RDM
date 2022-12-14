import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";


export class TrueInAll extends Assert {

    public fullfilRequirements(rules : Rule[], input: Atom[]): [AspInput] {
        

        // da finire !
        return [new AspInput(rules,input)];
    }

    public constructor(
        public atoms: Atom[]
    ) { super() }

    public preConditions(): preConditions {
        return new preConditions(["EVERY_ATOM_CONSTRAINT"], "-n0", true);
    }


    public assert(outputs: [Output]): boolean {
        return outputs.every((o) => o.answers.length === 0);
    }
}