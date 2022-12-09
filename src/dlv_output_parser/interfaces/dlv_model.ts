export abstract class DlvOutputModel {

    public static get regex(): RegExp {
        throw new Error(`method not implemented`)
    }

    protected static tranform(matches: RegExpMatchArray): DlvOutputModel {
        throw new Error(`method not implemented`)
    }

    public static parse(raw_input: string): DlvOutputModel {
        let matches = raw_input.match(this.regex)
        if (matches) {
            return this.tranform(matches)
        }
        throw new Error(`${this.name} could not parse '${raw_input}' with '${this.regex}'`)
    }

    public stringify(): string {
        throw new Error(`method not implemented`)
    }
}