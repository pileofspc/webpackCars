import './sidebar.scss';
import { htmlToElement } from '/src/07_shared/helpers.js';
import { Logo } from '/src/05_features/logo';
import { Nav } from '/src/05_features/nav';

export class Sidebar {
    constructor(parentClassName) {
        this.html = 
            `<div class="sidebar"></div>`;
        this.node = htmlToElement(this.html);

        let logo = new Logo('sidebar__logo');
        this.node.prepend(logo.node);
        let nav = new Nav('sidebar__nav');
        this.node.append(nav.node);

        if (parentClassName) {
            this.node.classList.add(parentClassName);
        }
    }
}