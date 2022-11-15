"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
let output = parser_1.Parser.parse_file('./assets/LoIDE_output (2).txt');
console.log(output);
console.log(JSON.stringify(output));
// output.answers[0].atoms[0]
