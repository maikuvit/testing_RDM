import { Annotation } from "../../input_parser/interfaces/annotation";
import { SimpleTest } from "./simpleTest";
import { TestGenerator } from "./testGenerator";

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
                                //.replace(/name\s*=\s*/mg,'"name":')
                                //.replace(/scope\s*=\s*/mg,'"scope":')
                                //.replace(/input\s*=\s*/mg,'"input":')
                                //.replace(/assert\s*=\s*/mg,'"assert":')
                                //.replace(/\{/mg,"[")
                                //.replace(/\}/mg,"]")
                                //.replace(/[\n\s]/mg,"")
            res = "{"+res+"}"
            results.push(res)
        }
        let tests:SimpleTest[] = []
        //console.log(results[0])
        for(let i=0;i<results.length;i++){
            let testGenerator: TestGenerator = new TestGenerator(JSON.parse(results[i]))
        //console.log(testGenerator)
        //console.log(testGenerator.assert.toString())
            let test:SimpleTest = testGenerator.parse(testGenerator.assert.toString()) as SimpleTest
            tests.push(test)
        }
        return new TestParser(tests)
    }
    /*public override stringify(): string {
        return `${this.answers.map(ans => ans.stringify()).join("\n")}`
    }*/
}