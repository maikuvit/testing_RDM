import { utils } from "mocha";
import { areArrayEqualNoOrder, areObjectEqual } from "../../utils/utils";
import { DlvModel } from "../interfaces/dlv_model";
import { Atom } from "./atom";
import { Cost } from "./cost";

export class AnswerSet extends DlvModel {
    constructor(
        public atoms : Atom[],
        public costs : Cost[],
        public optimum : boolean){
        super()
    }

    public static override get regex(): RegExp {
        return /^{((?:(?:[a-z]\w*)\((?:\w+(?:,\w+)*)\)[,\s]*)+)}(?:\nCOST ((?:\d+@\d+[\s\n]*)+))*\n*(OPTIMUM)*/
    }

    protected static override tranform(match: RegExpMatchArray): AnswerSet {        
        let atoms : Atom[] = match[1]?.split(' ').map((atom_raw : string) => Atom.parse(atom_raw) as Atom) ?? []
        let costs : Cost[] = match[2]?.split(' ').map((cost_raw : string) => Cost.parse(cost_raw) as Cost) ?? []
        let optimum : boolean = match[3] === 'OPTIMUM' ?? false
        return new AnswerSet(atoms, costs, optimum)
    }

    public override stringify(): string {
        let ans : string = `ANSWER\n${this.atoms.map(atom => atom.stringify()).join(' ')}`
        let cost : string = this.costs.length > 0 ? `\nCOST ${this.costs.map(cost => cost.stringify()).join(' ')}` : ""
        let opt : string = this.optimum ? "\nOPTIMUM" : ""
        return `${ans}${cost}${opt}`
    }

    public assertEqualCost(costToAssert : string) : boolean{
        let constInput : Cost[] = costToAssert.split(' ').map((cost_raw : string) => Cost.parse(cost_raw) as Cost) ?? []
        return areArrayEqualNoOrder(constInput, this.costs);
    }

    public containsAllAtoms(atoms : Atom[]) : boolean{
        for(let i=0;i<atoms.length;i++) {
            if(!this.containsAtom(atoms[i])){
                return false
            }
        };
        return true
    }

    public containsAtom(atom: Atom) : boolean{
        for(let i=0;i<this.atoms.length;i++){
            if(atom.stringify() === this.atoms[i].stringify()){
                return true
            }
        }
        return false
    }
}