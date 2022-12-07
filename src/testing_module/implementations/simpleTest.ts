//  /%\*\*\s*@test\(\s*name\s*=\s*".+",\s*scope\s*=\s*{\s*"\w+"(?:\s*,\s*"\w+")*\s*},\s*input\s*=\s*".+",\s*assert\s*=\s*{\s*.+(?:,\s*.+)*\s*}\s*\)\s*\*\*%/gm

import { DlvAssert } from "../../asserts/interfaces/dlvAssert"
import { Atom } from "../../dlv_output_parser/models/atom"
import { Input } from "../../input_parser/implementations/input"
import { convertedAtoms } from "../../utils/utils"
import { TestInterface } from "../interfaces/testInterface"
import * as fs from 'fs'
import { Block } from "../../input_parser/implementations/block"
import { Rule } from "../../input_parser/implementations/rule"


export class SimpleTest extends TestInterface{
    
    private _inputFile:Input

    constructor(
        private _name: string,
        private _scope: string[],
        private _input: string,
        private _assert: DlvAssert[],
        private _file: string) {
            super()
            this._inputFile = this.parse_input_file(_file)
            this._scope = this.extractRulesContent()
    }

    //Questo metodo verrà modificato nel momento in cui rule e block verranno accorpate
    private extractRulesContent():string[]{
        let newScope:string[] = []
        this._scope.forEach(annotation => {
            if(this._inputFile.rules.has(annotation)){
                let rule = this._inputFile.rules.get(annotation)
                if(rule === undefined){
                    throw new Error(`The annotation ${annotation} is not used in the file ${this._file}`)
                }
                newScope.push(rule.content)
            }
            else if(Block.sharedMap.rulesPerBlock.has(annotation)){
                let rulesNames = Block.sharedMap.rulesPerBlock.get(annotation)
                if(rulesNames === undefined){
                    throw new Error(`The annotation ${annotation} is not used in the file ${this._file}`)
                }
                rulesNames.forEach(ruleName => {
                    let rule:Rule|undefined = this._inputFile.rules.get(ruleName)
                    if(rule === undefined){
                        throw new Error(`The annotation ${annotation} is not used in the file ${this._file}`)
                    }
                    newScope.push(rule.content)
                });
            }
            else{
                throw new Error(`The annotation ${annotation} is not used in the file ${this._file}`)
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

    public get assert(): DlvAssert[] {
        return this._assert
    }

    private parse_input_file(path: string): Input {
        const file: string = fs.readFileSync(path, {encoding: 'utf-8'})
        return Input.parse(file) as Input
    }

}