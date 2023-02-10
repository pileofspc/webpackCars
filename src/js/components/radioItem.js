import { htmlToElement } from "../_helpers"

export class RadioItem {
    constructor(className) {
        this.html = 
            `<div class="radio-item">
                <label class="radio-item__label">
                    <input class="radio radio-item__radio" type="radio" name="PLACEHOLDER_NAME">
                        <div class="custom-radio-button radio-item__custom-radio-button">
                            <div class="custom-radio-button__dot"></div>
                        </div>
                        <span class="radio-item__label-text">Cars</span>
                </label>
            </div>`;
        this.node = htmlToElement(this.html);
        this.node.classList.add(className);

        this.nameNode = this.node.querySelector('.radio-item__label-text');
    };

    get name() {
        return this.nameNode.textContent;
    }

    set name(value) {
        this.nameNode.textContent = value;
    }

    generate() {
        let clone = this.node.cloneNode(true);
        return clone;
    }
}