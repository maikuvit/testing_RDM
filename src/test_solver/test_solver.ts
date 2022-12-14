import { removeFile, writeFile } from "../common/file_handler";
import { AspTest } from "../test_parser/models/asp_test";
import { DLV2ProcessExecutor } from "./exec/dlv2_process_executor";

// ----maiku---- //

const TEMP_FILE_PATH = "temp.txt"

export class TestSolver {

    public static solve(test: AspTest): { [id: string]: boolean; } {

        var out: { [id: string]: boolean } = {};
        
        //cambiamento da fare: si scrive su file non in base allo scope del test,
        //ma ai modelli prodotti dalle assert. Metodo public dell'interface assert ...

        
        //per ogni assert genero i modelli di input, lo scrivo su un file ...
        // scrivo su file ogni modello e runno, poi verifico che ogni assert abbia true su tutti i modelli ...

        test.assert.forEach((s, index) => {
            

            //modello in input ...

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