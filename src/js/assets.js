"use strict";

import 'external-svg-loader'

import './misc'
import './assets_activity'
import './assets_sensors'
import './assets_reminder'

import '/src/assets/sass/assets.scss'
require.context('/src/assets/img/general/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);
require.context('/src/assets/img/assets/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);