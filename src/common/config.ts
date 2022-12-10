import path from "path";
import { readFile, writeFile } from "./file_handler";

const CONFIG_FILE_PATH: string = './config.json';

export class Config {

    exe_path?: string;
    solver_type?: 'dlv2';
    temp_file_direcory?: string;

    constructor(map?: Partial<Config>) {
        Object.assign(this, map);
    }

    public static readConfig(): Config {
        return JSON.parse(readFile(CONFIG_FILE_PATH)) as Config
    }

    public static writeConfig(config: Config) {
        return writeFile(CONFIG_FILE_PATH, JSON.stringify(config), 'w')
    }

    private static getOriginal() {

        let so = () => process.platform.includes('darwin') ? 'macos' : process.platform.includes('win32') ? 'windows.exe' : 'linux';

        return new Config({
            exe_path: path.join(`./bin/dlv2_${so()}`),
            solver_type: 'dlv2',
        })
    }

    public static reset() {
        let original = Config.getOriginal();
        Config.writeConfig(original);
        return original;
    }

}