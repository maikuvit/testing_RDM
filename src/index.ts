import * as figlet from "figlet";
import { Command } from 'commander';
import { Parser } from "./dlv_output_parser/parser";

console.log(figlet.textSync("TASPER"))
const program = new Command();

program
  .name('tasper')
  .description('CLI to ASP testing framework')
  .version('0.1.0', '-v, --version', 'Output the current version');

program.command('parse')
  .description('Parse an ASP output file')
  .argument('<path>', 'Path to file')
  .action((path) => {
    console.log(Parser.parse_output_file(path).stringify());
  });

program.parse(process.argv);

// const options = program.opts();
// process.env.VERBOSE = "true";