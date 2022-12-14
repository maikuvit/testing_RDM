import { Atom } from "../../dlv_output_parser/models/atom"
import { Rule } from "../../input_parser/models/rule"

export class AspInput{

    rules : Rule[]
    atoms : Atom[]

    constructor(rules : Rule[], atoms : Atom[] = []){
        this.rules = rules
        this.atoms = atoms

    }
}