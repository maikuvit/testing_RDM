"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const utils_1 = require("../../utils/utils");
const dlv_model_1 = require("../interfaces/dlv_model");
const answer_set_1 = require("./answer_set");
class Output extends dlv_model_1.DlvModel {
    answers;
    constructor(answers) {
        super();
        this.answers = answers;
    }
    static get regex() {
        return new RegExp(answer_set_1.AnswerSet.regex, 'g');
    }
    static tranform(matches) {
        let answer_sets = matches.map((raw_answer) => answer_set_1.AnswerSet.parse(raw_answer));
        for (let i = 0; i < answer_sets.length; i++) {
            for (let j = i + 1; j < answer_sets.length; j++) {
                let first = answer_sets[i];
                let second = answer_sets[j];
                //if there are two answer set with same atoms
                if ((0, utils_1.areArrayEqualNoOrder)(first.atoms, second.atoms)) {
                    //merge costs & optimatility into first
                    first.costs = (0, utils_1.fillMissingValues)(second.costs, first.costs);
                    first.optimum = second.optimum || first.optimum;
                    //remove second
                    answer_sets.splice(j, 1);
                }
            }
        }
        return new Output(answer_sets);
    }
}
exports.Output = Output;
