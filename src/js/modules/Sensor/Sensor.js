import Component from '@components/Component/Component';
import checkmarkSvg from '@img/icon_checkmark.svg';
import graphicSvg from '@img/sensors_graphic.svg';

export default class Sensor extends Component {
    html =
        `<div class="sensor sensors__sensor">
            <label class="sensor__label">
                <input class="checkbox sensor__checkbox" type="checkbox" name="" ${Component.idAttr}="checkbox">
                    <div class="custom-checkbox custom-checkbox_bgcolor_secondary1 sensor__custom-checkbox">
                        <svg class="custom-checkbox__checkmark" data-src="${checkmarkSvg}"></svg>
                    </div>
                    <span class="sensor__label-text" ${Component.idAttr}="name"></span><span class="sensor__unit" ${Component.idAttr}="unit"></span>
            </label>
            <a href="#" class="sensor__graphic">
                <svg class="sensor__graphic-svg" data-src="${graphicSvg}" ${Component.idAttr}="graphicSvg"></svg>
            </a>
        </div>`;
    constructor({
        name = 'Sensor',
        unit = 'Unit',
    } = {}) {
        super();
        this._init(this.html);

        this.nodes.name.textContent = name;
        this.nodes.unit.textContent = unit;

        const checkbox = this.nodes.checkbox;
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                this.nodes.graphicSvg.style.color = 'var(--secondary1)';
            } else {
                this.nodes.graphicSvg.style.color = '';
            }
        });
    }
}