import assert, { doesNotMatch } from 'assert';
import { FilesHandler } from '../../utils/FilesHandler/FilesHandler';
import { MockConfigFile } from '../../utils/FilesHandler/mockHandlers/Mock_ConfigFilesHandler';
import fs from 'fs';

const handler =  new MockConfigFile("")

describe("check that the handler works correctly", () => {
    it('should check for file', function() {
        let exepath = JSON.parse(handler.readFromFile())["exe_path"]
        assert.equal(fs.existsSync(exepath), true);
    });

    it('should write to file', () => {
        assert.equal(handler.writeToFile(), true)
    })
})

