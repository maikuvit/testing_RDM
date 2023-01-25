import assert from 'assert';
import { TestSolver } from '../../src/test_solver/test_solver';
import { TestParser } from '../../src/test_parser/test_parser';

// ----maiku---- //

describe("The solver works properly", () => {

    it("should solve a basic example", () => {
        TestParser.parse_test_file("assets/input2_tests.tasp").tests.forEach(async (test) => {
            let out = await TestSolver.solve(test, 'dlv2');
            assert.equal(JSON.stringify(out) == JSON.stringify({ 0: true }), false);
        })
    })
}) 