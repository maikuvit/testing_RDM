import * as fs from 'fs';

export function checkPathExist(filepath :string) : boolean{
    return fs.existsSync(filepath);
}

export function readFile(filePath : string) : string {
    return fs.readFileSync(filePath, { encoding: 'utf-8' })
}

export function writeFile(filePath : string, data : string, flag : string){
    return fs.writeFileSync(filePath, data, {encoding: 'utf-8', flag: flag})
}

export function removeFile(filePath : string) {
    return fs.unlinkSync(filePath)
}

export function isPathDirectory(path : string){
    return fs.lstatSync(path).isDirectory();
}

export function isPathFile(path : string){
    return fs.lstatSync(path).isFile();
}

export function getDirContent(path : string){
    if(!isPathDirectory(path))
        throw new Error(`${path} is not a directory`)
    return fs.readdirSync(path)
}
