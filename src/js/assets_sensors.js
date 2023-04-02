import Select from 'components/Select/Select';
import Modal from 'components/Modal/Modal';

import FormSensorsSeeAll from 'modules/Forms/FormSensorsSeeAll/FormSensorsSeeAll';
import Sensor from 'modules/Sensor/Sensor';
import Component from './components/Component/Component';

class Sensors extends Component {
    constructor() {
        super();

        this.sensorsWidget = document.querySelector('.sensors');
        this.sensors = this.sensorsWidget.querySelectorAll('.sensor');
        this.sensorsListNode = this.sensorsWidget.querySelector('.sensors__list');
        this.selectRoot = this.sensorsWidget.querySelector('.select-root');
        this.seeAllButton = this.sensorsWidget.querySelector('.sensors__button');
        this.sensorsHeader = this.sensorsWidget.querySelector('.sensors__header');

        for (let i = 1; i <= 5; i++) {
            let name = 'Asset - Fuel Consumed';
            let unit = 'km';
            let sensor = new Sensor({
                name: name,
                unit: unit,
            });

            this.sensorsListNode.append(sensor.mainNode);
        }

        const categorySelect = new Select({
            name: 'Assets',
            isRightSided: true,
            options: [
                this._element(`<div>123</div>`)
            ]
        });
        this.sensorsHeader.append(categorySelect.mainNode);

        const form = new FormSensorsSeeAll();
        form.addGroup('Priv', new Sensor({name: 'Hello', unit: 'World'}).mainNode);
        form.addGroup('Priv', new Sensor({name: 'Hello', unit: 'World'}).mainNode);
        form.addGroup('Priv', new Sensor({name: 'Hello', unit: 'World'}).mainNode);
        
        const modal = new Modal({
            name: 'Тестовая форма',
            children: form.mainNode
        });
        this.seeAllButton.addEventListener('click', (evt) => {
            document.body.prepend(modal.mainNode);
        });
    }
}

let sensors = new Sensors();