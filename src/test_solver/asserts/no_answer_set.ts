import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";

export class NoAnswerSet extends Assert {
    
    public fullfilRequirements(rules : Rule[], input: Atom[]): [AspInput] {
        let tempRules: string[] = []
        rules.forEach((r) => tempRules.push(r.content) )
        return [new AspInput(tempRules, input)];
    }

    public assert(outputs: [Output]): boolean {
        return outputs.every((o : Output) => o.answers.length === 0);
    }

    public preConditions(): preConditions {
        return new preConditions(); //empty constructor, default params ... 
    }


}