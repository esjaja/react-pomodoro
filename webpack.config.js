const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
    src: path.resolve(__dirname, 'src'),
    dst: path.resolve(__dirname, 'dst')
}

module.exports = {
    entry: path.resolve(PATH.src, 'index.js'),
    output: {
        path: PATH.dst,
        filename: '[name].bundle.js'
    },
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                include: path.resolve(PATH.src, 'pug'),
                exclude: /(node_modules)/,
                use: 'pug-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                include: path.resolve(PATH.src, 'sass'),
                // exclude: /(node_modules)/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(PATH.dst, './index.html'),
            template: path.resolve(PATH.src, './pug', './index.pug')
        })
    ]

}