"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const atom_1 = require("../../dlv_output_parser/models/atom");
describe('Basic atom parsing', function () {
    it('should parse', function () {
        assert_1.default.deepEqual(atom_1.Atom.parse("name(1)."), new atom_1.Atom("name", ["1"]));
    });
});
