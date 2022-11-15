"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerSet = void 0;
const dlv_model_1 = require("../interfaces/dlv_model");
const atom_1 = require("./atom");
const cost_1 = require("./cost");
class AnswerSet extends dlv_model_1.DlvModel {
    atoms;
    costs;
    optimum;
    constructor(atoms, costs, optimum) {
        super();
        this.atoms = atoms;
        this.costs = costs;
        this.optimum = optimum;
    }
    static get regex() {
        return /ANSWER\n((?:[a-z]\w*\((?:\w+(?:,\w+)*)\)\.\s*)+)\n(?:COST (?:((?:\d+@\d+\s*)+)*)\n)*((?:OPTIMUM)*)*/;
    }
    static tranform(match) {
        let atoms = match[1]?.split(' ').map((atom_raw) => atom_1.Atom.parse(atom_raw)) ?? [];
        let costs = match[2]?.split(' ').map((cost_raw) => cost_1.Cost.parse(cost_raw)) ?? [];
        let optimum = match[3] === 'OPTIMUM' ?? false;
        return new AnswerSet(atoms, costs, optimum);
    }
}
exports.AnswerSet = AnswerSet;
