import path from "path";
import { readFile, writeFile } from "./file_handler";
import { throwExpression } from "./utils";

const CONFIG_FILE_PATH: string = './config.json';

interface ConfigFile {
    exe_path? : string;
    solver_type? : 'dlv2';
}

export class Config {

    public static readConfig(): ConfigFile {
        return JSON.parse(readFile(CONFIG_FILE_PATH)) as ConfigFile;
    }

    public static writeConfig(config: ConfigFile) {
        return writeFile(CONFIG_FILE_PATH, JSON.stringify(config), 'w')
    }

    private static getOriginal() : ConfigFile {
        return {
            exe_path: undefined,
            solver_type: 'dlv2'
        }
    }

    public static reset() {
        let original = Config.getOriginal();
        Config.writeConfig(original);
        return original;
    }

    public static get exe_path() : string {
        let so = () => process.platform.includes('darwin') ? 'macos' : process.platform.includes('win32') ? 'windows.exe' : 'linux';
        let config = Config.readConfig();
        return config.exe_path ? config.exe_path : path.join(`./bin/dlv2_${so()}`)
        //handle clingo later TODO
    }

    public static get solver_type() : string {
        return Config.readConfig().solver_type ?? throwExpression('solver_type must be specified in config.json');
    }
    
}