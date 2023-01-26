import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { areArrayEqualNoOrder } from "../../common/utils";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Cost } from "../../dlv_output_parser/models/cost";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/domain_primitives/rule";
import { AspInput } from "../../test_parser/models/asp_input";

export class BestModelCost extends Assert {

    private equalToCost = (arr: Cost[]) => { return areArrayEqualNoOrder(arr,this.cost) }
    public fullfilRequirements(rules: Rule[], input: Atom[]): { [id: string]: AspInput; } {
        let tempRules: string[] = []
        rules.forEach((r) => tempRules.push(r.content.stringify()) )
        return {"0" : new AspInput(tempRules, input)};
    }
    public assert(outputs: { [id: string]: Output; }): string[] {
        let ret : string []= [] 

        if (Object.keys(outputs).length== 0) return ["No answer sets produced"] 

        Object.entries(outputs).forEach((o) => {
            o[1].answers.forEach(as => {
                if(!this.equalToCost(as.costs))
                    ret.push(`Model has a different cost ${as.costs.toString()}`) 
            });
        })
        return ret;
    }
    public preConditions(): preConditions {
        return new preConditions();
    }

    public constructor(
        public cost: Cost[]
    ) { super() }
}
