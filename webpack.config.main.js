
const path = require('path');
const build_config = require("./webpack_build_config");
const SCRIPTS_PATH = './src/ts/';

module.exports = {
    target: 'electron-main',
    entry: {
        'index': path.resolve(SCRIPTS_PATH, 'index.ts'),
    },
    ...build_config,
};
