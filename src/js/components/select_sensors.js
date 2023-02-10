import { Select } from './select';
import { htmlToElement } from './../_helpers';
import { RadioItem } from './radioItem';

export class SelectSensors extends Select {
    constructor() {
        super();

        this.selectWindow.classList.add('sensors__select');
        // this.sensor = htmlToElement(
        //     `<div class="radio-item">
        //         <label class="radio-item__label">
        //             <input class="radio radio-item__radio" type="radio" name="PLACEHOLDER_NAME">
        //                 <div class="custom-radio-button radio-item__custom-radio-button">
        //                     <div class="custom-radio-button__dot"></div>
        //                 </div>
        //                 <span class="radio-item__label-text">Asset - Fuel Consumed Fuel umed</span>
        //         </label>
        //     </div>`);

        this.radioItemsGenerator = new RadioItem('sensors__radio-item');
        this.populate();
        this.populate();
        this.populate();
        this.populate();
        this.populate();

        this.radioItems = this.selectWindow.querySelectorAll('.radio-item');
        this.addEventListeners();
    }

    populate() {
        this.form.prepend(this.radioItemsGenerator.generate());
    }

    addEventListeners() {
        for (const item of this.radioItems) {
            item.addEventListener('change', (evt) => {
                this.close();
                this.rootName.textContent = item.querySelector('.radio-item__label-text').textContent;
            })
        }
    }
}