import assert from 'assert';
import { TrueInExactly } from '../../src/test_solver/asserts/models/true_in_exactly';
import { TestSolver } from '../../src/test_solver/TestSolver';
import { AspTest } from '../../src/test_parser/models/asp_test';

// ----maiku---- //

describe("The solver works properly", () => {
    
    it("should solve a basic example", () => {

        let test = AspTest.generate("test1",
        ["r1","r2"],
        "node(1). node(2). node(3). edge(1,2). edge(1,3). edge(2,3).",
        [new TrueInExactly(2,["col(1, red)."])],"assets/input2.asp")

        let solver = new TestSolver();
        let out = solver.solve(test);
        assert.equal(JSON.stringify(out)==JSON.stringify({0: true}), true);
    })
}) 