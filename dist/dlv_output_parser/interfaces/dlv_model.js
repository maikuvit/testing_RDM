"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DlvModel = void 0;
class DlvModel {
    static get regex() {
        throw new Error(`method not implemented`);
    }
    static tranform(matches) {
        throw new Error(`method not implemented`);
    }
    static parse(raw_input) {
        let matches = raw_input.match(this.regex);
        if (matches) {
            return this.tranform(matches);
        }
        throw new Error(`${this.name} could not parse '${raw_input}' with '${this.regex}'`);
    }
}
exports.DlvModel = DlvModel;
