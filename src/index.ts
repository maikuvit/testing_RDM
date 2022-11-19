import { Output } from "./dlv_output_parser/models/output"
import { Parser } from "./dlv_output_parser/parser"

let output : Output = Parser.parse_output_file('./assets/LoIDE_output (2).txt')
console.log(output.stringify())
// Parser.write_to_file("test.txt", output)