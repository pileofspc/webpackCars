import '/src/01_app/general.scss';
import './booking.scss';
import { Header } from '/src/04_widgets/header';
import { Sidebar } from '/src/04_widgets/sidebar';

const header = new Header('page__header');
const sidebar = new Sidebar('page__sidebar');
document.body.prepend(header.node);
document.body.prepend(sidebar.node);

document.getElementById('booking').classList.add('nav_current-link');