import { htmlToElement } from '/src/07_shared/helpers.js';

export class Logo {
    constructor(parentClassName) {
        this.html = 
            `<a class="logo sidebar__logo" href="./">
                <img class="sidebar__logo-img" src="assets/img/logo.svg" alt="">
            </a>`;
        this.node = htmlToElement(this.html);

        if (parentClassName) {
            this.node.classList.add(parentClassName);
        }
    }
}