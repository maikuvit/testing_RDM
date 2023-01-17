
import { exec, execSync } from "child_process";
import { promisify } from "util";
import { ClingoOutputMapper } from "../common/clingo_output_mapper";
import { Config } from "../common/config";
import { checkPathExist } from "../common/file_handler";
import { DlvOutputParser } from "../dlv_output_parser/dlv_output_parser";
import { Output } from "../dlv_output_parser/models/output";

export class ProcessExecutor {

    public static async exec_solver(InputFilePath: string, options: string, solver : 'dlv2' | 'clingo'): Promise<Output> {

        if (!checkPathExist(Config.getExePath(solver)))
            throw new Error("Could not find the path to the exe")

        if (!checkPathExist(InputFilePath))
            throw new Error("Could not find the generated input file")

        let cmdString = `${Config.getExePath(solver)} ${InputFilePath} `;
        
        if (options)
            cmdString = cmdString.concat(options);

        console.log(cmdString);

        let raw_output = await this.execPromise(cmdString);
        let output = solver == 'dlv2' ? raw_output.toString() : ClingoOutputMapper.toDlv(raw_output.toString());

        return DlvOutputParser.parse(output);

    }

    static execPromise(cmdString : string){
        return new Promise<string>((resolve, reject) => {
            exec(cmdString, (error, stdout, stderr) => {
                resolve(stdout)
            })
        })
    }

}