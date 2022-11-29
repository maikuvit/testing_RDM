import { DlvModel } from "../dlv_output_parser/interfaces/dlv_model";
import { Output } from "../dlv_output_parser/models/output";
import { TestInterface } from "../testing_module/interfaces/testInterface";

// ----maiku---- //
export class TestSolver {

    //ho una obj test che contiene tutte le info:
    // mi serve: 
    // public met solve <- input Test
    // private met exec_solver <- set di opzioni sul solver
    //                           path file di input
    //                           parse su input (modulo di fede)
    // private met genFile <- set input

    //temp implementation!
    public solve(Test : TestInterface) : boolean {
        return true;
    }

    //temp implementation!
    private exec_solver(configPath : string) : DlvModel{
        return new Output([]);
    } 

    //temp implementation!
    private genTempFile() : String{
        return "";
    }

}