import { appendFileSync, unlinkSync } from "fs";
import { checkFileExist } from "../utils";
import { FilesHandler } from "./FilesHandler";

// ----maiku---- //

export class AspFilesHandler extends FilesHandler{

    constructor(path: string ){
        if(checkFileExist(path)) unlinkSync(path) //remove file if exist, we do not need that
        super(path)
    }

    // takes in input a rule set and atoms and writes everything on a new asp file
    public writeToFile(content: string[]): boolean {
        try{
            content.forEach((line) => appendFileSync(this._path, `${line}\n`,{encoding: "utf8"}))
        }
        catch{        
            throw new Error("Failed creation of temporary file.");
        }
        return true;
    }

    // we might not need to read from asp files: WIP 
    public readFromFile(): string {
        throw new Error("Method not implemented.");
    }
}