import { Annotation } from "../interfaces/annotation"
import { SharedMap } from "./sharedMap"

export class Block extends Annotation {

    public static sharedMap: SharedMap

    constructor(
        public annotationName: string) {
        super()
    }

    public static override get regex(): RegExp {
        return /^%\*\*\s*@(block)\(name\s*=\s*"(\w+)"(?:\s*,\s*rules\s*=\s*\[("\s*\w+\s*"(?:,"\s*\w+\s*")*)\])*\)\s*\*\*%$/m
    }

    protected static override tranform(match: RegExpMatchArray): Block {
        let annotationName : string = match[2]
        if(match[3] !== undefined){
            let rulesNames: string[] = []
            let clearedMatch = match[3].replace(/"/g,"")
            rulesNames = clearedMatch.split(',')
            if(Block.sharedMap === undefined){
                throw new Error(`You should instanciate Block.SharedMap if you want to add the rules "`+rulesNames+`" to the block "`+annotationName+`"`)
            }
            Block.sharedMap.addRulesToBlock(annotationName,new Set<string>(rulesNames))
            console.log(rulesNames)
        }
        return new Block(annotationName)
    }

    public override stringify(): string {
        return `%** @block(name="`+this.annotationName+`") **%`
    }
}