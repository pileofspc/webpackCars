import './searchbar.scss';
import { htmlToElement } from '/src/07_shared/helpers.js';

export class Searchbar {
    constructor(parentClassName) {
        this.html = 
            `<label class="searchbar header__searchbar">
                <img src="assets/img/searchbar__icon.svg" alt="Search" class="searchbar__icon">
                    <form action="" method="get" class="searchbar__form">
                        <input class="searchbar__input" type="text" placeholder="Search or type">
                    </form>
            </label>`;
        this.node = htmlToElement(this.html);

        if (parentClassName) {
            this.node.classList.add(parentClassName);
        }
    }
}