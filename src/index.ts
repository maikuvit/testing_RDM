#!/usr/bin/env node

import * as figlet from "figlet";
import { Command, Option } from "commander";
import { DlvOutputParser } from "./dlv_output_parser/dlv_output_parser";
import { ProcessExecutor } from "./test_solver/process_executor";
import { TestSolver } from "./test_solver/test_solver";
import { TestParser } from "./test_parser/test_parser";
import { checkPathExist, getDirContent, isPathDirectory, isPathFile } from "./common/file_handler";
import { exec } from "child_process";

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
  .addOption(new Option('-s, --solver <solver>', 'invoke specified solver').choices(['dlv2','clingo']).makeOptionMandatory())
  .option('-o, --extra [extras...]', 'specify extra solver options (without hyphen)')
  .action(async (path, options) => {
    let solver : 'dlv2' | 'clingo' = options.solver!;
    let extras = new Array(...new Set((solver === 'clingo' ? ['V0'] : []).concat(options?.extra as string[] || [])))?.map(o => `-${o}`).join(' ') ?? "";
    let output = await ProcessExecutor.exec_solver(path, extras, solver);
    console.log(output);
    console.log(output.stringify());
  });

program
  .command("test")
  .description("Solve all tests contained in a folder/file")
  .argument("<path>", "Path to folder/file")
  .addOption(new Option('-s, --solver <solver>', 'invoke specified solver').choices(['dlv2','clingo']).makeOptionMandatory())
  .action((path, options) => {
    let solver : 'dlv2' | 'clingo' = options.solver!;
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

program.parse(process.argv);
