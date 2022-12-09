import assert from 'assert';
import { DlvOutputParser } from '../../dlv_output_parser/dlv_output_parser'


describe('Basic parser functionalities', function() {
    it('it should parse first file with no error', function () {
        let path = "./assets/output1.txt"
        assert.doesNotThrow(
            () => DlvOutputParser.parse_output_file(path),
              Error
        );
    });
    it('it should parse second file with no error', function () {
        let path = "./assets/output2.txt"
        assert.doesNotThrow(
            () => DlvOutputParser.parse_output_file(path),
              Error
        );
    });
    it('it should parse third file with no error', function () {
        let path = "./assets/output3.txt"
        assert.doesNotThrow(
            () => DlvOutputParser.parse_output_file(path),
              Error
        );
    });
    it('it should parse forth file with no error', function () {
        let path = "./assets/output4.txt"
        assert.doesNotThrow(
            () => DlvOutputParser.parse_output_file(path),
              Error
        );
    });
    it('it should parse fifth file with no error', function () {
        let path = "./assets/output5.txt"
        assert.doesNotThrow(
            () => DlvOutputParser.parse_output_file(path),
              Error
        );
    });
});