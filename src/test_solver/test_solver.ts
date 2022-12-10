import { Config } from "../common/config";
import { removeFile, writeFile } from "../common/file_handler";
import { AspTest } from "../test_parser/models/asp_test";
import { DLV2ProcessExecutor } from "./exec/dlv2_process_executor";

// ----maiku---- //

const TEMP_FILE_PATH = "temp.txt"

export class TestSolver {

    public static solve(test: AspTest): { [id: string]: boolean; } {

        var out: { [id: string]: boolean } = {};
        
        test.assert.forEach((s, index) => {

            let rules : string = test.scope.join('\n')
            let input : string = test.input.map(a => a.stringify()).join('\n')
            let to_write = `${rules}\n${input}`
            writeFile(TEMP_FILE_PATH, to_write, 'w')

            let options = s.preConditions()?.options ?? "";

            out[index] = s.assert(DLV2ProcessExecutor.exec_solver(TEMP_FILE_PATH, options))

            // removeFile(TEMP_FILE_PATH)
        })

        return out;
    }
}