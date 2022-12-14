import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";

export class NoAnswerSet extends Assert {
    
    public fullfilRequirements(input: Atom[], rules: Rule[]): [string] {
        let out : [string] = [""];

        return out;
    }

    public assert(output: Output): boolean {
        return output.answers.length === 0;
    }

    public preConditions(): preConditions {
        return new preConditions(); //empty constructor, default params ... 
    }


}