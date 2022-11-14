"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atom = void 0;
const dlv_model_1 = require("../interfaces/dlv_model");
class Atom extends dlv_model_1.DlvModel {
    name;
    literals;
    constructor(name, literals) {
        super();
        this.name = name;
        this.literals = literals;
    }
    static get regex() {
        return /^([a-z]\w*)\((\w+(?:,\w+)*)\)\.$/;
    }
    static tranform(match) {
        let name = match[1];
        let literals = match[2].split(',');
        return new Atom(name, literals);
    }
}
exports.Atom = Atom;
