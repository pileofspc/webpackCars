import Component from '@components/Component/Component';
import './ButtonClick.scss';

export default class ButtonClick extends Component {
    html = 
        `<button class="button button_bgcolor_dark1 button_round">
            <svg class="button__img" ${Component.idAttr}="img">
                <use xlink:href="PLACEHOLDER" ${Component.idAttr}="imgUse"></use>
            </svg>
        </button>`;

    constructor({
        isActive,
        iconSpriteId,
        onClick,
        // default color is v.$primary3 in scss
        color,
    } = {}) {
        super();
        this._init(this.html)

        this.nodes.imgUse.setAttribute('xlink:href', `#${iconSpriteId}`);

        if (color) {
            this.mainNode.style.setProperty('--activecolor', color)
        }
        if (onClick) {
            this.addEventListener('click', onClick)
        }
    }
}