export class AspRule {

    private static readonly regex:RegExp = /[a-zA-Z(,) |:.-]+/m
    constructor(
        private content: string) {
        this.content = this.valid(content)
    }

    private valid(content:string) : string{
        let raw_content:string = content
        if (raw_content.match(AspRule.regex)) {
            return raw_content
        }
        throw new Error(`wrong rule format`)
    }

    public stringify(): string {
        return `${this.content}`
    }
}