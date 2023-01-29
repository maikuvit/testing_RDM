import { Annotation } from "../../common/interfaces/annotation"
import { AspRule } from "../domain_primitives/asp_rule"
import { Label } from "../domain_primitives/label"

export class Rule extends Annotation {

    constructor(
        public labels: Set<Label>,
        public content: AspRule) {
        super()
    }

    public static override get regex(): RegExp {
        return /^%\*\*\s*@(rule)\(labels\s*=\s*(\s*\w+\s*(?:,\s*\w+\s*)*)\)\s*\*\*%\n(.+)/m
    }

    protected static override tranform(match: RegExpMatchArray): Rule {
        let raw_labels = new Set<string>(match[2].split(','))
        let labels = new Set<Label>()
        for (let raw_label of raw_labels) {
            labels.add(new Label(raw_label))
        }
        let content: string = match[3]
        let asp_rule = new AspRule(content)
        return new Rule(labels, asp_rule)
    }

    public stringify(): string {
        return `${this.content}`
    }
}