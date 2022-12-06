module.exports = {
    plugins: [
        // [
        //     "postcss-preset-env",
        //     {
        //         // Options

        //     },
        // ],
        require('autoprefixer'),
        require('mqpacker'),
        require('cssnano')({
            preset: [require('cssnano-preset-default')],
        }),
    ],
};

// preset: [ require('cssnano-preset-default'), { discardComments: false } ],