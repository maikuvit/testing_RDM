const path = require('node:path');
import fs from 'fs';

// ----maiku---- //

export abstract class FilesHandler{
    static _path: any;

    constructor(path: string ){
        FilesHandler._path = path;
    }

    public abstract writeToFile() : boolean

    public abstract readFromFile() : string

    public static checkFileExist(filename :string) : boolean{
        return fs.existsSync(path.join(this._path, filename) );
    }

} 