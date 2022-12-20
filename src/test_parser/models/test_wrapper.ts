import { AspTest } from "./asp_test";
import Ajv, { JTDSchemaType } from "ajv/dist/jtd"
import { Annotation } from "../../common/interfaces/annotation";
import { AssertParser } from "./assert_parser";
import { Atom } from "../../dlv_output_parser/models/atom";

interface DataToParse {
    name?: string;
    scope?: string[];
    input?: string;
    assert?: string[];
    file?: string;
}

export class TestWrapper extends Annotation {
    constructor(
        public tests: AspTest[]) {
        super()
    }

    public static override get regex(): RegExp {
        return /%\*\*\s*@(test|fixture)\s*(?:\((\w+)\)){0,1}\{[^*%]+\}\s*\*\*%/mg
    }

    protected static override tranform(matches: RegExpMatchArray): TestWrapper {

        let fixtures = new Map<string, AspTest>()
        let tests: AspTest[] = []
        matches.map(result => {
            let groups = result.match(/%\*\*\s*@(test|fixture)\s*(?:\((\w+)\)){0,1}\{[^*%]+\}\s*\*\*%/m)
            let annotation = groups ? groups[1] : null
            let fixtureName = groups ? groups[2] : null
            result = result.replace(/%\*\*\s*@(?:test|fixture)\s*(?:\((\w+)\)){0,1}/mg, "").replace(/\s*\*\*%/mg, "")
            let raw_test = TestWrapper.json_parse((result))
            let parsed_assert = raw_test.assert ? AssertParser.parse(raw_test.assert.toString()) : []
            let parserd_input = raw_test.input ? (raw_test.input.split(' ').map((atom_raw: string) => Atom.parse(atom_raw) as Atom) ?? []) : []
            let parsed_name = raw_test.name ?? ""
            let parsed_scope = raw_test.scope ?? []
            let parsed_file = raw_test.file ?? ""
            let currentTest = new AspTest(parsed_name, parsed_scope, parserd_input, parsed_assert, parsed_file)
            currentTest.fixture = fixtureName ? fixtureName : undefined
            let operation = annotation === 'test' ? tests.push(currentTest) : (fixtureName ? fixtures.set(fixtureName,currentTest) : undefined)
            if(operation === undefined)
            {
                throw new Error(`you must give a name to the fixture`)
            }
        })
        tests.forEach(element => {
            let fixture = element.fixture ? fixtures.get(element.fixture) : undefined
            element = fixture ?  TestWrapper.injectFixture(fixture,element) : element
            element.startParsing() 
        });
        return new TestWrapper(tests)
    }

    private static injectFixture(fixture:AspTest,target:AspTest):AspTest{
        for(let property in target){
            if(property !== "inputFile" && property !== "fixture"){
                Array.isArray((target as any)[property]) ? (target as any)[property].push(...(fixture as any)[property]) : (target as any)[property].concat((fixture as any)[property])
            }
        }
        return target
    }

    private static json_parse(json: string): DataToParse {
        const ajv = new Ajv()

        const schema: JTDSchemaType<DataToParse> = {
            optionalProperties: {
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