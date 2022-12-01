import { DlvModel } from "../dlv_output_parser/interfaces/dlv_model";
import { Output } from "../dlv_output_parser/models/output";
import { Parser } from "../dlv_output_parser/parser";
import { TestInterface } from "../testing_module/interfaces/testInterface";
import { FilesHandler } from "../utils/FilesHandler/FilesHandler";
import { MockConfigFile } from "../utils/FilesHandler/mockHandlers/Mock_ConfigFilesHandler";
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
    public solve(Test : TestInterface) : [boolean] {
        return [true];
    }

    //temp implementation! return l'output model (da modificare nel return!)
    public async exec_solver(InputFilePath : string) : Promise<DlvModel>{

        let config = new MockConfigFile("")

        return new Promise(() => {
            let exec_path = JSON.parse(config.readFromFile())["exe_path"]

            if(!FilesHandler.checkFileExist(exec_path))
                throw new Error("Could not find the path to the exe")
            if( !FilesHandler.checkFileExist(InputFilePath)) 
                throw new Error("Could not find the generated input file")
            
            exec(`${exec_path} ${InputFilePath}`, (error : string, stdout : string, stderr : string) => {
                if(error) return error;
                return Parser.parse(stdout); //
            })

        });
    } 

    //temp implementation! return il path del file di input
    private genTempFile() : String{

        return "";
    }

}