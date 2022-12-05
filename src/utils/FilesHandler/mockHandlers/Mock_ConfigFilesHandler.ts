import path from "path";
import { FilesHandler } from "../FilesHandler";

// ----maiku---- //

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