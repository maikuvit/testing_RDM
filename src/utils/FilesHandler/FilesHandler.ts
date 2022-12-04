const path = require('node:path');
import fs from 'fs';

// ----maiku---- //

export abstract class FilesHandler{
    protected _path: string;

    constructor(path: string ){
        this._path = path;
    }

    public abstract writeToFile(content : string[]) : boolean

    public abstract readFromFile() : string

} 