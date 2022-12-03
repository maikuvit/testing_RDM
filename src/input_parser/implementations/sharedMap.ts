
export class SharedMap {
    constructor(
        public rulesPerBlock: Map<string, Set<string>>) {
    }

    public addRulesToBlock(blockName:string,rulesNames:Set<string>){
        if(blockName == ""){
            throw new Error(`block name is empty`)
        }
        if(rulesNames.size == 0){
            throw new Error(`A block without rules can't be added to this Map`)
        }
        if(rulesNames.has("")){
            throw new Error(`rule name is empty`)
        }
        if(!this.rulesPerBlock.has(blockName)){
            this.rulesPerBlock.set(blockName,rulesNames)
        }
        else{
            for (let currentRule of rulesNames){
                this.rulesPerBlock.get(blockName)?.add(currentRule)
            }
        }

    }
}