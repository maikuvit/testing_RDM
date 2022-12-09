import { Output } from "./models/output";
import * as fs from 'fs';

export class DlvOutputParser {
    public static parse(raw_output: string): Output {
        return Output.parse(raw_output) as Output
    }
    public static parse_output_file(path: string): Output {
        const file: string = fs.readFileSync(path, { encoding: 'utf-8' })
        return DlvOutputParser.parse(file)
    }
}