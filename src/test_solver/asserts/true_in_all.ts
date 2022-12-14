import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";


export class TrueInAll extends Assert {

    public fullfilRequirements(input: Atom[], rules: Rule[]): [AspInput] {

        
        return new AspInput(rules);
    }

    public constructor(
        public atoms: Atom[]
    ) { super() }

    public preConditions(): preConditions {
        return new preConditions(["EVERY_ATOM_CONSTRAINT"], "-n0", true);
    }


    public assert(output: Output): boolean {
        return output.answers.length === 0;
    }
}