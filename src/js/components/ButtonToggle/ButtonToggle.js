import Component from '@components/Component/Component';
import './ButtonToggle.scss';

export default class ButtonToggle extends Component {
    html =
        `<button class="button"></button>`;
    svgHtml =
        `<svg class="button__img" ${Component.idAttr}="img">
            <use xlink:href="" ${Component.idAttr}="imgUse"></use>
        </svg>`;
    innerTextHtml =
        `<span class="button__inner-text" ${Component.idAttr}="innerText"></span>`;

    isActive = false;
    onActivation = [];
    onDeactivation = [];

    constructor(
        {
            isActive,
            innerText,
            iconSpriteId,
            onActivation,
            onDeactivation,
            // default color is --primary3 in scss
            activeColor,
            // default bgcolor is --dark1 in scss
            bgcolor
        } = {}
    ) {
        super();
        this._init(this.html)

        this.mainNode.addEventListener('click', () => {
            this.toggle();
        })

        if (iconSpriteId) {
            this.addSvg(iconSpriteId)
        }
        if (innerText) {
            this.addInnerText(innerText)
        }

        if (isActive) {
            this.activate();
        }
        if (activeColor) {
            this.mainNode.style.setProperty('--activecolor', activeColor)
        }
        if (bgcolor) {
            this.mainNode.style.setProperty('--bgcolor', bgcolor)
        }
        if (onActivation) {
            this.addActivationListener(onActivation)
        }
        if (onDeactivation) {
            this.addDeactivationListener(onDeactivation)
        }
    }

    activate() {
        this.mainNode.classList.add('active');
        this.isActive = true;
        for (const func of this.onActivation) {
            func();
        }
    }

    deactivate() {
        this.mainNode.classList.remove('active');
        this.isActive = false;
        for (const func of this.onDeactivation) {
            func();
        }
    }

    toggle() {
        if (this.mainNode.classList.contains('active')) {
            this.deactivate()
        } else {
            this.activate();
        }
    }

    addActivationListener(callback) {
        if (typeof callback === 'function') {
            this.onActivation.push(callback);
            return
        }
        if (Array.isArray(callback)) {
            for (const item of callback) {
                this.addActivationListener(item)
            }
        }
    }

    addDeactivationListener(callback) {
        if (typeof callback === 'function') {
            this.onDeactivation.push(callback);
            return
        }
        if (Array.isArray(callback)) {
            for (const item of callback) {
                this.addDeactivationListener(item)
            }
        }
    }

    addSvg(spriteId) {
        const svgNode = this._prepare(this.svgHtml);
        this.nodes.imgUse.setAttribute('xlink:href', `#${spriteId}`)
        this.mainNode.append(svgNode);
    }

    addInnerText(innerText) {
        const textNode = this._prepare(this.innerTextHtml);
        textNode.textContent = innerText;
        this.mainNode.append(textNode);
    }
}