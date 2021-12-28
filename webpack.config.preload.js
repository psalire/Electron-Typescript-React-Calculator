
const path = require('path');
const build_config = require("./webpack_build_config");
const SCRIPTS_PATH = './src/ts/';

module.exports = {
    target: 'electron-preload',
    entry: {
        'preload': path.resolve(SCRIPTS_PATH, 'preload.tsx'),
    },
    ...build_config,
};
