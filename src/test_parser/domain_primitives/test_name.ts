export class TestName {
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
        if (raw_content.length >= TestName.min_size && raw_content.length <= TestName.max_size) {
            return raw_content
        }
        throw new Error(`The name of the test must be a string between 1 and 100`)
    }

    private validContent(content:string) : string{
        let raw_content:string = content
        if (raw_content.match(TestName.regex)) {
            return raw_content
        }
        throw new Error(`wrong name format`)
    }

    public stringify(): string {
        return `${this.content}`
    }
}