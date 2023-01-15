"use strict";

import 'external-svg-loader'

import '../assets/sass/assets.scss'
require.context('../assets/img/general/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);
require.context('../assets/img/assets/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);

import './misc'


import './assets_activity'





// прототипы __proto__ и prototype
// 1.15 + 2.30
// Math.max.apply(null, arr)
// new Array.prototype.constructor(1, 2)