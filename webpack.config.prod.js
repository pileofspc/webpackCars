const base =  require('./webpack.config.base.js');
const {merge} = require('webpack-merge');

const functions = require('./functions.js');

let newOptions = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  }
                }
            },
            {
                test: /\.(sc|sa|c)ss$/i,
                use: [
                    require("mini-css-extract-plugin").loader,
                    'css-loader',
                    'postcss-loader',
                    // 'resolve-url-loader',
                    'sass-loader'
                ],
            },
        ]
    },
    output: {
        filename: `${base.externals.paths.distJs}/[name].[contenthash].js`,
    },
}

exports = module.exports = merge(base, newOptions);

let css = functions.getCssPlugin(exports);
css.options.filename = css.options.filename.replace('[name]', '[name].[contenthash]');