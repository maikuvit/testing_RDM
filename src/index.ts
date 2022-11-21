import { exec, execSync } from 'child_process'
import { Output } from './dlv_output_parser/models/output'

var args = process.argv

//remove execution paths
for (let i = 0; i < 2; i++) {
    args.shift()
}

if(args.length <= 0){
    throw new Error("Please enter input file path")
}
let inputPath : string = args.shift()!

let output = execSync(`./bin/dlv2_macos.app ${inputPath} ${args.map((arg) => `-${arg}`).join(' ')}`)
let res = output.toString()
console.log(res);

console.log(Output.parse(res));
console.log(Output.parse(res).stringify());