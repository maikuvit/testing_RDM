import * as fs from 'fs';

export function checkFileExist(filepath :string) : boolean{
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
