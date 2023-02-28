import './profile.scss';
import { htmlToElement } from '/src/07_shared/helpers.js';

export class Profile {
    constructor(parentClassName) {
        this.html = 
            `<a href="profile.html" class="profile header__profile">
                <img src="assets/img/avatar.jpg" alt="Avatar" class="profile__img">
            </a>`;
        this.node = htmlToElement(this.html);

        if (parentClassName) {
            this.node.classList.add(parentClassName);
        }
    }
}