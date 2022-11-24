import { Output } from "../../dlv_output_parser/models/output";
import { DlvAssert } from "../interfaces/dlvAssert";

export class NoAnswerSet extends DlvAssert {
    public validate(output: Output): boolean {
        return output.answers.length === 0;
    }
}