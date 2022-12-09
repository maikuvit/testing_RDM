import { Assert } from "../../../common/interfaces/assert";
import { DlvOutputModel } from "../../../common/interfaces/dlv_model";
import { Output } from "../../../dlv_output_parser/models/output";

export class NoAnswerSet extends Assert {
    public preConditions(): any {
        return {};
    }
    protected override fullfilRequirements(model: Output): DlvOutputModel {
        // no requirements at all ...
        return model;
    }
    protected override validate(output: Output): boolean {

        return output.answers.length === 0;
    }


}