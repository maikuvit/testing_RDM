"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const answer_set_1 = require("../../dlv_output_parser/models/answer_set");
const atom_1 = require("../../dlv_output_parser/models/atom");
describe('Basic answer set parsing', function () {
    it('should parse', function () {
        let answer_set_string = "ANSWER\natomo(1). atomo(2). atomo(3).\nOPTIMUM";
        let answer_set_object = new answer_set_1.AnswerSet([new atom_1.Atom("atomo", ["1"]), new atom_1.Atom("atomo", ["2"]), new atom_1.Atom("atomo", ["3"])], [], true);
        assert_1.default.deepEqual(answer_set_1.AnswerSet.parse(answer_set_string), answer_set_object);
    });
});
