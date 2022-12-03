import { Annotation } from "../interfaces/annotation";
import { Block } from "./block";
import { Rule } from "./rule";
import { SharedMap } from "./sharedMap";

export class Input extends Annotation{
    constructor(
        public rules: Map<string, Rule>,
        public blocks: Map<string, Block>) {
            super()
    }

    public static override get regex(): RegExp {
        return /^%\*\*\s*@(block)\(name\s*=\s*"(\w+)"(?:\s*,\s*rules\s*=\s*\[("\s*\w+\s*"(?:,"\s*\w+\s*")*)\])*\)\s*\*\*%$|(?:^%\*\*\s*@(rule)\(name\s*=\s*"(\w+)"(?:\s*,\s*block\s*=\s*"(\w+)")*\)\s*\*\*%\n(.+))|(?:@block)|(?:@rule)/mg
    }

    protected static tranform(matches: RegExpMatchArray) : Input {
        let rules: Map<string, Rule> = new Map<string, Rule>()
        let blocks: Map<string, Block> = new Map<string, Block>()
        Block.sharedMap = new SharedMap(new Map<string, Set<string>>())
        Rule.sharedMap = Block.sharedMap
        for(let i = 0; i<matches.length; i++){
            if(matches[i].match(Block.regex)){
                let selectedAnnotation:Block = Block.parse(matches[i]) as Block
                if(blocks.has(selectedAnnotation.annotationName)){
                    throw new Error(`you can't assign the same name to different blocks. The name `+selectedAnnotation.annotationName+` can't be assigned to different blocks`)
                }
                if(rules.has(selectedAnnotation.annotationName)){
                    throw new Error(`The name "`+selectedAnnotation.annotationName+`" can't be assigned because there is a rule that already use it`)
                }
                blocks.set(selectedAnnotation.annotationName,selectedAnnotation)
            }
            else if(matches[i].match(Rule.regex)){
                let selectedAnnotation:Rule = Rule.parse(matches[i]) as Rule
                if(rules.has(selectedAnnotation.annotationName)){
                    throw new Error(`you can't assign the same name to different rules. The name `+selectedAnnotation.annotationName+` can't be assigned to different rules`)
                }
                if(blocks.has(selectedAnnotation.annotationName)){
                    throw new Error(`The name "`+selectedAnnotation.annotationName+`" can't be assigned because there is a block that already use it`)
                }
                rules.set(selectedAnnotation.annotationName,selectedAnnotation)
            }
            else{
                throw new Error(`sintax error: annotation `+matches[i])
            }
        }
        let invalidAnnotations:string[] = []
        for (let key of Block.sharedMap.rulesPerBlock.keys()) {
            if(!blocks.has(key)){
                invalidAnnotations.push(key)
            }
            let tempRules:Set<string>|undefined = Block.sharedMap.rulesPerBlock.get(key)
            if(tempRules === undefined){
                throw new Error(`tempRules is undefined`)
            }
            for (let currentRule of tempRules){
                if(!rules.has(currentRule)){
                    invalidAnnotations.push(currentRule)
                }
            }
        }
        if(invalidAnnotations.length > 0){
            throw new Error(`You are trying to access not declared rules or blocks. You have to declare the rule|block "`+invalidAnnotations+`"`)
        }
        return new Input(rules,blocks)
    }

    public override stringify(): string {
        return `"rules":"${this.rules}","blocks":"${this.blocks}"`
    }
}