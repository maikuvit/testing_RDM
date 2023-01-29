import { readFile } from '../common/file_handler';
import { Input } from './models/input';

//
// InputParser prende un input asp generico e ne parserizza le annotazioni @rule e @block
//

export class InputParser {
    public static parse(raw_input: string): Input {
        return Input.parse(raw_input) as Input
    }
    public static parse_input_file(path: string): Input {
        return InputParser.parse(readFile(path))
    }
}