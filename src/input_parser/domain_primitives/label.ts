export class Label {
    private static readonly min_size:number = 1
    private static readonly max_size:number = 100
    private static readonly regex:RegExp = /[a-zA-Z0-9_-]+/m
    constructor(
        private content: string) {
        this.content = this.validSize(content)
        this.content = this.validContent(content)
    }

    private validSize(content:string) : string{
        let raw_content:string = content
        if (raw_content.length >= Label.min_size && raw_content.length <= Label.max_size) {
            return raw_content
        }
        throw new Error(`The label must be a string between 1 and 100`)
    }

    private validContent(content:string) : string{
        let raw_content:string = content
        if (raw_content.match(Label.regex)) {
            return raw_content
        }
        throw new Error(`wrong label format`)
    }

    public stringify(): string {
        return `${this.content}`
    }
}