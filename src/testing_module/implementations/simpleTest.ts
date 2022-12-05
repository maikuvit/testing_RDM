//  /%\*\*\s*@test\(\s*name\s*=\s*".+",\s*scope\s*=\s*{\s*"\w+"(?:\s*,\s*"\w+")*\s*},\s*input\s*=\s*".+",\s*assert\s*=\s*{\s*.+(?:,\s*.+)*\s*}\s*\)\s*\*\*%/gm

import { DlvAssert } from "../../asserts/interfaces/dlvAssert"
import { Atom } from "../../dlv_output_parser/models/atom"
import { convertedAtoms } from "../../utils/utils"
import { TestInterface } from "../interfaces/testInterface"


export class SimpleTest extends TestInterface{

    constructor(
        private _name: string,
        private _scope: string[],
        private _input: string,
        private _assert: DlvAssert[]) {
            super()
            this.input
    }

    public get testName(): string {
        return this._name
    }

    public get scope(): string[] {
        return this._scope
    }

    public get input(): Atom[] {
        return convertedAtoms(this._input.split(" "))
    }

    public get assert(): DlvAssert[] {
        return this._assert
    }

}