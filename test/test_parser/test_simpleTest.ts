import assert from "assert";
import {AspTest} from "../../src/test_parser/models/asp_test"
import {NoAnswerSet} from "../../src/test_solver/asserts/no_answer_set"
import { Atom } from "../../src/dlv_output_parser/models/atom";

describe("Testing SimpleTest class", function() {
    it("should raise an Error", function() {
        assert.throws(
            () => new AspTest("Test1",["r1","r2"],[new Atom("atom", ["1","2"])],[new NoAnswerSet()],"ciao"),
                Error
        )
    });
    it("should have the right name", function() {
        let inputTest = new AspTest("Test1",["r1","r2"],[new Atom("atom", ["1","2"])],[new NoAnswerSet()],"assets/input2.asp")
        assert.equal(inputTest.name,"Test1")
    });
    it("should have the right scope", function() {
        let inputTest = new AspTest("Test1",["r1","r2"],[new Atom("atom", ["1","2"])],[new NoAnswerSet()],"assets/input2.asp")
        assert.deepEqual(inputTest.scope,["col(X,red) | col(X,blue) | col(X,green) :- node(X).",":- edge(X, Y), col(X,C), col(Y,C)."])
    });
    it("should have the right input", function() {
        let inputTest = new AspTest("Test1",["r1","r2"],[new Atom("atom", ["1","2"])],[new NoAnswerSet()],"assets/input2.asp")
        assert.deepEqual(inputTest.input,[new Atom("atom",["1","2"])])
    });
    it("should have the right types of assertions", function() {
        let inputTest = new AspTest("Test1",["r1","r2"],[new Atom("atom", ["1","2"])],[new NoAnswerSet()],"assets/input2.asp")
        assert.equal(inputTest.assert[0].constructor.name,NoAnswerSet.name)
    });
    
    
});