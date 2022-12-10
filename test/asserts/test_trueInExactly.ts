import assert from 'assert';
import { Atom } from '../../src/dlv_output_parser/models/atom';
import { AnswerSet } from '../../src/dlv_output_parser/models/answer_set';
import { Output } from '../../src/dlv_output_parser/models/output';
import { TrueInExactly } from '../../src/test_solver/asserts/true_in_exactly';

describe('testing TrueInExactly assertion', function () {
    it('should return True', function () {
        let output = new Output([
            new AnswerSet(
                [new Atom("atomo", ["1", "2"]), new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
                [],
                true
            )
        ])
        let assertion = new TrueInExactly(1, [new Atom("atomo", ["1", "2"]), new Atom("atomo", ["2"])])
        assert.equal(assertion.assert(output), true)
    });
    it('should return False', function () {
        let assertion = new TrueInExactly(1, [new Atom("atomo", ["1", "2"]), new Atom("atomo", ["4"])])
        let output = new Output([
            new AnswerSet(
                [new Atom("atomo", ["1", "2"]), new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
                [],
                true
            )
        ])
        assert.equal(assertion.assert(output), false)
    });
    it('Atom should be contained exactly in 2 answerSet', function () {
        let answer1 = new AnswerSet(
            [new Atom("atomo", ["2"]), new Atom("atomo", ["1", "2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let answer2 = new AnswerSet(
            [new Atom("atomo", ["1", "2"]), new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let answer3 = new AnswerSet(
            [new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let output = new Output([answer1, answer2, answer3])
        let assertion = new TrueInExactly(2, [new Atom('atomo', ['1', '2'])])
        assert.equal(assertion.assert(output), true)
    });
    it('Atom should be contained exactly in 1 answerSet', function () {
        let answer1 = new AnswerSet(
            [new Atom("atomo", ["2"]), new Atom("atomo", ["1", "2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let answer2 = new AnswerSet(
            [new Atom("atomo", ["1", "2"]), new Atom("atomo", ["2"]), new Atom("atomo", ["1", "4"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let answer3 = new AnswerSet(
            [new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let answers = new Output([answer1, answer2, answer3])
        let assertion = new TrueInExactly(1, [new Atom('atomo', ['1', '4'])])
        assert.equal(assertion.assert(answers), true)
    });
    it('validate method should return false', function () {
        let answer1 = new AnswerSet(
            [new Atom("atomo", ["2"]), new Atom("atomo", ["1", "2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let answer2 = new AnswerSet(
            [new Atom("atomo", ["1", "2"]), new Atom("atomo", ["2"]), new Atom("atomo", ["1", "4"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let answer3 = new AnswerSet(
            [new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let output = new Output([answer1, answer2, answer3])
        let assertion = new TrueInExactly(2, [new Atom('atomo', ['1', '4'])])
        assert.equal(assertion.assert(output), false)
    });
    it('validate method should return false', function () {
        let answer1 = new AnswerSet(
            [new Atom("atomo", ["2"]), new Atom("atomo", ["1", "2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let answer2 = new AnswerSet(
            [new Atom("atomo", ["1", "2"]), new Atom("atomo", ["2"]), new Atom("atomo", ["1", "4"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let answer3 = new AnswerSet(
            [new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let output = new Output([answer1, answer2, answer3])
        let assertion = new TrueInExactly(1, [new Atom('atomo', ['1', '8'])])
        assert.equal(assertion.assert(output), false)
    });
});