const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

// Import webpack helpers
const helpers = require('./webpack-helpers/helpers.js');

const PATHS = {
    FSDApp: path.resolve(__dirname, './src', '01_app'),
    FSDPages: path.resolve(__dirname, './src', '03_pages'),

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
const PAGES = helpers.getFilesOfExt(PATHS.pages, '.html');


// Array of HtmlWebpackPLugin entries for PAGES:
let htmlPluginPages = PAGES.map(
    (page) => new HtmlWebpackPlugin({
        template: `${PATHS.pages}/${page}`,
        filename: `${page}`,
        chunks: [path.parse(page).name],
    })
);

const JS_FILES = helpers.getFilesOfExt(PATHS.js, '.js', 'mjs');
let entryNamesFromJsFiles = JS_FILES.map(
    (jsFile) => path.parse(jsFile).name
);


// Js entries for each page of PAGES:
const ENTRIES = {};
PAGES.forEach((page) => {
    let entryName = path.parse(page).name;
    let filePath = path.join(PATHS.js, `${entryName}.js`);
    if (helpers.exists(filePath)) {
        ENTRIES[entryName] = filePath;
    }
});



// FSD pages
const FSD_PAGES = helpers.getFolders(PATHS.FSDPages);
let FSDHtmlPluginPages = FSD_PAGES.map(
    (page) => new HtmlWebpackPlugin({
        template: `${PATHS.FSDPages}/${page}/${page}.html`,
        filename: `${page}.html`,
        chunks: [page],
    })
);
FSD_PAGES.forEach((page) => {
    let filePath = path.join(PATHS.FSDPages, `${page}/index.js`);
    if (helpers.exists(filePath)) {
        ENTRIES[page] = filePath;
    }
});

let app = path.join(PATHS.FSDApp, 'app.js');
if (helpers.exists(app)) {
    ENTRIES['app'] = app;
}

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
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    }
                }
            },
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
        ...FSDHtmlPluginPages,
        new MiniCssExtractPlugin({
            filename: `${PATHS.distCss}/[name].css`,
        }),
        new ESLintWebpackPlugin(),
    ]
};