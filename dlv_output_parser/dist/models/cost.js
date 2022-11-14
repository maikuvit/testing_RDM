"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cost = void 0;
const dlv_model_1 = require("../interfaces/dlv_model");
class Cost extends dlv_model_1.DlvModel {
    weight;
    level;
    constructor(weight, level) {
        super();
        this.weight = weight;
        this.level = level;
    }
    static get regex() {
        return /(\d+)@(\d+)/;
    }
    static tranform(match) {
        let weight = Number.parseInt(match[1]);
        let level = Number.parseInt(match[2]);
        return new Cost(weight, level);
    }
}
exports.Cost = Cost;
