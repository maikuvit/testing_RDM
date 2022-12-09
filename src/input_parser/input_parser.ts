import * as fs from 'fs';
import { Input } from './models/input';

//
// InputParser prende un input asp generico e ne parserizza le annotazioni @rule e @block
//

export class InputParser {
    public static parse(raw_input: string): Input {
        return Input.parse(raw_input) as Input
    }
    public static parse_input_file(path: string): Input {
        const file: string = fs.readFileSync(path, { encoding: 'utf-8' })
        return InputParser.parse(file)
    }
}