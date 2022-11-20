import { Output } from "./dlv_output_parser/models/output"
import { Parser } from "./dlv_output_parser/parser"

//get argv parameters
var args = process.argv

//remove execution paths
for (let i = 0; i < 2; i++) {
    args.shift()
}
console.log(args)

//get program path arg
let file = args.shift();
let output: Output;

if (file !== undefined) {
    output = Parser.parse_output_file(file);
}
else {
    output = Parser.parse_output_file('./assets/LoIDE_output (5).txt')
}
console.log(output)
console.log(output.stringify())
//console.log(output.answers[0].stringify())
// Parser.write_to_file("test.txt", output)