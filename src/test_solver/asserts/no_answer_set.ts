import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";

export class NoAnswerSet extends Assert {
    public fullfilRequirements(rules: Rule[], input: Atom[]): { [id: string]: AspInput; } {
        let tempRules: string[] = []
        rules.forEach((r) => tempRules.push(r.content) )
        return {"0" : new AspInput(tempRules, input)};
    }
    public assert(outputs: { [id: string]: Output; }): string[] {

        let ret : string []= [] 
        Object.entries(outputs).forEach((o) => {
            if(o[1].answers.length != 0) 
            ret = 
            [`Test failed: there ${(o[1].answers.length == 1) ?
                "is an answer set." :
                `are ${o[1].answers.length} answer sets.`}`]})
        return ret;
    }
    
    public preConditions(): preConditions {
        return new preConditions([""],"-n0");
    }
}