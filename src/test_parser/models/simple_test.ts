//  /%\*\*\s*@test\(\s*name\s*=\s*".+",\s*scope\s*=\s*{\s*"\w+"(?:\s*,\s*"\w+")*\s*},\s*input\s*=\s*".+",\s*assert\s*=\s*{\s*.+(?:,\s*.+)*\s*}\s*\)\s*\*\*%/gm

import { Assert } from "../../asserts/interfaces/assert"
import { Atom } from "../../dlv_output_parser/models/atom"
import { Input } from "../../input_parser/models/input"
import { convertedAtoms } from "../../utils/utils"
import { TestInterface } from "../interfaces/test"
import * as fs from 'fs'


export class SimpleTest extends TestInterface{
    
    private _inputFile: Input

    constructor(
        private _name: string,
        private _scope: string[],
        private _input: string,
        private _assert: Assert[],
        private _file: string) {
            super()
            this._inputFile = this.parse_input_file(_file)
            this._scope = this.extractRulesContent()
    }


    private extractRulesContent():string[]{
        let newScope:string[] = []
        this._scope.forEach(annotation => {
            let rules = this._inputFile.annotations.get(annotation)
            if(rules === undefined){
                throw new Error(`The annotation ${annotation} is not used in the file ${this._file}`)
            }
            for (let currentRule of rules){
                newScope.push(currentRule)
            }
        });
        return newScope
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

    public get assert(): Assert[] {
        return this._assert
    }

    private parse_input_file(path: string): Input {
        const file: string = fs.readFileSync(path, {encoding: 'utf-8'})
        return Input.parse(file) as Input
    }

}