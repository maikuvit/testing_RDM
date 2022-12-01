import { DlvModel } from "../../dlv_output_parser/interfaces/dlv_model";
import { Output } from "../../dlv_output_parser/models/output";
import { DlvAssert } from "../interfaces/dlvAssert";

export class NoAnswerSet extends DlvAssert {
    public PreConditions(): object {
        return {};
    }
    protected FullfilRequirements(model : Output): DlvModel {
        // no requirements at all ...
        return model;
    }
    protected validate(output: Output): boolean {

        return output.answers.length === 0;
    }
    
    
}