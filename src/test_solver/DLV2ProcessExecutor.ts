
import { exec } from "child_process";
import { DlvModel } from "../dlv_output_parser/interfaces/dlv_model";
import { Parser } from "../dlv_output_parser/parser";
import { FilesHandler } from "../utils/FilesHandler/FilesHandler";
import { MockConfigFile } from "../utils/FilesHandler/mockHandlers/Mock_ConfigFilesHandler";
import { checkFileExist } from "../utils/utils";
import {ProcessExecutor} from "./ProcessExecutor"

export class DLV2ProcessExecutor extends ProcessExecutor{

    public exec_solver(InputFilePath: string): Promise<DlvModel> {

        return new Promise(() => {

            if(!checkFileExist(this.exePath))
                throw new Error("Could not find the path to the exe")
            if( !checkFileExist(InputFilePath)) 
                throw new Error("Could not find the generated input file")
            
            exec(`${this.exePath} ${InputFilePath}`, (error,stdout,stderr) => {
                if(error) return error;
                return Parser.parse(stdout); //
            })

        });
    } 

}