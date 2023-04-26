import Component from '@components/Component/Component';

import checkmark from '@img/icon_checkmark.svg?sprite';

import './Checkbox.scss';

export default class Checkbox extends Component {
    html =
        `<label class="checkbox">
            <input class="checkbox__input" type="checkbox" ${Component.idAttr}="input">
            <div class="checkbox__box" ${Component.idAttr}="box">
                <svg class="checkbox__checkmark" ${Component.idAttr}="checkmark">
                    <use href="#${checkmark.id}"></use>
                </svg>
            </div>
            <span class="checkbox__label-text" ${Component.idAttr}="label"></span>
        </label>`;
    constructor(
        {
            label = '',
            groupName = 'group',
        } = {}
    ) {
        super();
        this._init(this.html);

        this.nodes.label.textContent = label;
        this.nodes.input.setAttribute('name', groupName);
    }

    uncheck() {
        if (this.nodes.input.checked) {
            this.nodes.input.checked = false;
            this.nodes.input.dispatchEvent(new Event('change'));
        }
    }
}