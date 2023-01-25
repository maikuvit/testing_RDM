import { removeFile, writeFile } from "../common/file_handler";
import { Output } from "../dlv_output_parser/models/output";
import { AspTest } from "../test_parser/models/asp_test";
import { ProcessExecutor } from "./process_executor";

// ----maiku---- //


export class TestSolver {

    public static solve(test: AspTest, solver : 'dlv2' | 'clingo'): { [id: string]: string[] | boolean; } {

        var out: { [id: string]: string[] | boolean } = {};
        
        //cambiamento da fare: si scrive su file non in base allo scope del test,
        //ma ai modelli prodotti dalle assert. Metodo public dell'interface assert ...

        
        //per ogni assert genero i modelli di input, lo scrivo su un file ...
        // scrivo su file ogni modello e runno, poi verifico che ogni assert abbia true su tutti i modelli ...

        test.assert.forEach((s, index) => {
            
            let outModels : {[id: string] : Output} = {}


            //itero su ogni Set di input generato dal fullfilRequirements ...
            Object.entries(s.fullfilRequirements(test.rules(),test.input)).forEach( async (ob, index) =>{
                // run di asp ...

                let TEMP_FILE_PATH = `temp${index}.txt`;

                writeFile(TEMP_FILE_PATH, ob[1].stringify(), 'w');

                outModels[ob[0]] = await ProcessExecutor.exec_solver(TEMP_FILE_PATH, s.preConditions().AllAnswerSets, solver)

                removeFile(TEMP_FILE_PATH)
            }
            )
            let asserted = s.assert(outModels) 
            out[(s as any).constructor.name] = asserted.length != 0 ? asserted : true 
        })

        return out;
    }
}