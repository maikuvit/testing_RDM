
import { exec, execSync } from "child_process";
import { promisify } from "util";
import { ClingoOutputMapper } from "../common/clingo_output_mapper";
import { Config } from "../common/config";
import { checkPathExist } from "../common/file_handler";
import { DlvOutputParser } from "../dlv_output_parser/dlv_output_parser";
import { Output } from "../dlv_output_parser/models/output";

export class ProcessExecutor {

    public static async exec_solver(InputFilePath: string , AllAnswerSets : boolean, solver : 'dlv2' | 'clingo'): Promise<Output> {

        if (!checkPathExist(Config.getExePath(solver)))
            throw new Error("Could not find the path to the exe")

        if (!checkPathExist(InputFilePath))
            throw new Error("Could not find the generated input file")


        // se sono in clingo aggiungo -V0
        // se servono run multiple aggiungo l'opzione in base al solver
        let cmdString = `${Config.getExePath(solver)} 
        ${solver == 'clingo' ? " -V0 " : ""}
        ${AllAnswerSets == true ? (solver == "dlv2" ? " -n0 ": " --models=0 ") : ""} 
        ${InputFilePath} `; 

        let raw_output = (await this.execPromise(cmdString)).toString();
        let output = solver == 'dlv2' ? raw_output : ClingoOutputMapper.toDlv(raw_output);

        console.log('output:\n', output);
        

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