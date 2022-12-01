import assert from 'assert';
import path from 'path';
import {TestSolver} from '../../../src/test_solver/TestSolver';
import { DlvModel } from '../../dlv_output_parser/interfaces/dlv_model';
import { AnswerSet } from '../../dlv_output_parser/models/answer_set';
import { Atom } from '../../dlv_output_parser/models/atom';
import { Cost } from '../../dlv_output_parser/models/cost';
import { Output } from '../../dlv_output_parser/models/output';
import { TestInterface } from '../../testing_module/interfaces/testInterface';


// ----maiku---- //

let solver = new TestSolver()

describe("The solver works properly", () => {

    it("should correctly resolve a test"), () =>{
        // i need to build a mock-test object ... 

        //TEMPORARY (aspetto conferma da Fabio per un obj Test)
        assert.equal(true, true)
    }


    it("should interact with the solver", () => {
        // test la function privata (temporaneamente non più privata, only for dev scope )...
        solver.exec_solver(path.join(__dirname,"inp_test1.txt")).then( (out : DlvModel) =>{
        
            // creo answer set ad hoc per l'input presente nel file ... 
            let as = new AnswerSet(
                [new Atom("a", ["2"]), new Atom("b", ["2"]), new Atom("a", ["1"])],
                [new Cost(1,2)],
                 true)
            let temp = new Output([as])
             assert.equal(out, temp)
        }
        )
    })


})