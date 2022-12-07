import { DlvModel } from "../../dlv_output_parser/interfaces/dlv_model";
import { Output } from "../../dlv_output_parser/models/output";
import { DlvAssert } from "../interfaces/dlvAssert";

export class NoAnswerSet extends DlvAssert {
    public PreConditions(): any {
        return {};
    }
    protected override FullfilRequirements(model : Output): DlvModel {
        // no requirements at all ...
        return model;
    }
    protected override validate(output: Output): boolean {

        return output.answers.length === 0;
    }
    
    
}