
module.exports = {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /(node_modules|\.webpack)/,
                loader: 'babel-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.js']
    }
};
