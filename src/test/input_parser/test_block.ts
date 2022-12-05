import assert from 'assert';
import { Block } from '../../input_parser/implementations/block';
import { SharedMap } from '../../input_parser/implementations/sharedMap';

describe('Testing block parsing', function() {
    it('should parse', function() {
        let input = "%** @block(name=\"ToTest\") **%"
        let expected = new Block("ToTest")
        Block.sharedMap = new SharedMap(new Map<string,Set<string>>())
        let parsedBlock:Block = Block.parse(input) as Block
        assert.equal(parsedBlock.annotationName, expected.annotationName);
    });
    it('should stringify', function() {
        let input = new Block("ToTest")
        let expected = "%** @block(name=\"ToTest\") **%"
        assert.equal(input.stringify(), expected);
    });
});