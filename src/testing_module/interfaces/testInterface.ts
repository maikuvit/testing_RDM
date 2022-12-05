import { DlvAssert } from "../../asserts/interfaces/dlvAssert"
import { Atom } from "../../dlv_output_parser/models/atom"

export abstract class TestInterface {

    public abstract get testName(): string 

    public abstract get scope(): string[]

    public abstract get input(): Atom[]

    public abstract get assert(): DlvAssert[]
    
}