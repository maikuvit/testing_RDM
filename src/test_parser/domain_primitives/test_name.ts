export class TestName {
    private static readonly min_size:number = 1
    private static readonly max_size:number = 100
    private static readonly regex:RegExp = /^[a-zA-Z0-9_-]+$/
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
        throw new Error(`The name of the test must be a string between ${TestName.min_size} and ${TestName.max_size}`)
    }

    private validContent(content:string) : string{
        let raw_content:string = content
        if (raw_content.match(TestName.regex)) {
            return raw_content
        }
        throw new Error(`wrong test name format`)
    }

    public stringify(): string {
        return `${this.content}`
    }
}