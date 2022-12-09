import { DlvOutputModel } from "../../common/interfaces/dlv_model"

export class Atom extends DlvOutputModel {
    constructor(
        public name: string,
        public literals: string[]) {
        super()
    }

    public static override get regex(): RegExp {
        return /^([a-z]\w*)\((\w+(?:,\w+)*)\)\,*\n*$/
    }

    protected static override tranform(match: RegExpMatchArray): Atom {
        let name: string = match[1]
        let literals: string[] = match[2].split(',')
        return new Atom(name, literals)
    }

    public override stringify(): string {
        return `${this.name}(${this.literals.join(',')}).`
    }
    
    public static convertAtoms(atoms:string[]) : Atom[]{
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