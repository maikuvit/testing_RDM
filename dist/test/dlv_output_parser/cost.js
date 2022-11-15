"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const cost_1 = require("../../dlv_output_parser/models/cost");
describe('Basic cost parsing', function () {
    it('should parse', function () {
        assert_1.default.deepEqual(cost_1.Cost.parse("1@2"), new cost_1.Cost(1, 2));
    });
});
