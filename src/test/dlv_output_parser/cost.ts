import assert from 'assert';
import { Cost } from '../../dlv_output_parser/models/cost';

describe('Basic cost parsing', function() {
    it('should parse', function() {
        assert.deepEqual(Cost.parse("1@2"), new Cost(1,2));
    });
});