import { Label } from "../domain_primitives/label"
import { Rule } from "./rule"

export class SharedMap {
    private rulesByLabel: Map<string, Set<Rule>>
    constructor() {
        this.rulesByLabel = new Map<string, Set<Rule>>()
    }

    public addRuleToLabels(rule: Rule, labels: Set<Label>){
        let raw_labels:string[] = []
        for (let label of labels) {
            raw_labels.push(label.stringify())
        }
        this.add(rule,new Set<string>(raw_labels))
    }

    private add(rule: Rule, labels: Set<string>) {
        if (labels.size == 0) {
            throw new Error(`A rule must have at least one label`)
        }
        if (labels.has("")) {
            throw new Error(`a label can't be an empty string`)
        }
        for (let currentLabel of labels) {
            if (!this.rulesByLabel.has(currentLabel)) {
                this.rulesByLabel.set(currentLabel, new Set<Rule>([rule]))
            }
            else {
                this.rulesByLabel.get(currentLabel)?.add(rule)
            }
        }

    }

    public has(key: Label): boolean {
        return this.rulesByLabel.has(key.stringify())
    }

    public get(key: Label): Set<Rule> | undefined {
        return this.rulesByLabel.get(key.stringify())
    }
}