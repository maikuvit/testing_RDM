import assert from 'assert';
import { Cost } from '../../dlv_output_parser/models/cost';

describe('Basic cost parsing', function() {
    it('should parse', function() {
        let input = "1@2"
        let expected = new Cost(1,2)
        assert.deepEqual(Cost.parse(input), expected);
    });
    it('should stringify', function() {
        let input = new Cost(1,2)
        let expected = "1@2"
        assert.equal(input.stringify(), expected);
    });
});