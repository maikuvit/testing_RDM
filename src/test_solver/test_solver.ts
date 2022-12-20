import { removeFile, writeFile } from "../common/file_handler";
import { Output } from "../dlv_output_parser/models/output";
import { AspInput } from "../test_parser/models/asp_input";
import { AspTest } from "../test_parser/models/asp_test";
import { DLV2ProcessExecutor } from "./exec/dlv2_process_executor";

// ----maiku---- //


export class TestSolver {

    public static solve(test: AspTest): { [id: string]: string[] | boolean; } {

        var out: { [id: string]: string[] | boolean } = {};
        
        //cambiamento da fare: si scrive su file non in base allo scope del test,
        //ma ai modelli prodotti dalle assert. Metodo public dell'interface assert ...

        
        //per ogni assert genero i modelli di input, lo scrivo su un file ...
        // scrivo su file ogni modello e runno, poi verifico che ogni assert abbia true su tutti i modelli ...

        test.assert.forEach((s, index) => {
            

            //modello in input ...

            //metodo stringify nel asp_input! 
            let rules : string = test.scope.join('\n')
            let input : string = test.input.map(a => a.stringify()).join('\n')
            let to_write = `${rules}\n${input}`;

            let outModels : Output[] = []

            let options = s.preConditions()?.options ?? "";


            //itero su ogni Set di input generato dal fullfilRequirements ...
            s.fullfilRequirements(test.rules(),test.input).forEach( (ob : AspInput, index) =>{
                // run di asp ...

                let TEMP_FILE_PATH = `temp${index}.txt`;

                writeFile(TEMP_FILE_PATH, ob.stringify(), 'w');

                outModels[index] = DLV2ProcessExecutor.exec_solver(TEMP_FILE_PATH, options)

                removeFile(TEMP_FILE_PATH)
            }
            )
            let asserted = s.assert(outModels) 
            out[(s as any).constructor.name] = asserted.length != 0 ? asserted : true 
        })

        return out;
    }
}