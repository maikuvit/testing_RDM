import assert from 'assert';
import { Output } from '../../dlv_output_parser/models/output';
import { Parser } from '../../dlv_output_parser/parser';

describe('Basic parser functionalities', function() {
    it('should parse', function() {
        let input = "INCONSISTENT"
        let expected = new Output([])
        assert.deepEqual(Parser.parse(input), expected);
    });
});