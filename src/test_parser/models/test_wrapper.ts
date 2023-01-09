import { AspTest } from "./asp_test";
import Ajv, { JTDSchemaType } from "ajv/dist/jtd"
import { Annotation } from "../../common/interfaces/annotation";
import { AssertParser } from "./assert_parser";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Assert } from "../../common/interfaces/assert";

interface DataToParse {
    name?: string;
    scope?: string[];
    input?: string;
    assert?: string[];
    file?: string;
    fixtures?:string[];
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

        let fixtures = new Map<string, DataToParse>()
        let raw_tests: DataToParse[] = []
        let tests: AspTest[] = []
        matches.map(result => {
            let groups = result.match(/%\*\*\s*@(test|fixture)\s*(?:\((\w+)\)){0,1}\{[^*%]+\}\s*\*\*%/m)
            let annotation = groups ? groups[1] : null
            let fixtureName = groups ? groups[2] : null
            result = result.replace(/%\*\*\s*@(?:test|fixture)\s*(?:\((\w+)\)){0,1}/mg, "").replace(/\s*\*\*%/mg, "")
            let raw_annotation = TestWrapper.json_parse((result))
            raw_annotation = TestWrapper.initializeVariables(raw_annotation)
            let operation = annotation === 'test' ? raw_tests.push(raw_annotation) : (fixtureName ? fixtures.set(fixtureName,raw_annotation) : undefined)
            if(operation === undefined)
            {
                throw new Error(`you must give a name to the fixture`)
            }
        })
        raw_tests.forEach(raw_test => {
            let fixtures_used_by_test = raw_test.fixtures ?? []
            fixtures_used_by_test.forEach(fixtureName => {
                let fixture = fixtures.get(fixtureName)
                raw_test = fixture ?  TestWrapper.injectFixture(fixture,raw_test) : raw_test
            }); 
            let valid_test = TestWrapper.validate_test(raw_test)
            tests.push(valid_test)
        });
        return new TestWrapper(tests)
    }

    private static initializeVariables(raw_annotation:DataToParse):DataToParse{
        let annotation:DataToParse = raw_annotation
        annotation.name = raw_annotation.name ?? ""
        annotation.scope = raw_annotation.scope ?? []
        annotation.input = raw_annotation.input ?? ""
        annotation.assert = raw_annotation.assert ?? []
        annotation.file = raw_annotation.file ?? ""
        annotation.fixtures = raw_annotation.fixtures ?? []
        return annotation
    }

    private static injectFixture(fixture:DataToParse,target:DataToParse):DataToParse{
        let injectedTest:DataToParse = target
        for(let property in injectedTest){
            if(property !== 'fixtures') {
                Array.isArray((injectedTest as any)[property]) ? (injectedTest as any)[property].push(...(fixture as any)[property]) : (injectedTest as any)[property]+=(fixture as any)[property]
            }    
        }
        return injectedTest
    }

    private static validate_test(test_to_be_validated:DataToParse) : AspTest{
        //console.log(test_to_be_validated.fixtures)
        for(let property in test_to_be_validated){
            //console.log(property)
            let field_is_valid:boolean = (test_to_be_validated as any)[property].length > 0 || property === 'fixtures'
            //console.log((test_to_be_validated as any)[property])
            if(!field_is_valid)
            {
                throw new Error(`missing required property '${property}'`)
            }
        }
        let testName = test_to_be_validated.name ?? ""
        let testScope = test_to_be_validated.scope ?? []
        let parserd_input:Atom[] = test_to_be_validated.input ? (test_to_be_validated.input.length > 0 ? (test_to_be_validated.input.split(' ').map((atom_raw: string) => Atom.parse(atom_raw) as Atom) ?? []) : []) : []
        let parsed_assert:Assert[] = test_to_be_validated.assert ? (test_to_be_validated.assert.length > 0 ? AssertParser.parse(test_to_be_validated.assert.toString()) : []) : []
        let testFile = test_to_be_validated.file ?? ""
        return new AspTest(testName,testScope,parserd_input,parsed_assert,testFile)
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
                fixtures: { elements: { type: "string" } },
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