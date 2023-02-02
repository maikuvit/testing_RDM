import { Assert } from "../../common/interfaces/assert";
import { preConditions } from "../../common/pre_conditions";
import { areArrayEqualNoOrder } from "../../common/utils";
import { AnswerSet } from "../../dlv_output_parser/models/answer_set";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Cost } from "../../dlv_output_parser/models/cost";
import { Output } from "../../dlv_output_parser/models/output";
import { Rule } from "../../input_parser/models/rule";
import { AspInput } from "../../test_parser/models/asp_input";

export class BestModelCost extends Assert {

    private equalToCost = (arr: Cost[]) => { return areArrayEqualNoOrder(arr,this.costs) }
    public fullfilRequirements(rules: Rule[], input: Atom[]): { [id: string]: AspInput; } {
        let tempRules: string[] = []
        rules.forEach((r) => tempRules.push(r.content.stringify()) )
        return {"0" : new AspInput(tempRules, input)};
    }
    public assert(outputs: { [id: string]: Output; }): string[] {
        let ret : string []= [] 

        if (Object.keys(outputs).length== 0) return ["No answer sets produced"] 

        Object.entries(outputs).forEach((o) => {
    
            let bestAS : AnswerSet | undefined = o[1].answers.find(e => e.optimum);

            if(!bestAS)
                ret.push('No optimum produced.')
            else{

            if(!this.equalToCost(bestAS.costs)){
                let raw_costs = []
                for(let i=0;i<bestAS.costs.length;i++){
                    raw_costs.push(bestAS.costs[i].stringify())
                }
                ret.push(`Model has a different cost (${raw_costs.toString()})`) 
            }
            }
        })
        return ret;
    }
    public preConditions(): preConditions {
        return new preConditions();
    }

    public constructor(
        public costs: Cost[]

    ) { super()
    }
}
