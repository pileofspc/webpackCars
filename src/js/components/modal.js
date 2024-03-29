import { htmlToElement } from '../_helpers';

export default class Modal {
    constructor() {
        this.modal = htmlToElement(
            `<div class="modal">
                <div class="modal-window modal__window">
                    <div class="modal-window__header modal__header">
                        <span class="block-header"></span>
                        <svg class="modal__close-button" data-src="assets/img/close-button.svg"></svg>
                    </div>
                    <div class="modal__content"></div>
                </div>
            </div>`
        );
        this.headerSpan = this.modal.querySelector('.block-header');
        this.closeButton = this.modal.querySelector('.modal__close-button');
        this.content = this.modal.querySelector('.modal__content');

        this.modal.addEventListener('pointerdown', (evt) => {
            if (evt.currentTarget === evt.target) {
                this.modal.remove();
            }
        });
        this.closeButton.addEventListener('pointerdown', (evt) => {
            this.modal.remove();
        });
    }

    prepend(element) {
        element.prepend(this.modal);
    }
}