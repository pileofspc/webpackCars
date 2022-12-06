const path = require('path');
const fs = require('fs');
const config = require('../webpack.config.base.js');


const PAGES = config.externals.pages;
const PATHS = config.externals.paths;
PAGES.map((page)=>{
    let entryName = path.parse(page).name;
    try {
        fs.writeFileSync(path.join(PATHS.js, `${entryName}.js`), '', { flag: 'wx' });
    } catch {}
});

