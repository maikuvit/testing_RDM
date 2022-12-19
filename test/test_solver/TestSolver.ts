import assert from 'assert';
import { TrueInAll } from '../../src/test_solver/asserts/true_in_all';
import { TestSolver } from '../../src/test_solver/test_solver';
import { AspTest } from '../../src/test_parser/models/asp_test';
import { Atom } from '../../src/dlv_output_parser/models/atom';

// ----maiku---- //

describe("The solver works properly", () => {

    it("should solve a basic example", () => {

        let test = new AspTest("test1",
            ["r1", "r2"],
            [new Atom('node', ['1']), new Atom('node', ['2']), new Atom('node', ['3']),
            new Atom('edge', ['1', '2']), new Atom('edge', ['1', '3']), new Atom('edge', ['2', '3']),],
            [new TrueInAll([new Atom("node", ["1"])])],
             "assets/input1.asp")

        let out = TestSolver.solve(test);
        assert.equal(JSON.stringify(out) == JSON.stringify({ 0: true }), true);
    })
}) 