import { Output } from "./dlv_output_parser/models/output"
import * as fs from 'fs'
import { Parser } from "./dlv_output_parser/parser"
import { exec } from "child_process"

//get argv parameters
var args = process.argv

//remove execution paths
for (let i = 0; i < 2; i++) {
    args.shift()
}
console.log(args)

//get program path arg
let file = args.shift()
let dlv2 = '../bin/dlv2_windows.exe'
let output: Output
let output2 = undefined

if (file !== undefined) {
    let input = fs.readFileSync(file, {encoding: 'utf-8'})
    let output2 = exec(`$dlv2 file`)
    if (output2 !== undefined) {
        output = Parser.parse_output_file(input)
    }
    else {
        throw new Error("no output from dlv2")
    }
}
else {
    throw new Error('dlv2 or file path error')
}
console.log("output da dlv2")
if (output2 !== undefined) {
    console.log(output2)
}

console.log("output da parser")
console.log(output)
console.log(output.stringify())

if (output === output2) {
    console.log('ASSERT: True')
}
else {
    console.log('ASSERT: False')
}