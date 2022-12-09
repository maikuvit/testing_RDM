import assert from 'assert';
import { TrueInExactly } from '../../src/test_solver/asserts/models/true_in_exactly';
import { TestSolver } from '../../src/test_solver/TestSolver';
import { AspTest } from '../../src/test_parser/models/asp_test';
import { Atom } from '../../src/dlv_output_parser/models/atom';

// ----maiku---- //

describe("The solver works properly", () => {
    
    it("should solve a basic example", () => {

        let test = new AspTest("test1",
        ["r1","r2"],
        [new Atom('node', ['1']), new Atom('node', ['2']), new Atom('node', ['3']),
        new Atom('edge', ['1','2']), new Atom('edge', ['1','3']), new Atom('edge', ['2','3']),],
        [new TrueInExactly(2,[new Atom('col', ['1', 'red'])])],"assets/input2.asp")

        let solver = new TestSolver();
        let out = solver.solve(test);
        assert.equal(JSON.stringify(out)==JSON.stringify({0: true}), true);
    })
}) 