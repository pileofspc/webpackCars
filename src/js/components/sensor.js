import { htmlToElement } from "../_helpers";

export class Sensor {
    constructor(className = 'sensor') {
        this.html = 
            `<div class="sensor sensors__sensor">
                <label class="sensor__label">
                    <input class="checkbox sensor__checkbox" type="checkbox" name="">
                        <div class="custom-checkbox custom-checkbox_bgcolor_secondary1 sensor__custom-checkbox">
                            <svg class="custom-checkbox__checkmark" data-src="assets/img/checkmark.svg"></svg>
                        </div>
                        <span class="sensor__label-text"></span><span class="sensor__unit"></span>
                </label>
                <a href="#" class="sensor__graphic">
                    <svg class="sensor__graphic-svg" data-src="assets/img/sensor__graphic-svg.svg"></svg>
                </a>
            </div>`;
        this.node = htmlToElement(this.html);
        this.node.classList.add(className);

        this.sensorNameNode = this.node.querySelector('.sensor__label-text');
        this.unitNode = this.node.querySelector('.sensor__unit');
    }

    get name() {
        return this.sensorNameNode.textContent;
    }

    set name(value) {
        this.sensorNameNode.textContent = value;
    }

    get unit() {
        return this.unitNode.textContent;
    }

    set unit(value) {
        this.unitNode.textContent = `(${value})`;
    }

    addEventListeners(clone) {
        const checkbox = clone.querySelector('.checkbox');
        const graphicPath = clone.querySelector('.sensor__graphic-svg');
        // console.log(graphicPath)

        checkbox.addEventListener('change', () => {
            // console.log(1);
            if (checkbox.checked) {
                graphicPath.style.color = 'var(--secondary1)';
            } else {
                graphicPath.style.color = '';
            }
        });
    }

    generate() {
        let clone = this.node.cloneNode(true);
        this.addEventListeners(clone);
        return clone;
    }
}