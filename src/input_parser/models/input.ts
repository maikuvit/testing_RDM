import { Annotation } from "../../common/interfaces/annotation";
import { Rule } from "./rule";
import { SharedMap } from "./shared_map";

export class Input extends Annotation{
    constructor(
        public annotations: SharedMap) {
            super()
    }

    public static override get regex(): RegExp {
        return /^%\*\*\s*@(rule)\(name\s*=\s*(\w+)(?:\s*,\s*blocks\s*=\s*(\s*\w+\s*(?:,\s*\w+\s*)*))*\)\s*\*\*%\n(.+)|(?:@rule)/mg
    }

    protected static tranform(matches: RegExpMatchArray) : Input {
        let annotations: SharedMap = new SharedMap(new Map<string, Set<string>>())
        let rulesnames = new Set<string>()
        for(let i = 0; i<matches.length; i++){
            //if the element doesn't match the rule regex it means
            //that there is a @rule annotation that contains sintax errors
            if(!matches[i].match(Rule.regex)){
                throw new Error(`sintax error: annotation `+matches[i])
            }
            let rule:Rule = Rule.parse(matches[i]) as Rule
            if(rulesnames.has(rule.name)){
                throw new Error(`you can't assign the same name to different rules. The name `+rule.name+` can't be assigned to different rules`)
            }
            rulesnames.add(rule.name)
            annotations.addRuleToBlocks(rule.content,rule.blocks)
        }
        return new Input(annotations)
    }

    public override stringify(): string {
        return `"rules":"${this.annotations}"`
    }
}