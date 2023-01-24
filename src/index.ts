#!/usr/bin/env node

import * as figlet from "figlet";
import { Command, Option } from "commander";
import { DlvOutputParser } from "./dlv_output_parser/dlv_output_parser";
import { ProcessExecutor } from "./test_solver/process_executor";
import { TestSolver } from "./test_solver/test_solver";
import { TestParser } from "./test_parser/test_parser";
import { checkPathExist, getDirContent, isPathDirectory, isPathFile } from "./common/file_handler";
import { exec } from "child_process";
import { addDefaultExtrasForSolver } from "./common/utils";

console.log(figlet.textSync("TASPER"));
const program = new Command();

program
  .name("tasper")
  .description("CLI to ASP testing framework")
  .version("1.0.0", "-v, --version", "Output the current version");

program
  .command("parse")
  .description("Parse a DLV output file")
  .argument("<path>", "Path to file")
  .action((path) => {
    let output = DlvOutputParser.parse_output_file(path);
    console.log(output);
    console.log(output.stringify());
  });

program
  .command("invoke")
  .description("Invoke solver for input file")
  .argument("<path>", "Path to file")
  .addOption(new Option('-s, --solver <solver>', 'invoke specified solver').choices(['dlv2', 'clingo']).makeOptionMandatory())
  .option('-e, --extras [extras...]', 'specify extra solver options (space separated)')
  .action(async (path, options) => {
    let solver: 'dlv2' | 'clingo' = options.solver!;
    let extras = addDefaultExtrasForSolver(options.extras || [], solver)
    let output = await ProcessExecutor.exec_solver(path, extras, solver);
    console.log(output);
    console.log(output.stringify());
  });

program
  .command("test")
  .description("Solve all tests contained in a folder/file")
  .argument("<path>", "Path to folder/file")
  .addOption(new Option('-s, --solver <solver>', 'invoke specified solver').choices(['dlv2', 'clingo']).makeOptionMandatory())
  .action((path, options) => {
    let solver: 'dlv2' | 'clingo' = options.solver!;
    let filePaths: string[] = [];
    if (!checkPathExist(path))
      throw new Error(`${path} does not exists`)
    if (isPathFile(path))
      filePaths = [path]
    if (isPathDirectory(path))
      filePaths = getDirContent(path).map(c => path.join(path, c));

    filePaths.forEach(path => {
      let test_wrapper = TestParser.parse_test_file(path);
      test_wrapper.tests.forEach(test => {
        console.log(path, TestSolver.solve(test, solver))
      });
    })
  });

// program
//   .command("test_clingo")
//   .description("Invoke solver for input file")
//   .argument("<path>", "Path to file")
//   .action(async (path, options) => {
//     console.log("dlv2...\n");
//     await ProcessExecutor.exec_solver(path, '-n0 --silent', 'dlv2');
//     console.log("clingo...\n");
//     await ProcessExecutor.exec_solver(path, '-V0 --models=0', 'clingo');
//   });

program.parse(process.argv);
