import { DlvModel } from "../interfaces/dlv_model"

export class Atom extends DlvModel {
    constructor(
        public name: string,
        public literals: string[]) {
        super()
    }

    public static override get regex(): RegExp {
        return /^([a-z]\w*)\((\w+(?:,\w+)*)\)\,*\n*$/
    }

    protected static override tranform(match: RegExpMatchArray): Atom {
        let name : string = match[1]
        let literals : string[] = match[2].split(',')
        return new Atom(name, literals)
    }

    public override stringify(): string {
        return `${this.name}(${this.literals.join(',')}).`
    }
}