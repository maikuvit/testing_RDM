import assert from 'assert';
import fs from 'fs';
import { MockConfigFile } from '../../utils/FilesHandler/mockHandlers/Mock_ConfigFilesHandler';

const handler =  new MockConfigFile("")

// ----maiku---- //

describe("check that the handler works correctly", () => {
    it('should check for file', function() {
        let exepath = JSON.parse(handler.readFromFile())["exe_path"]
        assert.equal(fs.existsSync(exepath), true);
    });
})

