"use strict";

import 'external-svg-loader';

// import '../assets/sass/dashboard.sass';
import '../assets/sass/dashboard.scss';
require.context('../assets/img/general/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);
require.context('../assets/img/dashboard/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);

import './misc';
import './dashboard_meters';
import './dashboard_miles';
import './dashboard_cars';