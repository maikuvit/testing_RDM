import { FilesHandler } from "./FilesHandler";

// ----maiku---- //

// config file has a precise set of options required : they must be already in template file! 

const config_template = {
    "exe_path" : "",
    "solver_type" : "DLV2" // to extend to clingo and other solvers
    // might require other params 
}

export class ConfigFilesHandler extends FilesHandler{

    
    public writeToFile(content: string[]): boolean {
        throw new Error("Method not implemented.");
    }
    public readFromFile(): string {
        throw new Error("Method not implemented.");
    }
   
}