
import { execSync } from "child_process";
import { Config } from "../common/config";
import { checkPathExist } from "../common/file_handler";
import { DlvOutputParser } from "../dlv_output_parser/dlv_output_parser";
import { Output } from "../dlv_output_parser/models/output";

export class ProcessExecutor {

    public static exec_solver(InputFilePath: string, options: string, solver : 'dlv2' | 'clingo'): Output {


        if (!checkPathExist(Config.getExePath(solver)))
            throw new Error("Could not find the path to the exe")

        if (!checkPathExist(InputFilePath))
            throw new Error("Could not find the generated input file")

        let cmdString = `${Config.getExePath(solver)} ${InputFilePath} `;

        if (options)
            cmdString = cmdString.concat(options);

        let out = execSync(cmdString);
        return DlvOutputParser.parse(out.toString());
    }
}