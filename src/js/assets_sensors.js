import { SelectSensors } from './components/select_sensors';
import { ModalSensorsSeeAll } from './components/modal_sensorsSeeAll';
import { Sensor } from './components/sensor';
import Component from './components/Component/Component';

class Sensors extends Component {
    constructor() {
        super();

        this.sensorsWidget = document.querySelector('.sensors');
        this.sensors = this.sensorsWidget.querySelectorAll('.sensor');
        this.sensorsListNode = this.sensorsWidget.querySelector('.sensors__list');
        this.generator = new Sensor();
        this.selectRoot = this.sensorsWidget.querySelector('.select-root');
        this.seeAllButton = this.sensorsWidget.querySelector('.sensors__button')

        for (let i = 1; i <= 5; i++) {
            this.generator.name = 'Asset - Fuel Consumed';
            this.generator.unit = 'km';
            this.sensorsListNode.append(this.generator.generate())
        }

        new SelectSensors().mount(this.selectRoot);

        this.modal = new ModalSensorsSeeAll();
        this.seeAllButton.addEventListener('click', (evt) => {
            this.modal.prepend(document.body);
        })
    }
}

let sensors = new Sensors();