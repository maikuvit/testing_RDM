
import { execSync } from "child_process";
import { ClingoOutputMapper } from "../common/clingo_output_mapper";
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

        console.log(cmdString);

        let out = execSync(cmdString);
        let raw_output = solver == 'dlv2' ? out.toString() : ClingoOutputMapper.toDlv(out.toString());

        return DlvOutputParser.parse(raw_output);
    }
}