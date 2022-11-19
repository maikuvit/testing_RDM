import { Output } from "./models/output";
import * as fs from 'fs';

export class Parser {
    public static parse_output_file(path: string): Output {
        const file: string = fs.readFileSync(path, 'utf-8')
        return Output.parse(file) as Output
    }
}