import assert from 'assert';
import { AnswerSet } from '../../dlv_output_parser/models/answer_set';
import { Atom } from '../../dlv_output_parser/models/atom';
import { Output } from '../../dlv_output_parser/models/output';

describe('Basic output parsing', function() {
    it('should parse', function() {
        let output_string = "ANSWER\natomo(1). atomo(2). atomo(3).\nOPTIMUM"
        let answer_set_object = new AnswerSet(
            [new Atom("atomo", ["1"]), new Atom("atomo", ["2"]), new Atom("atomo", ["3"])],
            [],
            true
        )
        assert.deepEqual(Output.parse(output_string), new Output([answer_set_object]))
    });
});