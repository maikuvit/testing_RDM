import { readFile } from "../common/file_handler";
import { Output } from "./models/output";

//
// DlvOutputParser prende un output dlv e ne parserizza le annotazioni @rule e @block
//

export class DlvOutputParser {
    public static parse(raw_output: string): Output {
        return Output.parse(raw_output) as Output
    }
    public static parse_output_file(path: string): Output {
        return DlvOutputParser.parse(readFile(path))
    }
}