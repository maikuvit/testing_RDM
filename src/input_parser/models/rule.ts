import { Annotation } from "../../common/interfaces/annotation"
import { AspRule } from "./asp_rule"

export class Rule extends Annotation {

    constructor(
        public labels: Set<string>,
        public content: AspRule) {
        super()
    }

    public static override get regex(): RegExp {
        return /^%\*\*\s*@(rule)\(labels\s*=\s*(\s*\w+\s*(?:,\s*\w+\s*)*)\)\s*\*\*%\n(.+)/m
    }

    protected static override tranform(match: RegExpMatchArray): Rule {
        let labels = new Set<string>(match[2].split(','))
        let content: string = match[3]
        let asp_rule = new AspRule(content)
        return new Rule(labels, asp_rule)
    }

    public stringify(): string {
        return `${this.content}`
    }
}