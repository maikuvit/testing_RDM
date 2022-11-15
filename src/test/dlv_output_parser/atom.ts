import assert from 'assert';
import { Atom } from '../../dlv_output_parser/models/atom';

describe('Basic atom parsing', function() {
    it('should parse', function() {
        assert.deepEqual(Atom.parse("name(1)."), new Atom("name", ["1"]));
    });
});