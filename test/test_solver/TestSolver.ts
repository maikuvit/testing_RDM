import assert from 'assert';
import { TrueInAll } from '../../src/test_solver/asserts/true_in_all';
import { TestSolver } from '../../src/test_solver/test_solver';
import { TestParser } from '../../src/test_parser/test_parser';
import { AspTest } from '../../src/test_parser/models/asp_test';
import { Atom } from '../../src/dlv_output_parser/models/atom';

// ----maiku---- //

describe("The solver works properly", () => {

    it("should solve a basic example", () => {
        TestParser.parse_test_file("assets/input2_tests.tasp").tests.forEach((test) => {
            let out = TestSolver.solve(test);
            assert.equal(JSON.stringify(out) == JSON.stringify({ 0: true }), false);
        })
    })
}) 