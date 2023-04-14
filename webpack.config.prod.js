const base = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');

const helpers = require('./webpack-helpers/webpack-helpers.js');

let newOptions = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.m?js$/i,
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
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer'),
                                    require('mqpacker'),
                                    require('cssnano')({
                                        preset: [require('cssnano-preset-default')],
                                    }),
                                ],
                            },

                        }
                    },
                    'postcss-loader',
                    // 'resolve-url-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    require("mini-css-extract-plugin").loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer'),
                                    require('mqpacker'),
                                    require('cssnano')({
                                        preset: [require('cssnano-preset-default')],
                                    }),
                                ],
                            },

                        }
                    },
                    // 'resolve-url-loader',
                    'less-loader',
                ],
            },
        ]
    },
    output: {
        filename: `${global.PATHS.distJs}/[name].[contenthash].js`,
    },
}

exports = module.exports = merge(base, newOptions);

let css = helpers.getCssPlugin(exports);
css.options.filename = css.options.filename.replace('[name]', '[name].[hash]');