
// ---- maiku ---- //

import { FilesHandler } from "./FilesHandler";

// config file has a precise set of options required : they must be already in template file! 

export class ConfigFilesHandler extends FilesHandler{

    
    public writeToFile(): boolean {
        throw new Error("Method not implemented.");
    }
    public readFromFile(): string {
        throw new Error("Method not implemented.");
    }
   
}