
import { execSync } from "child_process";
import { Config } from "../../common/config";
import { checkFileExist } from "../../common/file_handler";
import { DlvOutputParser } from "../../dlv_output_parser/dlv_output_parser";
import { Output } from "../../dlv_output_parser/models/output";
import { ProcessExecutor } from "./process_executor";

// ----maiku---- //

export class DLV2ProcessExecutor extends ProcessExecutor {

    public static exec_solver(InputFilePath: string, options: string): Output {


        if (!checkFileExist(Config.exe_path!))
            throw new Error("Could not find the path to the exe")

        if (!checkFileExist(InputFilePath))
            throw new Error("Could not find the generated input file")

        let cmdString = `${Config.exe_path!} ${InputFilePath} `;

        if (options)
            cmdString = cmdString.concat(options);

        let out = execSync(cmdString);
        return DlvOutputParser.parse(out.toString());
    }
}