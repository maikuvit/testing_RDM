import { readFile } from '../common/file_handler';
import { TestWrapper } from './models/test_wrapper';

//
// TestParser prende una generica stringa e parserizza l'annotazione @test
//

export class TestParser {
    public static parse(raw_test: string): TestWrapper {
        return TestWrapper.parse(raw_test) as TestWrapper
    }
    public static parse_test_file(path: string): TestWrapper {
        return TestParser.parse((readFile(path)))
    }
}