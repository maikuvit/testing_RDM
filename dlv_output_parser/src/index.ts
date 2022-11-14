import { Output } from "./models/output";
import { Parser } from "./parser";

let output : Output = Parser.parse_file('./assets/LoIDE_output (2).txt')
console.log(output)
console.log(JSON.stringify(output))
// output.answers[0].atoms[0]