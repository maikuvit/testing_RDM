"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const output_1 = require("../../dlv_output_parser/models/output");
const parser_1 = require("../../dlv_output_parser/parser");
describe('Basic parser functionalities', function () {
    it('should parse', function () {
        let output_string = "INCONSISTENT";
        let output_object = new output_1.Output([]);
        assert_1.default.deepEqual(parser_1.Parser.parse(output_string), output_object);
    });
});
