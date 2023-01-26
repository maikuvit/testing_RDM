import { Atom } from "../../dlv_output_parser/models/atom"
import { Input } from "../../input_parser/models/input"
import { Assert } from "../../common/interfaces/assert"
import { InputParser } from "../../input_parser/input_parser"
import { Rule } from "../../input_parser/domain_primitives/rule"
import { TestName } from "../domain_primitives/test_name"
import { Label } from "../../input_parser/domain_primitives/label"
import { GenericPath } from "../domain_primitives/generic_path"

export class AspTest {

    public inputFile?: Input

    constructor(
        public name: TestName,
        public scope: Label[],
        public input: Atom[],
        public assert: Assert[],
        public path: GenericPath,) {
            this.inputFile = InputParser.parse_input_file(this.path.stringify());
        }

    private static extractRules(scope: Label[], input: Input, path: GenericPath): Rule[] {
        let rules: Rule[] = []
        scope.forEach(label => {
            let partial_rules = input.annotations.get(label)
            if (partial_rules === undefined) {
                throw new Error(`The label ${label} is not used in the file ${path.stringify()}`)
            }
            rules.push(...partial_rules)
        });
        return rules
    }

    public rules(): Rule[] {
        if (this.inputFile === undefined) {
            throw new Error(`You must parse the test file if you want to use this method`)
        }
        return AspTest.extractRules(this.scope, this.inputFile, this.path)
    }


}