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

    public static get regex(): RegExp {
        return /ANSWER\n((?:[a-z]\w*\((?:\w+(?:,\w+)*)\)\.\s*)+)\n(?:COST (?:((?:\d+@\d+\s*)+)*)\n)*((?:OPTIMUM)*)*/
    }

    protected static tranform(match: RegExpMatchArray): AnswerSet {
        let atoms : Atom[] = match[1]?.split(' ').map((atom_raw : string) => Atom.parse(atom_raw) as Atom) ?? []
        let costs : Cost[] = match[2]?.split(' ').map((cost_raw : string) => Cost.parse(cost_raw) as Cost) ?? []
        let optimum : boolean = match[3] === 'OPTIMUM' ?? false
        return new AnswerSet(atoms, costs, optimum)
    }

}