
import { execSync } from "child_process";
import { DlvOutputModel } from "../dlv_output_parser/interfaces/dlv_model";
import { Parser } from "../dlv_output_parser/dlv_output_parser";
import { checkFileExist } from "../utils/utils";
import { ProcessExecutor } from "./ProcessExecutor";

// ----maiku---- //

export class DLV2ProcessExecutor extends ProcessExecutor{

    public exec_solver(InputFilePath: string, options : string ): DlvOutputModel {

            console.log(this.exePath)

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