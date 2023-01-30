import assert from "assert";
import {AspTest} from "../../src/test_parser/models/asp_test"
import {NoAnswerSet} from "../../src/test_solver/asserts/no_answer_set"
import { Atom } from "../../src/dlv_output_parser/models/atom";
import { TestName } from "../../src/test_parser/domain_primitives/test_name";
import { Label } from "../../src/input_parser/domain_primitives/label";
import { GenericPath } from "../../src/test_parser/domain_primitives/generic_path";
import { Assert } from "../../src/common/interfaces/assert";

describe("Testing AspTest class", function() {
    it("should have the right name", function() {
        let name:TestName = new TestName("Test1")
        let scope:Label[] = [new Label("r1"),new Label("r2")]
        let atoms:Atom[] = [new Atom("atom", ["1","2"])]
        let asserts:Assert[] = [new NoAnswerSet()]
        let path = new GenericPath("demo/input2.asp")
        let inputTest = new AspTest(name,scope,atoms,asserts,path)
        assert.equal(inputTest.name.stringify(),"Test1")
    });
    it("should have the right scope", function() {
        let name:TestName = new TestName("Test1")
        let scope:Label[] = [new Label("r1"),new Label("r2")]
        let atoms:Atom[] = [new Atom("atom", ["1","2"])]
        let asserts:Assert[] = [new NoAnswerSet()]
        let path = new GenericPath("demo/input2.asp")
        let inputTest = new AspTest(name,scope,atoms,asserts,path)
        assert.deepStrictEqual(inputTest.scope,scope)
    });
    it("should have the right input", function() {
        let name:TestName = new TestName("Test1")
        let scope:Label[] = [new Label("r1"),new Label("r2")]
        let atoms:Atom[] = [new Atom("atom", ["1","2"])]
        let asserts:Assert[] = [new NoAnswerSet()]
        let path = new GenericPath("demo/input2.asp")
        let inputTest = new AspTest(name,scope,atoms,asserts,path)
        assert.deepStrictEqual(inputTest.input,atoms)
    });
    it("should have the right types of assertions", function() {
        let name:TestName = new TestName("Test1")
        let scope:Label[] = [new Label("r1"),new Label("r2")]
        let atoms:Atom[] = [new Atom("atom", ["1","2"])]
        let asserts:Assert[] = [new NoAnswerSet()]
        let path = new GenericPath("demo/input2.asp")
        let inputTest = new AspTest(name,scope,atoms,asserts,path)
        assert.deepStrictEqual(inputTest.assert,asserts)
    });
});