const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Import custom stuff
const functions = require('./user_scripts/functions.js');

const PATHS = {
    src: path.resolve(__dirname, './src'),
    dist: path.resolve(__dirname, './dist'),

    // Path to html pages
    pages: path.resolve(__dirname, './src', 'pages'),

    // Path to js
    js: path.resolve(__dirname, './src', 'js'),

    distAssets: 'assets',
    distJs: 'assets/js',
    distCss: 'assets/css',
    distImg: 'assets/img',
}


// Array of names of *.html files:
const PAGES = functions.getFilesOfExt(PATHS.pages, '.html');


// Array of HtmlWebpackPLugin entries for PAGES:
let htmlPluginPages = PAGES.map(
    (page) => {
        return new HtmlWebpackPlugin({
            template: `${PATHS.pages}/${page}`,
            filename: `${page}`,
            chunks: [path.parse(page).name],
        })
    }
)

const JS_FILES = functions.getFilesOfExt(PATHS.js, '.js', 'mjs');
let entryNamesFromJsFiles = JS_FILES.map((jsFile)=>{
    return path.parse(jsFile).name;
})


// Js entries for each page of PAGES:
const ENTRIES = {};
PAGES.map((page)=>{
    let entryName = path.parse(page).name;
    if (entryNamesFromJsFiles.includes(entryName)) {
        ENTRIES[entryName] = path.join(PATHS.js, `${entryName}.js`);
    }
});


module.exports = exports = {
    externals: {
        pages: PAGES,
        paths: PATHS,
    },
    mode: 'development',
    entry: ENTRIES,
    output: {
        path: PATHS.dist,
        filename: `${PATHS.distJs}/[name].js`,
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(png||jpg||jpeg||gif||svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.distImg}/[name][ext]`
                }
            }
        ]
    },
    plugins: [    
        ...htmlPluginPages,
        new MiniCssExtractPlugin({
            filename: `${PATHS.distCss}/[name].css`,
        }),
    ]
};