import assert from 'assert';
import path from 'path';
import { AnswerSet } from '../../src/dlv_output_parser/models/answer_set';
import { Atom } from '../../src/dlv_output_parser/models/atom';
import { Output } from '../../src/dlv_output_parser/models/output';

// ----maiku---- //

describe("DLV2ProcessExecutor works properly", () => {

    // it("should interact with the solver", () => {

    //     let config = new MockConfigFile("")
    //     let exec_path = JSON.parse(config.readFromFile())["exe_path"]
    //     let executor = new DLV2ProcessExecutor(exec_path)
    //     let out = executor.exec_solver(path.join(__dirname,"inp_test1.txt"), "")
        
    //     // creo answer set ad hoc per l'input presente nel file ... 
    //     let as = new AnswerSet(
    //         [new Atom("a", ["2"]), new Atom("b", ["2"]), new Atom("a", ["1"])],
    //         [],
    //         false)
    //     let temp = new Output([as]);
        
    //     assert.equal(JSON.stringify(out)==JSON.stringify(temp), true);
        
    // })
})
