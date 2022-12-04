import path from "path";
import { ConfigFilesHandler } from "../ConfigFilesHandler";
import { FilesHandler } from "../FilesHandler";

export class MockConfigFile extends FilesHandler
{
    public writeToFile(): boolean {
        return true;
    }
        
    public readFromFile(): string {
        return JSON.stringify(
            {
                //brutto il path, ma si risolve togliendo il mock ...
            'exe_path' : path.join(__dirname,'../../../../bin/dlv2_linux'),
            'solver_type' : 'DLV2',
            'temp_file_direcory' : '/home/maiku/Desktop/tempfilesAsp'
            }
        );
    }

}