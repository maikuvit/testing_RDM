import { Assert } from "../../common/interfaces/assert";
import { DlvOutputModel } from "../../common/interfaces/dlv_model";
import { preConditions } from "../../common/pre_conditions";
import { Output } from "../../dlv_output_parser/models/output";

export class NoAnswerSet extends Assert {
    public assert(output: Output): boolean {
        return output.answers.length === 0;
    }

    public preConditions(): preConditions {
        return new preConditions(); //empty constructor, default params ... 
    }

    public override fullfilRequirements(model: Output): [DlvOutputModel] {
        return [model];
    }

}