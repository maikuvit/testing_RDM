import { Atom } from "../../dlv_output_parser/models/atom"
import { Rule } from "../../input_parser/domain_primitives/rule"

export class AspInput{

    rules : string[]
    atoms : Atom[]

    constructor(rules : string[], atoms : Atom[] = []){
        this.rules = rules
        this.atoms = atoms
    }

    public stringify() : string {
            let inRules : string = this.rules.join('\n')
            let inAtoms : string = this.atoms.map(a => a.stringify()).join('\n')
            return `${inRules}\n${inAtoms}`;
    }
}