import Component from '/src/js/components/component';
import { htmlToElement } from '/src/js/_helpers.js';

export default class Button extends Component {
    constructor({
        id,
        bgColor,
        icon,
        eventListener
    }) {
        super();

        this.html = 
            `<button class="button button_bgcolor_dark1 button_round inf-list__button inf-list__view-type-button" data-id="mainNode">
                <svg class="inf-list__button-img" data-src="${icon}"></svg>
            </button>`
        this.node = htmlToElement(this.html);

        this.collectNodes();

        this.controlledNodes.mainNode.addEventListener('click', (e) => {
            this.toggleButton();
        })

        return this.node
    }

    activateButton() {
        this.controlledNodes.mainNode.classList.add('active')
    }

    deactivateButton() {
        this.controlledNodes.mainNode.classList.remove('active')
    }

    toggleButton() {
        if (this.controlledNodes.mainNode.classList.contains('active')) {
            this.deactivateButton()
        } else {
            this.activateButton();
        }
    }
}