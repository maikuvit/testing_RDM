import assert from 'assert';
import { Atom } from '../../dlv_output_parser/models/atom';

describe('Basic atom parsing', function() {
    it('should parse', function() {
        let input = "name(1)"
        let expected = new Atom("name", ["1"])
        assert.deepEqual(Atom.parse(input), expected);
    });
    it('should stringify', function() {
        let input = new Atom("name", ["1"])
        let expected = "name(1)."
        assert.equal(input.stringify(), expected);
    });
});