import { Annotation } from "../../common/interfaces/annotation"

export class Rule extends Annotation {

    constructor(
        public name: string,
        public blocks: Set<string>,
        public content: string) {
        super()
    }

    public static override get regex(): RegExp {
        return /^%\*\*\s*@(rule)\(name\s*=\s*(\w+)(?:\s*,\s*blocks\s*=\s*(\s*\w+\s*(?:,\s*\w+\s*)*))*\)\s*\*\*%\n(.+)/m
    }

    protected static override tranform(match: RegExpMatchArray): Rule {
        let name: string = match[2]
        let blocks = new Set<string>([name])
        let content: string
        if (match[4] === undefined) {
            content = match[3]
        }
        else {
            let tempBlocks = match[3].split(',')
            tempBlocks.forEach(block => {
                blocks.add(block)
            });
            content = match[4]
        }
        return new Rule(name, blocks, content)
    }

    /*public override stringify(): string {
        return `%** @rule(name="`+this.annotationName+`") **%\n`+this.content+``
    }*/
}