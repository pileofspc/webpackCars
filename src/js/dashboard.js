"use strict"

import '../assets/sass/dashboard.sass'
// import '../assets/less/dashboard.less'
require.context('../assets/img/dashboard/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);

import './dashboard_misc'
import './dashboard_meters'
import './dashboard_miles'
import './dashboard_cars'