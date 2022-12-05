
import { execSync } from "child_process";
import { DlvModel } from "../dlv_output_parser/interfaces/dlv_model";
import { Parser } from "../dlv_output_parser/parser";
import { checkFileExist } from "../utils/utils";
import { ProcessExecutor } from "./ProcessExecutor";

// ----maiku---- //

export class DLV2ProcessExecutor extends ProcessExecutor{

    public exec_solver(InputFilePath: string, options : string ): DlvModel {

            if(!checkFileExist(this.exePath))
                throw new Error("Could not find the path to the exe")
            if( !checkFileExist(InputFilePath)) 
                throw new Error("Could not find the generated input file")

            let cmdString = `${this.exePath} ${InputFilePath} `;

            if(options)
                cmdString = cmdString.concat(options);
            
            let out = execSync(cmdString);
            return Parser.parse(out.toString());
             
            }
}