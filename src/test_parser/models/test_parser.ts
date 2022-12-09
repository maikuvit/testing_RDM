import { SimpleTest } from "./simple_test";
import Ajv, {JTDSchemaType} from "ajv/dist/jtd"
import { TestGenerator } from "./test_generator";
import { Annotation } from "../interfaces/annotation";

export class TestParser extends Annotation{
    constructor(
        public tests: SimpleTest[]) {
            super()
    }

    public static override get regex(): RegExp {
        return /%\*\*\s*@test\s*[^*%]+\s*\*\*%/mg
    }

    protected static override tranform(matches: RegExpMatchArray): TestParser {
        let results:string[] = []
        for(let i=0;i<matches.length;i++){
            let res = matches[i].replace(/%\*\*\s*@test\s*\(/mg,"")
                                .replace(/\)\s*\*\*%/mg,"")
            res = "{"+res+"}"
            results.push(res)
        }
        let tests:SimpleTest[] = []
        for(let i=0;i<results.length;i++){
            let parsedResult = TestParser.json_parse(results[i])
            let testGenerator: TestGenerator = new TestGenerator(parsedResult as TestGenerator)
            let test:SimpleTest = testGenerator.parse(testGenerator.assert.toString()) as SimpleTest
            tests.push(test)
        }
        return new TestParser(tests)
    }

    private static json_parse(json:string):object{
        const ajv = new Ajv()
        interface MyData {
            name: string
            scope: string[]
            input: string
            assert: string[]
            file: string
        }
        const schema:JTDSchemaType<MyData> = {
            properties: {
                name: {type: "string"},
                scope: {elements:{type: "string"}},
                input: {type: "string"},
                assert: {elements:{type: "string"}},
                file: {type: "string"},
            }
        }

        const parse = ajv.compileParser(schema)
        
        const data = parse(json)
        if (data === undefined) {
          throw new Error(parse.message+`\nerror position in string: `+parse.position)
        } else {
          return data
        }
    }
}