import Component from 'components/Component/Component';

import './RadioButton.scss';

export default class RadioButton extends Component {
    html =
        `<label class="radio-button">
            <input class="radio-button__circle" type="radio" ${Component.idAttr}="input">
            <span class="radio-button__label-text" ${Component.idAttr}="label"></span>
        </label>`;
    constructor({
        label = '',
        groupName = 'group',
    } = {}) {
        super();
        this._init(this.html);

        this.nodes.label.textContent = label;
        this.nodes.input.setAttribute('name', groupName);
    }
}