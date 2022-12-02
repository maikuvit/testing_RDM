import { DlvModel } from "../dlv_output_parser/interfaces/dlv_model";
import { Output } from "../dlv_output_parser/models/output";
import { Parser } from "../dlv_output_parser/parser";
import { TestInterface } from "../testing_module/interfaces/testInterface";
import { FilesHandler } from "../utils/FilesHandler/FilesHandler";
import { MockConfigFile } from "../utils/FilesHandler/mockHandlers/Mock_ConfigFilesHandler";
import { DLV2ProcessExecutor } from "./DLV2ProcessExecutor";
import { ProcessExecutor } from "./ProcessExecutor";
const { exec } = require('node:child_process');


// ----maiku---- //
export class TestSolver {

    //ho una obj test che contiene tutte le info:
    // mi serve: 
    // public met solve <- input Test
    // private met exec_solver <- set di opzioni sul solver
    //                           path file di input
    //                           parse su input (modulo di fede)
    // private met genFile <- set input 

    //temp implementation! return list di assert di lunghezza asserts - 1
    public solve(Test : TestInterface) : Object {

        let config = new MockConfigFile("")
        // qui controllo futuro per vari solver, per ora creo solo DLV che basta
        let executor = new DLV2ProcessExecutor(JSON.parse(config.readFromFile())["exe_path"]) 

        
        //prendo gli asserts, poi per ognuno di esso combino input e faccio call sul solver ...
        // for s in asserts:
        //      s.assert(input)
        let input = "";
        let testAsserts : object = [];

        let out : object = {};
        for(let s in testAsserts){
            // out["${s.getName()}"] = s.assert(input)
        }

        return out;
    }

    //temp implementation! return il path del file di input
    private genTempFile() : String{
        return "";
    }

}