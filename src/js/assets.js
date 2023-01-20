"use strict";

import 'external-svg-loader'

import '/src/assets/sass/assets.scss'
require.context('/src/assets/img/general/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);
require.context('/src/assets/img/assets/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);

import './misc'


import './assets_activity'





// прототипы __proto__ и prototype
// 1.15 + 2.30
// Math.max.apply(null, arr)
// new Array.prototype.constructor(1, 2)