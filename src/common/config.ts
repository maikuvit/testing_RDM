import path from "path";

export class Config {

    public static getExePath(solver : 'dlv2' | 'clingo') : string {
        let so = () => process.platform.includes('darwin') ? 'macos' : process.platform.includes('win32') ? 'windows.exe' : 'linux';
        return path.join(`./bin/${solver}_${so()}`);
    }

}