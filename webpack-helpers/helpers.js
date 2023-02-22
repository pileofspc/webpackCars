const path = require('path');
const fs = require('fs');
const { compileString } = require('sass');



function getFilesOfExt(filepath, ...ext) {
    return fs.readdirSync(filepath, { withFileTypes: true }).filter((dirEnt) => {
        let lowerCaseName = dirEnt.name.toLowerCase();
        let result = false;
        for (let i = 0; i < ext.length; i++) {
            if (dirEnt.isFile() && lowerCaseName.endsWith(ext[i])) {
                result = true;
                break
            }
        }
        return result
    }).map((dirEnt) => {
        return dirEnt.name;
    });
};

function getFolders(filepath) {
    return fs.readdirSync(filepath, { withFileTypes: true }).filter((dirEnt) => {
        return !dirEnt.isFile();
    }).map((dirEnt) => {
        return dirEnt.name;
    });
};

function exists(filePath) {
    let result;
    try {
        fs.accessSync(filePath);
        result = true;
    } catch {
        result = false;
    }
    return result
}

function getCssPlugin(exp) {
    for (let item of exp.plugins) {
        if (item.constructor.pluginName === 'mini-css-extract-plugin') {
            return item
        }
    }
}

exports = module.exports = {
    getFilesOfExt,
    getFolders,
    exists,
    getCssPlugin,
}