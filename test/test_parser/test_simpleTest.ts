import assert from 'assert';
import {SimpleTest} from '../../src/test_parser/models/simple_test'
import {NoAnswerSet} from '../../src/test_solver/asserts/models/no_answer_set'
import { Atom } from '../../src/dlv_output_parser/models/atom';

describe('Testing SimpleTest class', function() {
    it('should raise an Error (input not allowed)', function() {
        assert.throws(
            () => new SimpleTest("Test1",["r1","r2"],"ciao1 ciao2",[new NoAnswerSet()],"assets/input2.asp").input,
                Error
        )
        
    });
    it('should raise an Error', function() {
        assert.throws(
            () => new SimpleTest("Test1",["r1","r2"],"atom(1,2)",[new NoAnswerSet()],"ciao"),
                Error
        )
    });
    it('should have the right name', function() {
        let inputTest = new SimpleTest("Test1",["r1","r2"],"atom(1,2)",[new NoAnswerSet()],"assets/input2.asp")
        assert.equal(inputTest.testName,"Test1")
    });
    it('should have the right scope', function() {
        let inputTest = new SimpleTest("Test1",["r1","r2"],"atom(1,2)",[new NoAnswerSet()],"assets/input2.asp")
        assert.deepStrictEqual(inputTest.scope,["col(X,red) | col(X,blue) | col(X,green) :- node(X).",":- edge(X, Y), col(X,C), col(Y,C)."])
    });
    it('should have the right input', function() {
        let inputTest = new SimpleTest("Test1",["r1","r2"],"atom(1,2)",[new NoAnswerSet()],"assets/input2.asp")
        assert.deepStrictEqual(inputTest.input,[new Atom("atom",["1","2"])])
    });
    it('should have the right types of assertions', function() {
        let inputTest = new SimpleTest("Test1",["r1","r2"],"atom(1,2)",[new NoAnswerSet()],"assets/input2.asp")
        assert.equal(inputTest.assert[0].constructor.name,NoAnswerSet.name)
    });
    
    
});