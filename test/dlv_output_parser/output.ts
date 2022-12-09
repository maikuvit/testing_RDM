import assert from 'assert';
import { Cost } from '../../src/dlv_output_parser/models/cost';
import { AnswerSet } from '../../src/dlv_output_parser/models/answer_set';
import { Atom } from '../../src/dlv_output_parser/models/atom';
import { Output } from '../../src/dlv_output_parser/models/output';

describe('Basic output parsing', function () {
    it('should parse', function () {
        let input = "{atomo(1), atomo(2), atomo(3)}\nOPTIMUM"
        let expected = new Output(
            [
                new AnswerSet(
                    [new Atom("atomo", ["1"]), new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
                    [],
                    true
                )
            ]
        )
        assert.deepEqual(Output.parse(input), expected)
    });
    it('should parse', function () {
        let input = "{atomo(1,ciao), atomo(2,come), atomo(3,stai)}\nOPTIMUM\n{atomo(1,come), atomo(2,stai), atomo(3,ciao)}\nCOST 1@2"
        let expected = new Output(
            [
                new AnswerSet(
                    [new Atom("atomo", ["1", "ciao"]), new Atom("atomo", ["2", "come"]), new Atom("atomo", ["3", "stai"])],
                    [new Cost(1, 2)],
                    true
                ),
                new AnswerSet(
                    [new Atom("atomo", ["1", "come"]), new Atom("atomo", ["2", "stai"]), new Atom("atomo", ["3", "ciao"])],
                    [new Cost(1, 2)],
                    true
                )
            ]
        )
        assert.deepEqual(Output.parse(input), expected)
    });
    it('should stringify', function () {
        let input = new Output(
            [
                new AnswerSet(
                    [new Atom("atomo", ["1", "ciao"]), new Atom("atomo", ["2", "come"]), new Atom("atomo", ["3", "stai"])],
                    [],
                    true
                ),
                new AnswerSet(
                    [new Atom("atomo", ["1", "come"]), new Atom("atomo", ["2", "stai"]), new Atom("atomo", ["3", "ciao"])],
                    [new Cost(1, 2)],
                    false
                )
            ]
        )
        let expected = "ANSWER\natomo(1,ciao). atomo(2,come). atomo(3,stai).\nOPTIMUM\n\nANSWER\natomo(1,come). atomo(2,stai). atomo(3,ciao).\nCOST 1@2"
        assert.equal(input.stringify(), expected);
    });
});