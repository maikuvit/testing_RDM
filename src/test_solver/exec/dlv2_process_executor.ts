
import { execSync } from "child_process";
import { checkFileExist } from "../../common/file_handler";
import { DlvOutputParser } from "../../dlv_output_parser/dlv_output_parser";
import { Output } from "../../dlv_output_parser/models/output";
import { ProcessExecutor } from "./process_executor";

// ----maiku---- //

export class DLV2ProcessExecutor extends ProcessExecutor {

    public constructor(public exePath: string) {
        super(exePath)
    }

    public exec_solver(InputFilePath: string, options: string): Output {

        if (!checkFileExist(this.exePath))
            throw new Error("Could not find the path to the exe")

        if (!checkFileExist(InputFilePath))
            throw new Error("Could not find the generated input file")

        let cmdString = `${this.exePath} ${InputFilePath} `;

        if (options)
            cmdString = cmdString.concat(options);

            console.log(cmdString);
            

        let out = execSync(cmdString);
        return DlvOutputParser.parse(out.toString());
    }
}