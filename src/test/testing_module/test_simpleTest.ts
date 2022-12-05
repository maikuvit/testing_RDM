import assert from 'assert';
import {SimpleTest} from '../../testing_module/implementations/simpleTest'
import {NoAnswerSet} from '../../asserts/models/noAnswerSet'
import { Atom } from '../../dlv_output_parser/models/atom';

describe('Testing SimpleTest class', function() {
    it('should raise an Error', function() {
        assert.throws(
            () => new SimpleTest("Test1",["r1","r2"],"ciao1 ciao2",[new NoAnswerSet()]),
                Error
        )
        
    });
    it('should have the right name', function() {
        let inputTest = new SimpleTest("Test1",["r1","r2"],"atom(1,2)",[new NoAnswerSet()])
        assert.equal(inputTest.testName,"Test1")
    });
    it('should have the right scope', function() {
        let inputTest = new SimpleTest("Test1",["r1","r2"],"atom(1,2)",[new NoAnswerSet()])
        assert.deepStrictEqual(inputTest.scope,["r1","r2"])
    });
    it('should have the right input', function() {
        let inputTest = new SimpleTest("Test1",["r1","r2"],"atom(1,2)",[new NoAnswerSet()])
        assert.deepStrictEqual(inputTest.input,[new Atom("atom",["1","2"])])
    });
    it('should have the right types of assertions', function() {
        let inputTest = new SimpleTest("Test1",["r1","r2"],"atom(1,2)",[new NoAnswerSet()])
        assert.equal(inputTest.assert[0].constructor.name,NoAnswerSet.name)
    });
    
    
});