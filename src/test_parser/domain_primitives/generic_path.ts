import { checkPathExist } from "../../common/file_handler"

export class GenericPath {
    private static readonly min_size:number = 1
    private static readonly max_size:number = 100
    constructor(
        private content: string) {
        this.content = this.validSize(content)
        this.content = this.validContent(content)
    }

    private validSize(content:string) : string{
        let raw_content:string = content
        if (raw_content.length >= GenericPath.min_size && raw_content.length <= GenericPath.max_size) {
            return raw_content
        }
        throw new Error(`path must be a string between 1 and 100`)
    }

    private validContent(content:string) : string{
        let raw_content:string = content
        if (checkPathExist(raw_content)) {
            return raw_content
        }
        throw new Error(`path doesn't exists`)
    }

    public stringify(): string {
        return `${this.content}`
    }
}