#!/usr/bin/env node

import * as figlet from "figlet";
import { Command, Option } from "commander";
import { Parser } from "./dlv_output_parser/parser";
import { TestSolver } from "./test_solver/TestSolver";
import { TestParser } from "./testing_module/implementations/testParser";

console.log(figlet.textSync("TASPER"));
const program = new Command();

program
  .name("tasper")
  .description("CLI to ASP testing framework")
  .version("1.0.0", "-v, --version", "Output the current version");

program
  .command("parse")
  .description("Parse an ASP output file")
  .argument("<path>", "Path to file")
  .action((path) => {
    let output = Parser.parse_output_file(path);
    console.log(output);
    console.log(output.stringify());
  });
  
program
.command("invoke")
.description("Invoke solver for input file")
.argument("<path>", "Path to file")
.addOption(new Option('-s, --solver <solver>', 'invoke specified solver').choices(['dlv2']).makeOptionMandatory())
.action((path, options) => {
  console.log(options);
  console.log(path);
});

program
.command("solve")
.description("Invoke test solver for input file")
.argument("<path>", "Path to file")
.action((path) => {
  let testparser : TestParser = Parser.parse_test_file(path);
  let solver = new TestSolver();
  testparser.tests.forEach((test) => console.log(solver.solve(test)))
});

program.parse(process.argv);

// const options = program.opts();
// process.env.VERBOSE = "true";


/*
  PER FEDE STRUTTURA CARTELLA
  nella cartella avremo:

    project
    |- input.asp
    |- configFile.json

  Il configFile.json contiene i parametri necessari
  ad eseguire il codice. Questi rispettano la forma che sta
  in utils/FilesHandler/mockHandlers/Mock_ConfigFilesHandler.ts

  Possiamo aggiustare nel prossimo sprint, includendo una gerarchia
  nei test. Per ora possiamo lasciare mockato e cambiare la classe a mano.

*/




/*mic
QUESTO SPRINT
PER FEDE ESEMPI DI COMMAND (single file, config mockati)
tasper solve <inputFile>.asp 

   prende inputFile, lo passa al codice di Fabio
   il codice produce un Array di obj SimpleTest
   su ogni test in SimpleTest viene chiamato il 
   metodo solve della classe TestSolver che 
   restituisce un array del tipo 
    {
      <index dell'assert> : <true | false>, 
      ...
    }

    banalmente per far vedere che le robe funzionano 
    possiamo giusto stampare questo array nella cmdline

*/

/*

PROSSIMO SPRINT 
PER FEDE ESEMPIO DI COMMAND (su folder strutturata, prossimo sprint)

tasper solve

esegue tutti i testFiles nella cartella corrente.
I testFiles possono essere:
    files .asp classici
    files .asp contenenti solo test (con annesso parametro inputFile nell'annotation)

come output abbiamo
    nome del test : {<object con gli assert>}

  il configFile.json viene cercato nella root directory

  comando liberamente ispirato copiando da pytest (per capirci)

  da definire sintassi per indicare quali files vogliamo eseguire 
      (cartella test? li chiamiamo test_<qualcosa>.asp? )
  ci penserà il team4 del futuro nel prossimo sprint.

*/

