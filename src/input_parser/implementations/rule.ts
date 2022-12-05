import { Annotation } from "../interfaces/annotation"
import { SharedMap } from "./sharedMap"

export class Rule extends Annotation {

    public static sharedMap: SharedMap

    constructor(
        public annotationName: string,
        public content: string) {
        super()
    }

    public static override get regex(): RegExp {
        return /^%\*\*\s*@(rule)\(name\s*=\s*"(\w+)"(?:\s*,\s*block\s*=\s*"(\w+)")*\)\s*\*\*%\n(.+)/m
    }

    protected static override tranform(match: RegExpMatchArray): Rule {
        let annotationName : string = match[2]
        let content: string
        if(match[4] === undefined){
            content = match[3]
        }
        else{
            let chosenBlockName:string
            chosenBlockName = match[3]
            content = match[4]
            if(Rule.sharedMap === undefined){
                throw new Error(`You should instanciate Rule.SharedMap if you want to add the rule "`+annotationName+`" to the block "`+chosenBlockName+`"`)
            }
            Rule.sharedMap.addRulesToBlock(chosenBlockName,new Set<string>([annotationName]))
        }
        return new Rule(annotationName, content)
    }

    public override stringify(): string {
        return `%** @rule(name="`+this.annotationName+`") **%\n`+this.content+``
    }
}