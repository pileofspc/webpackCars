// ./webpack.config.base.js
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