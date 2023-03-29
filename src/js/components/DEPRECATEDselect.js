import { htmlToElement } from "../_helpers";

export default class Select {
    constructor() {
        // this.selectWindow = htmlToElement(
        //     `<div class="select">
        //         <form class="select__form" action="">
        //             <button class="select__apply-button">Apply</button>
        //         </form>
        //     </div>`
        // );
        // this.applyButton = this.selectWindow.querySelector('.select__apply-button');
        this.selectWindow = htmlToElement(
            `<div class="select">
                <form class="select__form" action="">
                    
                </form>
            </div>`
        );
        this.isOpen = false;
        this.form = this.selectWindow.querySelector('.select__form');

        this.selectWindow.style.visibility = 'hidden';

        this.selectWindow.ontransitionend = () => {
            if (!this.isOpen) {
                this.selectWindow.style.visibility = 'hidden';
            }
        };
        this.selectWindow.ontransitionstart = () => {
            if (this.isOpen) {
                this.selectWindow.style.visibility = 'visible';
            }
        };
    }

    open() {
        this.arrow.classList.add('arrow_open');
        this.selectWindow.classList.add('select_open');
        this.isOpen = true;
    }

    close() {
        this.arrow.classList.remove('arrow_open');
        this.selectWindow.classList.remove('select_open');
        this.isOpen = false;
    }

    mount(element) {
        this.root = element;
        this.rootName = this.root.querySelector('.select-root__name');
        this.arrow = element.querySelector('.arrow');
        
        this.root.addEventListener('click', (evt) => {
            if (!this.selectWindow.contains(evt.target)) {
                if (!this.isOpen) {
                    this.open();
                } else {
                    this.close();
                }
            }
        });
        this.root.append(this.selectWindow);
    }
}