import 'external-svg-loader';

import '@sass/booking.scss';
import './misc';
import './booking_inf-list.js';

// Этого не должно быть в финальном билде
require.context('@img/external/')