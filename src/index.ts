import { Output } from "./dlv_output_parser/models/output"
import { Parser } from "./dlv_output_parser/parser"

let output : Output = Parser.parse_output_file('./assets/LoIDE_output (3).txt')

console.log(output.stringify())
//console.log(output.answers[0].stringify())
// Parser.write_to_file("test.txt", output)