import assert from 'assert';
import { TestSolver } from '../../../src/test_solver/TestSolver';
import { TrueInAll } from '../../asserts/models/trueInAll';
import { Atom } from '../../dlv_output_parser/models/atom';
import { Block } from '../../input_parser/implementations/block';
import { Input } from '../../input_parser/implementations/input';
import { Rule } from '../../input_parser/implementations/rule';
import { SimpleTest } from '../../testing_module/implementations/simpleTest';

// ----maiku---- //

describe("The solver works properly", () => {
    
    it("should solve a basic example", () => {

        /*
        ----TEST DA RICREARE----
        %**@rule(name = "r1") **%
        a(X) :- b(X).
        %**@rule(name = "r2") **%
        b(X) :- c(X).

        --INPUT DEL TEST-- 
        c(1). c(2).


        lancio con @trueInAll(atoms="a(1).")

        */
        //creo obj di tipo input ...
        let rules = new Map<string,Rule>();
        rules.set("r1", new Rule("r1", "a(X) :- b(X)."));
        rules.set("r2", new Rule("r2", "b(X) :- c(X)."));

        let blocks = new Map<string, Block>();

        let test = new SimpleTest("test1",
        ["r1","r2"],
        "c(1). c(2).",
        [new TrueInAll([new Atom("a",["1"])])])
        let inputObject = new Input(rules, blocks);

        let solver = new TestSolver();
        let out = solver.solve(test, inputObject);
        assert.equal(JSON.stringify(out)==JSON.stringify({0: true}), true);
    })
}) 