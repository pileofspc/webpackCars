import Component from 'components/Component/Component';
import './Button.scss';

export default class Button extends Component {
    html = 
        `<button class="button button_bgcolor_dark1 button_round">
            <svg class="button__img" data-src="" ${Component.idAttr}="img">
        </button>`;
    constructor({
        id,
        isActive,
        icon,
    }) {
        super();
        this.init();

        this.nodes.img.setAttribute('data-src', icon);

        this.mainNode.addEventListener('click', () => {
            this.toggleButton();
        })

        if (isActive) {
            this.activateButton();
        }
        
        return this.mainNode
    }

    activateButton() {
        this.mainNode.classList.add('active')
    }

    deactivateButton() {
        this.mainNode.classList.remove('active')
    }

    toggleButton() {
        if (this.mainNode.classList.contains('active')) {
            this.deactivateButton()
        } else {
            this.activateButton();
        }
    }
}