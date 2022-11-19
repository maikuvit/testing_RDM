import assert from 'assert';
import { AnswerSet } from '../../dlv_output_parser/models/answer_set';
import { Atom } from '../../dlv_output_parser/models/atom';
import { Cost } from '../../dlv_output_parser/models/cost';

describe('Basic answer set parsing', function() {
    it('should parse', function() {
        let input = "ANSWER\natomo(1). atomo(2). atomo(3).\nOPTIMUM"
        let expected = new AnswerSet(
            [new Atom("atomo", ["1"]), new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        assert.deepEqual(AnswerSet.parse(input), expected)
    });
    it('should stringify', function() {
        let input = new AnswerSet(
            [new Atom("atomo", ["1"]), new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        let expected = "ANSWER\natomo(1). atomo(2). atomo(3).\nOPTIMUM"
        assert.equal(AnswerSet.to_string(input), expected);
    });
    it('should stringify', function() {
        let input = new AnswerSet(
            [new Atom("atomo", ["1"]), new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
            [new Cost(1,2), new Cost(2,3)],
            true
        )
        let expected = "ANSWER\natomo(1). atomo(2). atomo(3).\nCOST 1@2 2@3\nOPTIMUM"
        assert.equal(AnswerSet.to_string(input), expected);
    });
    it('should stringify', function() {
        let input = new AnswerSet(
            [new Atom("atomo", ["1"]), new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
            [new Cost(1,2), new Cost(2,3)],
            false
        )
        let expected = "ANSWER\natomo(1). atomo(2). atomo(3).\nCOST 1@2 2@3"
        assert.equal(AnswerSet.to_string(input), expected);
    });
});