export abstract class DlvModel {

    public static get regex(): RegExp {
        throw new Error(`method not implemented`)
    }

    protected static tranform(matches: RegExpMatchArray) : DlvModel {
        throw new Error(`method not implemented`)
    }

    public static parse(raw_input: string) : DlvModel {
        let matches = raw_input.match(this.regex)
        if (matches) {
            return this.tranform(matches)
        }
        throw new Error(`${this.name} could not parse '${raw_input}' with '${this.regex}'`)
    }

    public static to_string(model : DlvModel) : string {
        throw new Error(`method not implemented`)
    }
}