import { Output } from "./models/output";
import * as fs from 'fs';
import { DlvModel } from "./interfaces/dlv_model";
import { Input } from "../input_parser/implementations/input";
import { TestParser } from "../testing_module/implementations/testParser";

export class Parser {
    public static parse_output_file(path: string): Output {
        const file: string = fs.readFileSync(path, {encoding: 'utf-8'})
        return Output.parse(file) as Output
    }

    public static parse_test_file(path: string): TestParser {
        const file: string = fs.readFileSync(path, {encoding: 'utf-8'})
        return TestParser.parse(file) as TestParser
    }

    public static parse_input_file(path: string): Input {
        const file: string = fs.readFileSync(path, {encoding: 'utf-8'})
        return Input.parse(file) as Input
    }

    public static write_to_file(path: string, model : DlvModel) {
        return fs.writeFileSync(path, model.stringify(), {encoding: 'utf-8', flag: 'w'})
    }
}