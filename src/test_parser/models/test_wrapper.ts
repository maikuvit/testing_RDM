import { AspTest } from "./asp_test";
import Ajv, { JTDSchemaType } from "ajv/dist/jtd"
import { Annotation } from "../../common/interfaces/annotation";
import { AssertParser } from "./assert_parser";

export class TestWrapper extends Annotation {
    constructor(
        public tests: AspTest[]) {
        super()
    }

    public static override get regex(): RegExp {
        return /%\*\*\s*@test\s*[^*%]+\s*\*\*%/mg
    }

    protected static override tranform(matches: RegExpMatchArray): TestWrapper {
        let results: string[] = []
        for (let i = 0; i < matches.length; i++) {
            let res = matches[i].replace(/%\*\*\s*@test\s*\(/mg, "").replace(/\)\s*\*\*%/mg, "")
            res = "{" + res + "}"
            results.push(res)
        }
        let tests: AspTest[] = []
        for (let i = 0; i < results.length; i++) {
            let raw_test = TestWrapper.json_parse((results[i]))
            tests.push(AspTest.generate(raw_test.name, raw_test.scope, raw_test.input, AssertParser.parse(raw_test.assert.toString()), raw_test.file)!)
        }
        return new TestWrapper(tests)
    }

    private static json_parse(json: string): any {
        const ajv = new Ajv()

        interface MyData {
            name: string;
            scope: string[];
            input: string;
            assert: string[];
            file: string;
        }

        const schema: JTDSchemaType<MyData> = {
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