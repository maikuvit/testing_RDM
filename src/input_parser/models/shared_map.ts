import { Rule } from "./rule"

export class SharedMap {
    constructor(
        public rulesByLabel: Map<string, Set<Rule>>) {
    }

    public add(rule: Rule, labels: Set<string>) {
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

    public has(key: string): boolean {
        return this.rulesByLabel.has(key)
    }

    public get(key: string): Set<Rule> | undefined {
        return this.rulesByLabel.get(key)
    }
}