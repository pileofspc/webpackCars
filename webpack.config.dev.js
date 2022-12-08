const base =  require('./webpack.config.base.js');
const {merge} = require('webpack-merge');

let newOptions = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: {
            directory: base.externals.paths.dist,
            // publicPath: '/',
        },
        port: 3000,
        // open: true,
        // hot: true,
        compress: true,
        watchFiles: ['src/'],
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
                            url: false,
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
        ]
    }
}

exports = module.exports = merge(base, newOptions);