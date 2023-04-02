// Button.js
import Component from 'components/Component/Component';

export default class Button extends Component {
    isActive = false;
    #iconPath;
    #inactiveIconPath;

    constructor({
        id,
        isActive,
        iconPath,
        inactiveIconPath,
        handleClick
    } = {}) {
        const html = 
            `<button class="button button_bgcolor_dark1 button_round">
                <svg class="button__img" data-src="" ${Component.idAttr}="img">
            </button>`;
        super({html});

        this.#iconPath = iconPath;
        this.#inactiveIconPath = inactiveIconPath;

        this.deactivate();

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

    setIcon(pathToIcon) {
        this.nodes.img.setAttribute('data-src', pathToIcon);
    }

    activate() {
        this.setIcon(this.#iconPath);
        this.isActive = true;
    }

    deactivate() {
        this.setIcon(this.#inactiveIconPath);
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