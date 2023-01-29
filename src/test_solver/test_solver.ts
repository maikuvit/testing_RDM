import { removeFile, writeFile } from "../common/file_handler";
import { Output } from "../dlv_output_parser/models/output";
import { AspTest } from "../test_parser/models/asp_test";
import { ProcessExecutor } from "./process_executor";

// ----maiku---- //


export class TestSolver {

    public static async solve(asptest: AspTest, solver: 'dlv2' | 'clingo'): Promise<{ [id: string]: string[] | boolean; }> {

        var out: { [id: string]: string[] | boolean } = {};

        for (let i = 0; i < asptest.assert.length; i++) {

            const assert = asptest.assert[i];
            let outModels: { [id: string]: Output } = {}

            let nestedArray = Object.entries(assert.fullfilRequirements(asptest.rules(), asptest.input))
            
            for (let j = 0; j < nestedArray.length; j++) {
                const ob = nestedArray[j];
                let TEMP_FILE_PATH = `temp${i}${j}.txt`;
                writeFile(TEMP_FILE_PATH, ob[1].stringify(), 'w');
                outModels[ob[0]] = await ProcessExecutor.exec_solver(TEMP_FILE_PATH, assert.preConditions().AllAnswerSets, solver)
                removeFile(TEMP_FILE_PATH)
            }
            let asserted = assert.assert(outModels)
            out[`${i + 1}_${(assert as any).constructor.name}`] = asserted.length != 0 ? asserted : true
        }

        return out;
    }
}