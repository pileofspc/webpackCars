// ModifiedButton.js
import Component from 'components/Component/Component';

export default class ModifiedButton extends Component {
    isActive = false;

    constructor({
        id,
        isActive,
        handleClick
    } = {}) {
        const html = 
            `<button class="button button_bgcolor_dark1 button_round">
            </button>`
        super(html);

        this.mainNode.addEventListener('click', () => {
            this.toggle();
        })

        if (isActive) {
            this.activate();
        }
        if (handleClick) {
            this.addClickListener(handleClick)
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
        if (this.isActive) {
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