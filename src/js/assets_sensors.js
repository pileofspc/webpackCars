import { htmlToElement } from './_helpers';

class Sensors {
    constructor() {
        this.sensorsWidget = document.querySelector('.sensors');
        this.sensors = this.sensorsWidget.querySelectorAll('.sensor');
        this.selectButton = this.sensorsWidget.querySelector('.sensors__select-button');
        this.isOpen = false;
        this.sensorHTML =
            `<div class="sensor sensors__sensor">
                <label class="sensor__label">
                    <input class="checkbox sensor__checkbox" type="checkbox" name="fuel">
                        <div class="custom-checkbox custom-checkbox_bgcolor_secondary1 sensor__custom-checkbox">
                            <svg class="custom-checkbox__checkmark" data-src="assets/img/checkmark.svg"></svg>
                        </div>
                        <span class="sensor__label-text">Asset</span><span class="sensor__unit">(km)</span>
                </label>
                <a href="#" class="sensor__graphic">
                    <svg class="sensor__graphic-svg" data-src="assets/img/sensor__graphic-svg.svg"></svg>
                </a>
            </div>`;

        for (const sensor of this.sensors) {
            let checkbox = sensor.querySelector('.checkbox');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    sensor.querySelector('.sensor__graphic-svg path').style.fill = 'var(--secondary1)';
                } else {
                    sensor.querySelector('.sensor__graphic-svg path').style.fill = '';
                }
            })
        };

        this.selectWindow = htmlToElement(
            `<div class="select sensors__select">
                <form class="select__form" action="">
                    ${this.sensorHTML}
                    ${this.sensorHTML}
                    <button class="select__button">Apply</button>
                </form>
            </div>`
        );

        this.button = this.selectWindow.querySelector('.select__button');
        this.arrow = this.selectButton.querySelector('.sensors__arrow');
        this.selectWindow.style.visibility = 'hidden';

        this.selectButton.addEventListener('click', (evt) => {
            if (!this.selectWindow.contains(evt.target)) {
                if (!this.isOpen) {
                    // this.selectWindow.style.visibility = 'visible';
                    // this.arrow.classList.add('sensors__arrow_open');
                    // this.selectWindow.classList.add('sensors__select_open');
                    // this.open = true;
                    this.open();
                } else {
                    // this.arrow.classList.remove('sensors__arrow_open');
                    // this.selectWindow.classList.remove('sensors__select_open');
                    // this.open = false;
                    // setTimeout(() => {
                    //     this.selectWindow.style.visibility = 'hidden';
                    // }, 200)
                    
                    this.close();
                }
            }
        });

        this.selectButton.append(this.selectWindow);
    }

    open() {
        this.selectWindow.style.visibility = 'visible';
        this.arrow.classList.add('sensors__arrow_open');
        this.selectWindow.classList.add('sensors__select_open');
        this.isOpen = true;
    };

    close() {
        this.arrow.classList.remove('sensors__arrow_open');
        this.selectWindow.classList.remove('sensors__select_open');
        this.isOpen = false;
        setTimeout(() => {
            this.selectWindow.style.visibility = 'hidden';
        }, 300)
        // Задержка меньше, чем transition, т.к. здесь анимируется max-height =>
        // тайминги только примерные (при такой реализации)
    }
}

let sensors = new Sensors();