import assert from 'assert';
import { TestSolver } from '../../../src/test_solver/TestSolver';
import { TrueInExactly } from '../../asserts/models/trueInExactly';
import { SimpleTest } from '../../testing_module/implementations/simpleTest';

// ----maiku---- //

describe("The solver works properly", () => {
    
    it("should solve a basic example", () => {

        let test = new SimpleTest("test1",
        ["r1","r2"],
        "node(1). node(2). node(3). edge(1,2). edge(1,3). edge(2,3).",
        [new TrueInExactly(2,["col(1, red)."])],"assets/input2.asp")

        let solver = new TestSolver();
        let out = solver.solve(test);
        assert.equal(JSON.stringify(out)==JSON.stringify({0: true}), true);
    })
}) 