import { Assert } from "../../common/interfaces/assert"
import { Parser } from "../../common/interfaces/parser"
import { NoAnswerSet } from "../../test_solver/asserts/models/no_answer_set"
import { TrueInExactly } from "../../test_solver/asserts/models/true_in_exactly"

export class AssertParser extends Parser {

    constructor() {
        super()
    }

    public static assertion(k: string, parsedAssertion: any): Assert {
        let assertions: any = {
            "@noAnswerSet": new NoAnswerSet(),
            "@trueInExactly": new TrueInExactly(parsedAssertion.number, parsedAssertion.atoms)
        }
        return assertions[k]
    }

    public static override get regex(): RegExp {
        return /(@\w+)\s*(\{[a-z :0-9,().'\[\]]*\})/gm
    }

    protected static override tranform(match: RegExpMatchArray): Assert[] {
        let assertions: Assert[] = []
        for (let i = 0; i < match.length; i++) {
            let groups = match[i].match(/(@\w+)\s*(\{[a-z :0-9,().'\[\]]*\})/m)
            if (groups !== null) {
                let convertedString = groups[2].replace(/'/g, '"')
                let assertion = AssertParser.assertion(groups[1], JSON.parse(convertedString))
                assertions.push(assertion)
            }
        }
        return assertions;
    }
}