export class SharedMap {
    constructor(
        public rulesByBlock: Map<string, Set<string>>) {
    }

    public addRuleToBlocks(rule: string, blocks: Set<string>) {
        if (rule == "") {
            throw new Error(`rule name is an empty string`)
        }
        if (blocks.size == 0) {
            throw new Error(`A rule can't be added to an empty block`)
        }
        if (blocks.has("")) {
            throw new Error(`block name is an empty string`)
        }
        if (blocks.has(rule)) {
            throw new Error(`block name and rule name are the same, change one of them: rule = ${rule} block = ${rule}`)
        }
        for (let currentBlock of blocks) {
            if (!this.rulesByBlock.has(currentBlock)) {
                this.rulesByBlock.set(currentBlock, new Set<string>([rule]))
            }
            else {
                this.rulesByBlock.get(currentBlock)?.add(rule)
            }
        }

    }

    public has(key: string): boolean {
        return this.rulesByBlock.has(key)
    }

    public get(key: string): Set<string> | undefined {
        return this.rulesByBlock.get(key)
    }
}