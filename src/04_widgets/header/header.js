// import { v4 as uuidv4 } from 'uuid';
import './header.scss';
import { htmlToElement } from '/src/07_shared/helpers.js';
import { Searchbar } from '/src/05_features/searchbar/';
import { Profile } from '/src/05_features/profile/profile';
import { NotificationBell } from '/src/05_features/notificationBell/notificationBell';
// import { Component } from '/src/07_shared/component/component';

export class Header {
    constructor(parentClassName) {
        // this.id = uuidv4();
        this.html = 
            `<header class="header">
                <div class="header__inner">
                    <div class="header__user"></div>
                </div>
            </header>`;
        this.node = htmlToElement(this.html);
        this.header__inner = this.node.querySelector('.header__inner');
        this.header__user = this.node.querySelector('.header__user');

        let searchbar = new Searchbar('header__searchbar');
        this.header__inner.prepend(searchbar.node);

        let notificationBell = new NotificationBell('header__notification-bell');
        let profile = new Profile('header__profile');
        this.header__user.append(notificationBell.node);
        this.header__user.append(profile.node);

        if (parentClassName) {
            this.node.classList.add(parentClassName);
        }
    }
};