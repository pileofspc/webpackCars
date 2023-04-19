import Component from '@components/Component/Component';
import './Button.scss';

export default class Button extends Component {
    html = 
        `<button class="button button_bgcolor_dark1 button_round">
            <svg class="button__img" ${Component.idAttr}="img">
        </button>`;

    isActive = false;

    constructor({
        id,
        isActive,
        iconPath,
        handleClick
    } = {}) {
        super();
        this._init(this.html)

        this.nodes.img.setAttribute('data-src', iconPath);

        this.mainNode.addEventListener('click', () => {
            this.toggle();
        })

        if (isActive) {
            this.activate();
        }
        if (handleClick) {
            this.addListener('click', handleClick)
        }
    }

    activate() {
        this.mainNode.classList.add('active');
        this.isActive = true;
    }

    deactivate() {
        this.mainNode.classList.remove('active');
        this.isActive = false;
    }

    toggle() {
        if (this.mainNode.classList.contains('active')) {
            this.deactivate()
        } else {
            this.activate();
        }
    }

    addListener(type, callback) {
        let listener = (e) => {
            callback.apply(this)
        }

        this.mainNode.addEventListener(type, listener)
    }
}