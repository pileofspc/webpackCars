
import { htmlToElement } from '/src/07_shared/helpers.js';
import './nav.scss';

export class Nav {
    constructor(parentClassName) {
        this.html = 
            `<nav class="nav">
                <div class="nav__main">
                    <a href="dashboard.html" class="link nav__link" id="dashboard"><img class="nav__img"
                        src="assets/img/dashboard_icon.svg" alt="">Dashboard</a>
                    <a href="assets.html" class="link nav__link" id="assets"><img class="nav__img"
                        src="assets/img/assets_icon.svg" alt="">Assets</a>
                    <a href="booking.html" class="link nav__link" id="booking"><img class="nav__img" src="assets/img/booking_icon.svg"
                        alt="">Booking</a>
                    <a href="sell-cars.html" class="link nav__link" id="sell-cars"><img class="nav__img" src="assets/img/sellcars_icon.svg"
                        alt="">Sell Cars</a>
                    <a href="buy-cars.html" class="link nav__link" id="buy-cars"><img class="nav__img" src="assets/img/buycars_icon.svg"
                        alt="">Buy Cars</a>
                    <a href="services.html" class="link nav__link" id="services"><img class="nav__img" src="assets/img/services_icon.svg"
                        alt="">Services</a>
                    <a href="calendar.html" class="link nav__link" id="calendar"><img class="nav__img" src="assets/img/calendar_icon.svg"
                        alt="">Calendar</a>
                    <a href="messages.html" class="link nav__link" id="messages"><img class="nav__img" src="assets/img/messages_icon.svg"
                        alt="">Messages</a>
                </div>
                <div class="nav__controls">
                    <a href="settings.html" class="link nav__link" id="settings"><img class="nav__img" src="assets/img/settings_icon.svg"
                        alt="">Settings</a>
                    <a href="logout.html" class="link nav__link" id="logout"><img class="nav__img" src="assets/img/logout_icon.svg"
                        alt="">Log out</a>
                </div>
            </nav>`;
        this.node = htmlToElement(this.html);

        if (parentClassName) {
            this.node.classList.add(parentClassName);
        }
    }
}




