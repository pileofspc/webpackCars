const base = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');

let newOptions = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: {
            directory: global.PATHS.dist,
            // publicPath: '/',
        },
        port: 3000,
        hot: true,
        compress: true,
        // watchFiles: ['src/'],
    },
    output: {
        clean: false
    },
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/i,
                use: [
                    require("mini-css-extract-plugin").loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                        }
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 // require('autoprefixer')
                    //             ],
                    //         },
                            
                    //     }
                    // },
                    // 'resolve-url-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    require("mini-css-extract-plugin").loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                        }
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 // require('autoprefixer')
                    //             ],
                    //         },
                            
                    //     }
                    // },
                    // 'resolve-url-loader',
                    'less-loader',
                ],
            },
        ]
    },
}

exports = module.exports = merge(base, newOptions);