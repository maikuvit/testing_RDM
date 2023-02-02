import assert from 'assert';
import { DlvOutputParser } from '../../src/dlv_output_parser/dlv_output_parser'


describe('Basic parser functionalities', function() {
    it('it should parse first file with no error', function () {
        let path = "./assets/dlv_output1.txt"
        assert.doesNotThrow(
            () => DlvOutputParser.parse_output_file(path),
              Error
        );
    });
    it('it should parse second file with no error', function () {
        let path = "./assets/dlv_output2.txt"
        assert.doesNotThrow(
            () => DlvOutputParser.parse_output_file(path),
              Error
        );
    });
    it('it should parse third file with no error', function () {
        let path = "./assets/dlv_output3.txt"
        assert.doesNotThrow(
            () => DlvOutputParser.parse_output_file(path),
              Error
        );
    });
    it('it should parse forth file with no error', function () {
        let path = "./assets/dlv_output4.txt"
        assert.doesNotThrow(
            () => DlvOutputParser.parse_output_file(path),
              Error
        );
    });
    it('it should parse fifth file with no error', function () {
        let path = "./assets/dlv_output5.txt"
        assert.doesNotThrow(
            () => DlvOutputParser.parse_output_file(path),
              Error
        );
    });
});