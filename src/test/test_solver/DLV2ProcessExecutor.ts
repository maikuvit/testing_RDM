import assert from 'assert';
import path from 'path';
import {DLV2ProcessExecutor} from '../../../src/test_solver/DLV2ProcessExecutor';
import { DlvModel } from '../../dlv_output_parser/interfaces/dlv_model';
import { AnswerSet } from '../../dlv_output_parser/models/answer_set';
import { Atom } from '../../dlv_output_parser/models/atom';
import { Cost } from '../../dlv_output_parser/models/cost';
import { Output } from '../../dlv_output_parser/models/output';
import { MockConfigFile } from '../../utils/FilesHandler/mockHandlers/Mock_ConfigFilesHandler';


describe("DLV2ProcessExecutor works properly", () => {

    it("should interact with the solver", () => {
        // test la function privata (temporaneamente non più privata, only for dev scope )...
        let config = new MockConfigFile("")
        let exec_path = JSON.parse(config.readFromFile())["exe_path"]
        let executor = new DLV2ProcessExecutor(exec_path)
        executor.exec_solver(path.join(__dirname,"inp_test1.txt")).then( (out : DlvModel) =>{
        
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