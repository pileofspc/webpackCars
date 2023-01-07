"use strict"

import 'external-svg-loader'

import '../assets/sass/assets.scss'
require.context('../assets/img/general/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);
require.context('../assets/img/assets/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);

import './misc'