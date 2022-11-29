// ---- maiku ---- //

import { FilesHandler } from "./FilesHandler";

export class AspFilesHandler extends FilesHandler{

    // takes in input a rule set and atoms and writes everything on a new asp file
    public writeToFile(): boolean {
        throw new Error("Method not implemented.");
    }

    // we might not need to read from asp files: WIP 
    public readFromFile(): string {
        throw new Error("Method not implemented.");
    }

}