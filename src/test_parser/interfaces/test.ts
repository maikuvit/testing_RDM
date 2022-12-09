import { Atom } from "../../dlv_output_parser/models/atom";
import { Assert } from "../../test_solver/asserts/interfaces/assert";

export abstract class TestInterface {

    public abstract get testName(): string 

    public abstract get scope(): string[]

    public abstract get input(): Atom[]

    public abstract get assert(): Assert[]
    
}