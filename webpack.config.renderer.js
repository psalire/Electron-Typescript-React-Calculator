
const path = require('path');
const build_config = require("./webpack_build_config");
const SCRIPTS_PATH = './src/ts/';

build_config.module.rules.push({
    test: /\.s?[ac]ss$/,
    exclude: /node_modules/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        'postcss-loader',
    ]
});
build_config.resolve.extensions.push(".css");
build_config.resolve.extensions.push(".scss");

module.exports = {
    // target: 'electron-renderer',
    // entry: {
    //     'renderer': path.resolve(SCRIPTS_PATH, 'renderer.ts'),
    // },
    ...build_config,
};
