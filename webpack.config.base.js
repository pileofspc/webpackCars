const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
// const ESLintWebpackPlugin = require('eslint-webpack-plugin');

// Import webpack helpers
const helpers = require('./webpack-helpers/helpers.js');

const PATHS = {
    src: path.resolve(__dirname, './src'),
    dist: path.resolve(__dirname, './dist'),

    pages: path.resolve(__dirname, './src', 'pages'),
    js: path.resolve(__dirname, './src', 'js'),

    FSDApp: path.resolve(__dirname, './src', '01_app'),
    FSDPages: path.resolve(__dirname, './src', '03_pages'),

    distAssets: 'assets',
    distJs: 'assets/js',
    distCss: 'assets/css',
    distImg: 'assets/img',

    modules: path.resolve(__dirname,'src', 'js', 'modules'),
    components: path.resolve(__dirname, 'src', 'js', 'components'),

    jsconfig: path.resolve(__dirname, 'jsconfig.json')
}

const ENTRIES = {};

// Array of names of *.html files:
let PAGES = helpers.getFilesOfExt(PATHS.pages, '.html');

// Array of HtmlWebpackPLugin entries for PAGES:
let htmlPluginPages = PAGES.map(
    (page) => new HtmlWebpackPlugin({
        template: `${PATHS.pages}/${page}`,
        filename: `${page}`,
        chunks: [path.parse(page).name],
    })
);

// const JS_FILES = helpers.getFilesOfExt(PATHS.js, '.js', 'mjs');
// let entryNamesFromJsFiles = JS_FILES.map(
//     (jsFile) => path.parse(jsFile).name
// );

// Js entries for each page of PAGES:
PAGES.forEach((page) => {
    let entryName = path.parse(page).name;
    let filePath = path.join(PATHS.js, `${entryName}.js`);
    if (helpers.exists(filePath)) {
        ENTRIES[entryName] = filePath;
    }
});

// // FSD pages
// const FSD_PAGES = helpers.getFolders(PATHS.FSDPages);
// let FSDHtmlPluginPages;

// FSDHtmlPluginPages = FSD_PAGES.map(
//     (page) => new HtmlWebpackPlugin({
//         template: `${PATHS.FSDPages}/${page}/${page}.html`,
//         filename: `${page}.html`,
//         chunks: [page],
//     })
// );
// FSD_PAGES.forEach((page) => {
//     let filePath = path.join(PATHS.FSDPages, `${page}/index.js`);
//     if (helpers.exists(filePath)) {
//         ENTRIES[page] = filePath;
//     }
// });

// let app = path.join(PATHS.FSDApp, 'app.js');
// if (helpers.exists(app)) {
//     ENTRIES['app'] = app;
// }

try {
    const data = fs.readFileSync(PATHS.jsconfig, 'utf8');
    const config = JSON.parse(data);

    let modules = config.compilerOptions.paths['modules/*'];
    let components = config.compilerOptions.paths['components/*'];

    let rewrite;
    if (!modules || !components) {
        rewrite = true;
    }
    if (!modules) {
        config.compilerOptions.paths['modules/*'] = helpers.absPathToJsconfigArray(PATHS.modules);
    }
    if (!components) {
        config.compilerOptions.paths['components/*'] = helpers.absPathToJsconfigArray(PATHS.components);
    }

    const string = JSON.stringify(config, null, 4);

    if (rewrite) {
        fs.writeFileSync(PATHS.jsconfig, string)
    }
} catch (err) {
    console.error(err);
}

module.exports = exports = {
    externals: {
        pages: PAGES,
        // TODO добавить сюда FSD_PAGES
        paths: PATHS,
    },
    resolve: {
        plugins: [
            new DirectoryNamedWebpackPlugin()
        ],
        alias: {
            modules: PATHS.modules,
            components: PATHS.components
        },
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
        // ...FSDHtmlPluginPages,
        new MiniCssExtractPlugin({
            filename: `${PATHS.distCss}/[name].css`,
        }),
        // new ESLintWebpackPlugin(),
    ]
};