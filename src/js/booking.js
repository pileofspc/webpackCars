import 'external-svg-loader';
import './misc';

import '../assets/sass/booking.scss';
import './booking_inf-list.js';

require.context('../assets/img/general/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);
require.context('../assets/img/booking/', true, /\.(svg)|(png)|(jpg)|(jpeg)$/);