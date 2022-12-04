// ---- maiku ---- //

import {writeFileSync} from "fs";
import { Atom } from "../../dlv_output_parser/models/atom";
import { FilesHandler } from "./FilesHandler";

export class AspFilesHandler extends FilesHandler{

    constructor(path: string ){
        super(path)
    }

    // takes in input a rule set and atoms and writes everything on a new asp file
    public writeToFile(content: string[]): boolean {
        try{
            content.forEach((line) => writeFileSync(this._path, line,{encoding: "utf8"}))
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