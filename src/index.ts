import { exec, execSync } from 'child_process'
import * as fs from 'fs'
import { Output } from './dlv_output_parser/models/output'

var args = process.argv

//remove execution paths
for (let i = 0; i < 2; i++) {
    args.shift()
}

if(args.length <= 0){
    throw new Error("Please enter required parameters")
}
let inputPath : string = args.shift()!
let costCheck : string = args.shift() || ""

let output = execSync(`./bin/dlv2_macos ${inputPath} ${args.map((arg) => `-${arg}`).join(' ')} `)
let res = output.toString()
console.log(res);


let out : Output = Output.parse(res) as Output;
console.log(out);
console.log(out.stringify());

console.log(out.answers[0].assertEqualCost(costCheck));
