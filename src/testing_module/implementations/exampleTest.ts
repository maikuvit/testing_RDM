import { DlvAssert } from "../../asserts/interfaces/dlvAssert";
import { Atom } from "../../dlv_output_parser/models/atom";
import { Test } from "../interfaces/Test";

export class ExampleTest extends Test{

    constructor(
        public name: string,
        private _scope: string[],
        private _input: Atom[],
        private _assert: DlvAssert[]) {
            super()
    }

    public override get scope(): string[] {
        return this._scope;
    }

    public override get input(): Atom[] {
        return this._input;
    }

    public override get assert(): DlvAssert[] {
        return this._assert;
    }

}