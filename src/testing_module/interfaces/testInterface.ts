import { DlvAssert } from "../../asserts/interfaces/dlvAssert"
import { Atom } from "../../dlv_output_parser/models/atom"

export abstract class TestInterface {

    public get testName(): string {
        throw new Error(`method not implemented`)
    }

    public get scope(): string[] {
        throw new Error(`method not implemented`)
    }

    public get input(): Atom[] {
        throw new Error(`method not implemented`)
    }

    public get assert(): DlvAssert[] {
        throw new Error(`method not implemented`)
    }
    
}