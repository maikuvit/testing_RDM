import assert from 'assert';
import { AnswerSet } from '../../dlv_output_parser/models/answer_set';
import { Atom } from '../../dlv_output_parser/models/atom';

describe('Basic answer set parsing', function() {
    it('should parse', function() {
        let answer_set_string = "ANSWER\natomo(1). atomo(2). atomo(3).\nOPTIMUM"
        let answer_set_object = new AnswerSet(
            [new Atom("atomo", ["1"]), new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        assert.deepEqual(AnswerSet.parse(answer_set_string), answer_set_object)
    });
});