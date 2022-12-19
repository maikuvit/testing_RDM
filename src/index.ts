#!/usr/bin/env node

import * as figlet from "figlet";
import { Command, Option } from "commander";
import { DlvOutputParser } from "./dlv_output_parser/dlv_output_parser";
import { Config } from "./common/config";
import { DLV2ProcessExecutor } from "./test_solver/exec/dlv2_process_executor";
import { TestSolver } from "./test_solver/test_solver";
import { TestParser } from "./test_parser/test_parser";
import { checkPathExist, getDirContent, isPathDirectory, isPathFile } from "./common/file_handler";
import path from "path";
import { Input } from "./input_parser/models/input";

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
  .addOption(new Option('-s, --solver <solver>', 'invoke specified solver').choices(['dlv2']).makeOptionMandatory())
  .option('-o, --extra [extras...]', 'specify extra solver options (without hyphen)')
  .action((path, options) => {
    let extras = (options?.extra as string[])?.map(o => `-${o}`).join(' ') ?? "";
    let output = DLV2ProcessExecutor.exec_solver(path, extras);
    console.log(output);
    console.log(output.stringify());
  });

program
  .command("reset")
  .description("Reset config file to original")
  .action(() => {
    Config.reset()
  });


program
  .command("test")
  .description("Solve all tests contained in a folder/file")
  .argument("<path>", "Path to folder/file")
  .action((_path) => {
    let filePaths: string[] = [];
    if (!checkPathExist(_path))
      throw new Error(`${_path} does not exists`)
    if (isPathFile(_path))
      filePaths = [_path]
    if (isPathDirectory(_path))
      filePaths = getDirContent(_path).map(c => path.join(_path, c));

    filePaths.forEach(path => {
      let test_wrapper = TestParser.parse_test_file(path);
      test_wrapper.tests.forEach(test => {
        console.log(TestSolver.solve(test))
      });
    })
  });

program.parse(process.argv);