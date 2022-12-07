import { Output } from "./models/output";
import * as fs from 'fs';
import { DlvModel } from "./interfaces/dlv_model";
import { Input } from "../input_parser/implementations/input";
import { TestParser } from "../testing_module/implementations/testParser";

export class Parser {
    public static parse(raw_output : string) : Output {
        return Output.parse(raw_output) as Output
    }
    public static parse_output_file(path: string): Output {
        const file: string = fs.readFileSync(path, {encoding: 'utf-8'})
        return Parser.parse(file)
    }

    public static parse_test_file(path: string): TestParser {
        const file: string = fs.readFileSync(path, {encoding: 'utf-8'})
        return TestParser.parse(file) as TestParser
    }

    public static write_to_file(path: string, model : DlvModel) {
        return fs.writeFileSync(path, model.stringify(), {encoding: 'utf-8', flag: 'w'})
    }
}