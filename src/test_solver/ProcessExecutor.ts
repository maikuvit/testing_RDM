import { DlvModel } from "../dlv_output_parser/interfaces/dlv_model";

export abstract class ProcessExecutor{
    protected exePath: string;
    
    constructor(exePath : string){
        this.exePath = exePath
    }


    public abstract exec_solver(InputFilePath : string, options : string) : DlvModel 
}