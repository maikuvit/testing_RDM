import { Atom } from "../../dlv_output_parser/models/atom"
import { Input } from "../../input_parser/models/input"
import { Assert } from "../../common/interfaces/assert"
import { InputParser } from "../../input_parser/input_parser"
import { Rule } from "../../input_parser/models/rule"

export class AspTest {

    public inputFile?: Input
    public fixture?: string

    constructor(
        public name: string,
        public scope: string[],
        public input: Atom[],
        public assert: Assert[],
        public file: string,) {
    
        }

    public startParsing(){
        this.inputFile = InputParser.parse_input_file(this.file);
    }

    private static extractRules(scope: string[], input: Input, file: string): Rule[] {
        let rules: Rule[] = []
        scope.forEach(label => {
            let partial_rules = input.annotations.get(label)
            if (partial_rules === undefined) {
                throw new Error(`The label ${label} is not used in the file ${file}`)
            }
            rules.push(...partial_rules)
        });
        return rules
    }

    public rules(): Rule[] {
        if (this.inputFile === undefined) {
            throw new Error(`You must parse the test file if you want to use this method`)
        }
        return AspTest.extractRules(this.scope, this.inputFile, this.file)
    }


}