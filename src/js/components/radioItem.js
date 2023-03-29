import { htmlToElement, toCamelCase } from "/src/js/_helpers"

export default class RadioItem {
    constructor(itemName, className) {
        let name = '';
        let nameAttribute = 'NOT_FILLED';
        if (itemName) {
            name = itemName;
            nameAttribute = toCamelCase(name)
        };
        this.html = 
            `<div class="radio-item ${className}">
                <label class="radio-item__label">
                    <input class="radio radio-item__radio" type="radio" name="${nameAttribute}">
                        <div class="custom-radio-button radio-item__custom-radio-button">
                            <div class="custom-radio-button__dot"></div>
                        </div>
                        <span class="radio-item__label-text">${name}</span>
                </label>
            </div>`;
        this.node = htmlToElement(this.html);
        this.nameNode = this.node.querySelector('.radio-item__label-text');
        return this.node
    }

    get name() {
        return this.nameNode.textContent;
    }

    set name(value) {
        this.nameNode.textContent = value;
    }
}