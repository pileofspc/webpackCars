import Component from 'components/Component/Component';
import './FormSensorsSeeAll.scss';

export default class FormSensorsSeeAll extends Component {
    html =
        `<form class="form-sensors-see-all__form" action=""></form>`;
    groups = [];
    constructor() {
        super();
        this._init(this.html);
    }

    addGroup(name, children) {
        children.classList.add('form-sensors-see-all__item');

        let groupNode = this._element(
            `<div class="modal-sensors-see-all__group">
                <div class="modal-sensors-see-all__group-name">${name}</div>
            </div>`);
        groupNode.append(children);

        this.mainNode.append(groupNode);

        this.groups.push({
            name: name,
            node: groupNode
        });
    }
}















// import { htmlToElement } from '../_helpers';
// import Modal from './modal';
// import Sensor from './sensor';

// class ModalSensorsSeeAll extends Modal {
//     constructor() {
//         super();

//         this.modal.classList.add('modal-sensors-see-all');
//         this.headerSpan.textContent = 'Sensors';
//         this.groups = [];

//         this.sensorGenerator = new Sensor('modal-sensors-see-all__item');

//         this.content.innerHTML = 
//             `<form class="modal-sensors-see-all__form" action="">
                
//             </form>`

//         this.form = this.content.querySelector('.modal-sensors-see-all__form');

//         let group = 'Assets';
//         let sensorName = 'Asset - Fuel Consumed';
//         let unit = 'km'
//         this.sensorGenerator.name = sensorName;
//         this.sensorGenerator.unit = unit;
//         this.addGroup(group);
//         for (let i = 0; i < 9; i++) {
//             this.addItem(this.sensorGenerator.generate(), group);
//         }
//         this.addGroup('Cars');
//         for (let i = 0; i < 9; i++) {
//             this.addItem(this.sensorGenerator.generate(), 'Cars');
//         }
//     }

//     addGroup(name) {
//         let groupNode = htmlToElement(
//             `<div class="modal-sensors-see-all__group">
//                 <div class="modal-sensors-see-all__group-name">${name}</div>
//             </div>`);
//         this.form.append(groupNode);
//         this.groups.push({
//             name: name,
//             node: groupNode
//         });
//     }

//     addItem(item, groupName) {
//         this.groups.find(value => value.name === groupName).node.append(item);
//     }
// }