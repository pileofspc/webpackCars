import Component from '@components/Component/Component';
import ErrorDiv from '@components/UserErrors/ErrorDiv/ErrorDiv';
import './Modal.scss';

import closeButtonSvg from '@img/button_close.svg';

export default class Modal extends Component {
    html =
        `<div class="modal">
            <div class="modal-window modal__window">
                <div class="modal-window__header modal__header">
                    <span class="block-header" ${Component.idAttr}="name"></span>
                    <svg class="modal__close-button" data-src="${closeButtonSvg}" ${Component.idAttr}="close"></svg>
                </div>
                <div class="modal__content" ${Component.idAttr}="content"></div>
            </div>
        </div>`;
    constructor({
        children = new ErrorDiv('Modal received no children').mainNode,
        name = "Окно"
    } = {}) {
        super();
        this._init(this.html);

        this.mainNode.addEventListener('click', (e) => {
            if (e.target === this.mainNode || this.nodes.close.contains(e.target)) {
                this.remove();
            }
        })

        if (name) {
            this.nodes.name.textContent = name;
        }
        if (children) {
            this.nodes.content.append(children)
        }
    }

    remove() {
        this.mainNode.remove();
    }
}