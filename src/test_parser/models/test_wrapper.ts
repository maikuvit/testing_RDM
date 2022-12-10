import { AspTest } from "./asp_test";
import Ajv, { JTDSchemaType } from "ajv/dist/jtd"
import { Annotation } from "../../common/interfaces/annotation";
import { AssertParser } from "./assert_parser";
import { Atom } from "../../dlv_output_parser/models/atom";

interface DataToParse {
    name: string;
    scope: string[];
    input: string;
    assert: string[];
    file: string;
}

export class TestWrapper extends Annotation {
    constructor(
        public tests: AspTest[]) {
        super()
    }

    public static override get regex(): RegExp {
        return /%\*\*\s*@test\s*[^*%]+\s*\*\*%/mg
    }

    protected static override tranform(matches: RegExpMatchArray): TestWrapper {

        let adjust_match = (match : string) => match.replace(/%\*\*\s*@test\s*\(/mg, "").replace(/\)\s*\*\*%/mg, "")

        let results: string[] = matches.map(match => `{${adjust_match(match)}}`)

        let tests: AspTest[] = results.map(result => {
            let raw_test = TestWrapper.json_parse((result))
            let parsed_assert = AssertParser.parse(raw_test.assert.toString())
            let parserd_input = Atom.convertAtoms(raw_test.input.split(' '))
            return new AspTest(raw_test.name, raw_test.scope, parserd_input, parsed_assert, raw_test.file)
        })

        return new TestWrapper(tests)
    }

    private static json_parse(json: string): DataToParse {
        const ajv = new Ajv()

        const schema: JTDSchemaType<DataToParse> = {
            properties: {
                name: { type: "string" },
                scope: { elements: { type: "string" } },
                input: { type: "string" },
                assert: { elements: { type: "string" } },
                file: { type: "string" },
            }
        }

        const parse = ajv.compileParser(schema)
        const data = parse(json)

        if (data === undefined) {
            throw new Error(parse.message + `\nerror position in string: ` + parse.position)
        } else {
            return data
        }
    }

}