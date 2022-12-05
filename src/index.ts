#!/usr/bin/env node

import * as figlet from "figlet";
import { Command, Option } from "commander";
import { Parser } from "./dlv_output_parser/parser";

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

program.parse(process.argv);

// const options = program.opts();
// process.env.VERBOSE = "true";


/*
PER FEDE ESEMPI DI COMMAND

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
