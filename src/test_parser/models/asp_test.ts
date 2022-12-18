import { Atom } from "../../dlv_output_parser/models/atom"
import { Input } from "../../input_parser/models/input"
import { Assert } from "../../common/interfaces/assert"
import { InputParser } from "../../input_parser/input_parser"
import { Rule } from "../../input_parser/models/rule"

export class AspTest {

    public inputFile?: Input

    constructor(
        public name: string,
        public scope: string[],
        public input: Atom[],
        public assert: Assert[],
        public file: string,) {
        this.inputFile = InputParser.parse_input_file(this.file);
        this.scope =  AspTest.extractRulesContent(this.scope, this.inputFile, this.file)
    }

    private static extractRulesContent(raw_scope: string[], input: Input, file: string): string[] {
        let newScope: string[] = []
        raw_scope.forEach(annotation => {
            let rules = input.annotations.get(annotation)
            if (rules === undefined) {
                throw new Error(`The annotation ${annotation} is not used in the file ${file}`)
            }
            newScope.push(...rules)
        });
        return newScope
    }

    public tempGetScopeAsRules() : Rule[]{
        let rules : Rule[] = [];
        this.scope.forEach((element,index) => {
            rules.push(new Rule(`r${index}`, new Set<string>,element))
        });
        return rules;
    }


}