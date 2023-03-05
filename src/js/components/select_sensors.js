import { Select } from './select';
import { RadioItem } from './radioItem';

export class SelectSensors extends Select {
    constructor() {
        super();

        this.selectWindow.classList.add('sensors__select');

        this.addRadioItem('zdarova', 'classdasdasd');
        this.addRadioItem('zdarova', 'classdasdasd');
        this.addRadioItem('zdarova', 'classdasdasd');
        this.addRadioItem('zdarova', 'classdasdasd');

        this.radioItems = this.selectWindow.querySelectorAll('.radio-item');
        this.addEventListeners();
    }

    addRadioItem(name, className) {
        this.form.prepend(new RadioItem(name, className));
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