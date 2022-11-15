import { Output } from "./models/output";
import * as fs from 'fs';

export class Parser {
    public static parse(raw_input : string) : Output {
        if(/INCONSISTENT/i.test(raw_input))
            return new Output([])
        return Output.parse(raw_input) as Output
    }
    public static parse_file(path : string) : Output {
        const file : string = fs.readFileSync(path, 'utf-8')
        return Parser.parse(file)
    }
}