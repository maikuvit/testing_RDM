import { getRandomValues } from "crypto";
import path from "path";
import { DlvAssert } from "../asserts/interfaces/dlvAssert";
import { DlvModel } from "../dlv_output_parser/interfaces/dlv_model";
import { Atom } from "../dlv_output_parser/models/atom";
import { Output } from "../dlv_output_parser/models/output";
import { Parser } from "../dlv_output_parser/parser";
import { Input } from "../input_parser/implementations/input";
import { SimpleTest } from "../testing_module/implementations/simpleTest";
import { TestInterface } from "../testing_module/interfaces/testInterface";
import { AspFilesHandler } from "../utils/FilesHandler/AspFilesHandler";
import { FilesHandler } from "../utils/FilesHandler/FilesHandler";
import { MockConfigFile } from "../utils/FilesHandler/mockHandlers/Mock_ConfigFilesHandler";
import { DLV2ProcessExecutor } from "./DLV2ProcessExecutor";
import { ProcessExecutor } from "./ProcessExecutor";
const { exec } = require('node:child_process');


// ----maiku---- //
export class TestSolver {

    config = new MockConfigFile("")

    executor: DLV2ProcessExecutor= new DLV2ProcessExecutor(JSON.parse(this.config.readFromFile())["exe_path"]); 

    //ho una obj test che contiene tutte le info:
    // mi serve: 
    // public met solve <- input Test
    // private met exec_solver <- set di opzioni sul solver
    //                           path file di input
    //                           parse su input (modulo di fede)
    // private met genFile <- set input 

    //temp implementation! return list di assert di lunghezza asserts - 1
    public solve(test : SimpleTest, inputAsp : Input) : { [id: string]: boolean; } {

        // qui controllo futuro per vari solver, per ora creo solo DLV che basta
        let executor = new DLV2ProcessExecutor(JSON.parse(this.config.readFromFile())["exe_path"]) 

        
        //prendo gli asserts, poi per ognuno di esso combino input e faccio call sul solver ...
        // for s in asserts:
        //      s.assert(input)
        let tempFilePath = JSON.parse(this.config.readFromFile())["temp_file_direcory"]

        let inputRules = test.scope;

        let testAsserts = test.assert;

        let input = test.input;

        let rules: string[] = [];

        inputRules.forEach(rule => {
            let temp = inputAsp.rules.get(rule)?.content
            if(temp != undefined)
                rules.push(temp)
        });

        var out: { [id: string] : boolean } = {};
        testAsserts.forEach((s,index) => { 

            //per ogni assert creo l'input e poi chiamo un solver ... 
            let filepath = path.join(tempFilePath, "test1.txt")
            let fileWriter = new AspFilesHandler(filepath)

            //writing rules ...
            fileWriter.writeToFile(rules)

            let atoms : string[] = input.map(el => el.stringify()) 
            //writing atoms ... 
            fileWriter.writeToFile(atoms)

            out[index] = s.assert(executor.exec_solver(filepath))
            })

            return out;
    }
}