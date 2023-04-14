const path = require('path');
const fs = require('fs');
const util = require('util');

const PATHS = {
    root: path.resolve(__dirname),
    helpers: path.resolve(__dirname, 'webpack-helpers', 'webpack-helpers.js'),
    jsconfig: path.resolve(__dirname, 'jsconfig.json'),
    src: path.resolve(__dirname, './src'),
    dist: path.resolve(__dirname, './dist'),

    pages: path.resolve(__dirname, './src', 'pages'),
    js: path.resolve(__dirname, './src', 'js'),
    assets: path.resolve(__dirname, './src', 'assets'),
    sass: path.resolve(__dirname, 'src', 'assets', 'sass'),
    modules: path.resolve(__dirname,'src', 'js', 'modules'),
    components: path.resolve(__dirname, 'src', 'js', 'components'),

    distAssets: 'assets',
    distJs: 'assets/js',
    distCss: 'assets/css',
    distImg: 'assets/img',
}
global.PATHS = PATHS;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const helpers = require(PATHS.helpers);





const ENTRIES = {};

// Array of names of *.html files:
let PAGES = helpers.getFilesOfExt(PATHS.pages, '.html');

// Array of HtmlWebpackPlugin entries for PAGES:
let htmlPluginPages = PAGES.map(
    (page) => new HtmlWebpackPlugin({
        template: `${PATHS.pages}/${page}`,
        filename: `${page}`,
        chunks: [path.parse(page).name],
    })
);

// Js entries for each page of PAGES:
PAGES.forEach((page) => {
    let entryName = path.parse(page).name;
    let filePath = path.join(PATHS.js, `${entryName}.js`);
    if (fs.existsSync(filePath)) {
        ENTRIES[entryName] = filePath;
    }
});











// try {
//     const data = fs.readFileSync(PATHS.jsconfig, 'utf8');
//     const config = JSON.parse(data);

//     let modules = config.compilerOptions.paths['modules/*'];
//     let components = config.compilerOptions.paths['components/*'];

//     let rewrite;
//     if (!modules || !components) {
//         rewrite = true;
//     }
//     if (!modules) {
//         config.compilerOptions.paths['modules/*'] = helpers.absPathToJsconfigArray(PATHS.modules);
//     }
//     if (!components) {
//         config.compilerOptions.paths['components/*'] = helpers.absPathToJsconfigArray(PATHS.components);
//     }

//     const string = JSON.stringify(config, null, 4);

//     if (rewrite) {
//         fs.writeFileSync(PATHS.jsconfig, string)
//     }
// } catch (err) {
//     console.error(err);
// }












module.exports = exports = {
    resolve: {
        alias: {
            modules: PATHS.modules,
            components: PATHS.components,
            sass: PATHS.sass
        }
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
                test: /\.m?jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
                resourceQuery: { not: /static/ },
                generator: {
                    filename: `${PATHS.distImg}/[hash][ext]`
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
                resourceQuery: /static/,
                generator: {
                    filename: `${PATHS.distImg}/static/[name][ext]`
                }
            },
            // Следующее правило чисто для "эмуляции" бэка, чтобы не копировать вручную эти файлы. Картинки товаров
            // должны управляться бэком, а не фронтом, поэтому мы просто запрашиваем с бэка данные о продукте, среди
            // которых есть и путь до картинки товара, которая просто лежит отдельно. При этом во фронте она никак не
            // должна фигурировать.
            {
                test: /booking-cars\\.*\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.distImg}/static/products/[name][ext]`
                }
            },
            {
                test: /test\.html$/i,
                use: {
                    loader: 'html-loader',
                    options: {
                        sources: {
                            list: [
                                "...",
                                {
                                    tag: "svg",
                                    attribute: "data-src",
                                    type: "src"
                                }
                            ],
                            // Это нужно для того, чтобы приложение не падало, когда не находит нужную картинку
                            urlFilter(attribute, value, resourcePath) {
                                const resolved = helpers.resolveAliases(value, exports.resolve.alias);
                                let found = fs.existsSync(resolved);
                                if (!found) {
                                    // Тут хотел сделать предупреждение, но оно работает только в Node, а вебпак
                                    // не отображает это как предупреждение в конце сборки
                                    console.log('\x1b[33m');
                                    console.error('--------------------------------------------------------------\n' +
                                        'ВНИМАНИЕ! Ссылка на незахешированный файл попала в сборку!\n' +
                                        '\tссылка: ' + value + '\n' +
                                        '\tсо страницы: ' + resourcePath + '\n' +
                                        '--------------------------------------------------------------'
                                    );
                                    console.log('\x1b[0m')
                                }
                                return found
                            }
                        }
                    }
                }
            }
        ]
    },

    plugins: [
        ...htmlPluginPages,
        new MiniCssExtractPlugin({
            filename: `${PATHS.distCss}/[name].css`,
        }),
        // new ESLintWebpackPlugin(),
    ]
};