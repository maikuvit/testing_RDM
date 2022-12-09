import { Atom } from "../../dlv_output_parser/models/atom"
import { Input } from "../../input_parser/models/input"
import { Assert } from "../../common/interfaces/assert"
import { InputParser } from "../../input_parser/input_parser"
import { AssertParser } from "./assert_parser";

export class AspTest {

    public inputFile?: Input

    constructor(
        public name: string,
        public scope: string[],
        public input: Atom[],
        public assert: Assert[],
        public file: string,) {
        this.inputFile = InputParser.parse_input_file(this.file);
    }

    public static generate(name : string, raw_scope : string[], raw_input: string, assert : Assert[], file : string) : AspTest {
        let inputFile = InputParser.parse_input_file(file);
        let scope = AspTest.extractRulesContent(raw_scope, inputFile, file)
        let input = AspTest.convertedAtoms(raw_input.split(" "))
        return new AspTest(name, scope, input, assert, file)
    }    

    private static extractRulesContent(raw_scope: string[], inputFile: Input, file: string): string[] {
        let newScope: string[] = []
        raw_scope.forEach(annotation => {
            let rules = inputFile.annotations.get(annotation)
            if (rules === undefined) {
                throw new Error(`The annotation ${annotation} is not used in the file ${file}`)
            }
            for (let currentRule of rules) {
                newScope.push(currentRule)
            }
        });
        return newScope
    }

    public static convertedAtoms(atoms:string[]) : Atom[]{
        let convertedAtoms:Atom[] = []
        for(let i = 0; i< atoms.length; i++){
            let matches = atoms[i].match(/(\w+)\s*\(([a-zA-Z0-9]+(?:\s*,\s*[a-zA-Z0-9]+)*)\)/m)
            if(matches!== null){
                let name = matches[1].replace(/\s/g, "")
                let literals = matches[2].replace(/\s/g, "")
                convertedAtoms.push(new Atom(name,literals.split(",")))
            }
            else{
                throw new Error(`can't convert atoms`)
            }
        }
        return convertedAtoms
    }

}