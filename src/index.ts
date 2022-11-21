import { exec, execSync } from 'child_process'
import * as fs from 'fs'
import { Output } from './dlv_output_parser/models/output'

var args = process.argv

//remove execution paths
for (let i = 0; i < 2; i++) {
    args.shift()
}

if(args.length <= 1){
    throw new Error("Please enter required parameters")
}
let inputPath : string = args.shift()!
let costCheck : string = args.shift()!

let output = execSync(`./bin/dlv2_macos.app ${inputPath} `)
let res = output.toString()
let res_splitted = res.split("\n")
res_splitted = res_splitted.filter((v, i) => i > 1)
res = res_splitted.join("\n")
console.log(res);
console.log(Output.parse(res));
console.log(Output.parse(res).stringify());

