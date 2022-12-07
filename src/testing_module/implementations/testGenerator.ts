import { DlvAssert } from "../../asserts/interfaces/dlvAssert"
import { NoAnswerSet } from "../../asserts/models/noAnswerSet"
import { TrueInExactly } from "../../asserts/models/trueInExactly"
import { SimpleTest } from "./simpleTest"

export class TestGenerator {
    name: string
    scope: string[]
    input: string
    assert: string[]
    file: string
    constructor(givenTestGenerator: TestGenerator) {
        this.name = givenTestGenerator.name
        this.scope = givenTestGenerator.scope
        this.input = givenTestGenerator.input
        this.assert = givenTestGenerator.assert
        this.file = givenTestGenerator.file
    }

    public static assertion(k:string,parsedAssertion:any): DlvAssert{
        let assertions:any = {
            "@noAnswerSet" : new NoAnswerSet(),
            "@trueInExactly" : new TrueInExactly(parsedAssertion.number,parsedAssertion.atoms)
        }
        return assertions[k]
    }

    public get regex(): RegExp {
        return /(@\w+)\s*(\{[a-z :0-9,().'\[\]]*\})/gm
    }

    protected tranform(match: RegExpMatchArray): SimpleTest {
        let assertions: DlvAssert[] = []
        for(let i =0;i<match.length;i++){
            let groups = match[i].match(/(@\w+)\s*(\{[a-z :0-9,().'\[\]]*\})/m)
            if(groups !== null){
                let convertedString = groups[2].replace(/'/g,'"')
                let assertion = TestGenerator.assertion(groups[1],JSON.parse(convertedString))
                assertions.push(assertion)
            }
        }
        return new SimpleTest(this.name,this.scope,this.input,assertions,this.file)
    }

    public parse(raw_input: string) : SimpleTest {
        let matches = raw_input.match(this.regex)
        if (matches) {
            return this.tranform(matches)
        }
        throw new Error(`${this.name} could not parse '${raw_input}' with '${this.regex}'`)
    }

    /*public stringify(): string {
        return `{name:${this.name},assignedBlock:${this.assignedBlock}}`
    }*/
}