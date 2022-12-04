import { DlvAssert } from "../asserts/interfaces/dlvAssert";
import { DlvModel } from "../dlv_output_parser/interfaces/dlv_model";
import { Atom } from "../dlv_output_parser/models/atom";
import { Output } from "../dlv_output_parser/models/output";
import { Parser } from "../dlv_output_parser/parser";
import { Input } from "../input_parser/implementations/input";
import { SimpleTest } from "../testing_module/implementations/simpleTest";
import { TestInterface } from "../testing_module/interfaces/testInterface";
import { FilesHandler } from "../utils/FilesHandler/FilesHandler";
import { MockConfigFile } from "../utils/FilesHandler/mockHandlers/Mock_ConfigFilesHandler";
import { DLV2ProcessExecutor } from "./DLV2ProcessExecutor";
import { ProcessExecutor } from "./ProcessExecutor";
const { exec } = require('node:child_process');


// ----maiku---- //
export class TestSolver {

    executor: DLV2ProcessExecutor= new DLV2ProcessExecutor(MockConfigFile._path); 

    //ho una obj test che contiene tutte le info:
    // mi serve: 
    // public met solve <- input Test
    // private met exec_solver <- set di opzioni sul solver
    //                           path file di input
    //                           parse su input (modulo di fede)
    // private met genFile <- set input 

    //temp implementation! return list di assert di lunghezza asserts - 1
    public async solve(test : SimpleTest) : Promise<Object> {

        let config = new MockConfigFile("")
        // qui controllo futuro per vari solver, per ora creo solo DLV che basta
        let executor = new DLV2ProcessExecutor(JSON.parse(config.readFromFile())["exe_path"]) 

        
        //prendo gli asserts, poi per ognuno di esso combino input e faccio call sul solver ...
        // for s in asserts:
        //      s.assert(input)
        
        let input = test.scope;

        let testAsserts = test.assert;


        var out: { [id: string] : boolean; } = {};
        testAsserts.forEach(async (s) => { 
            //per ogni assert creo l'input e poi chiamo un solver ... 
            let output = await executor.exec_solver(this.genTempFile(input))
            out["${s.getName()}"] = s.assert(output)
        } )
        

        return out;
    }

    //temp implementation! return il path del file di input
    private genTempFile(input : string) : string{
        return "";
    }

}