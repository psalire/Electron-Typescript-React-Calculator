
const path = require('path');
const SCRIPTS_PATH = './src/ts/';

const build_config = {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    },
    module: {
        rules: [
            {
                test: /\.(t|j)s$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};

const electron_main = {
    target: 'electron-main',
    entry: {
        'index': path.resolve(SCRIPTS_PATH, 'index.ts'),
    },
    ...build_config,
};

const electron_renderer = {
    target: 'electron-renderer',
    entry: {
        'renderer': path.resolve(SCRIPTS_PATH, 'renderer.ts'),
    },
    ...build_config,
};

const electron_preload = {
    target: 'electron-preload',
    entry: {
        'preload': path.resolve(SCRIPTS_PATH, 'preload.ts'),
    },
    ...build_config,
};

module.exports = [
    electron_main,
    electron_renderer,
    electron_preload,
];
