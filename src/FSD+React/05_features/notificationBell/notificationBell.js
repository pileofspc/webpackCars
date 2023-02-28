import './notificationBell.scss';
import { htmlToElement } from '/src/07_shared/helpers.js';
import { NotificationBellApi } from './api';

export class NotificationBell {
    constructor(parentClassName) {
        this.html = 
            `<a href="bell.html" class="notification-bell header__notification-bell">
                <img src="assets/img/notification-bell.svg" alt="Bell" class="notification-bell__img">
            </a>`;
        this.node = htmlToElement(this.html);
        this.api = new NotificationBellApi();

        // Notification bell
        let unreadBellPath = 'assets/img/notification-bell_active.svg';
        let bellPath = 'assets/img/notification-bell.svg';
        let bell = this.node.querySelector('.notification-bell__img');

        if (this.api.check()) {
            bell.setAttribute('src', unreadBellPath)
        } else {
            bell.setAttribute('src', bellPath)
        }

        if (parentClassName) {
            this.node.classList.add(parentClassName);
        }
    }
}