import { exec, execSync } from 'child_process'
import { Output } from './dlv_output_parser/models/output'
import * as fs from 'fs';

var args = process.argv

//remove execution paths
for (let i = 0; i < 2; i++) {
    args.shift()
}
//prova
if(args.length <= 0){
    throw new Error("Please enter required parameters")
}
let command : string = args.shift()!
let path : string = args.shift()!
let costToCheck : string = args.shift()!

let res : string = ""

if(command == "input"){
    let output = execSync(`./bin/dlv2_macos ${path} ${args.map((arg) => `-${arg}`).join(' ')} `)
    res = output.toString()
}
else if(command == "output"){
    res = fs.readFileSync(path, {encoding: 'utf-8'})
}

console.log(res);
let out : Output = Output.parse(res) as Output;

if(out.answers.length > 0){
    console.log(out.answers[0].assertEqualCost(costToCheck));
}
