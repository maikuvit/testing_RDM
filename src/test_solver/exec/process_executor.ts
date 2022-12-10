
// ----maiku---- //

import { Output } from "../../dlv_output_parser/models/output";

export abstract class ProcessExecutor {

    constructor(
        public exePath: string) {
    }

    public static exec_solver(InputFilePath: string, options: string): Output {
        throw new Error('method not implemented')
    }
}