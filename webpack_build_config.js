
module.exports = {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(t|j)s$/,
                exclude: /(node_modules|\.webpack)/,
                loader: 'babel-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};
