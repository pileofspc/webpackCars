import Component from '@components/Component/Component';
import './ButtonFavorite.scss';
import ButtonToggle from "@components/ButtonToggle/ButtonToggle";

export default class ButtonFavorite extends ButtonToggle {
    constructor(
        {
            isActive,
            innerText,
            iconSpriteId,
            activeIconSpriteId,
            onActivation,
            onDeactivation,
            // default color is --primary3 in scss
            activeColor,
            // default bgcolor is --dark1 in scss
            bgcolor
        } = {}
    ) {
        super(arguments);

        this.iconSpriteId = iconSpriteId;
        this.activeIconSpriteId = activeIconSpriteId;
    }

    activate() {
        super.activate();
        this.nodes.imgUse.setAttribute('xlink:href', this.activeIconSpriteId);
    }

    deactivate() {
        super.deactivate();
        this.nodes.imgUse.setAttribute('xlink:href', this.iconSpriteId);
    }

    // toggle() {
    //     if (this.mainNode.classList.contains('active')) {
    //         this.deactivate()
    //     } else {
    //         this.activate();
    //     }
    // }

    // addActivationListener(callback) {
    //     if (typeof callback === 'function') {
    //         this.onActivation.push(callback);
    //         return
    //     }
    //     if (Array.isArray(callback)) {
    //         for (const item of callback) {
    //             this.addActivationListener(item)
    //         }
    //     }
    // }

    // addDeactivationListener(callback) {
    //     if (typeof callback === 'function') {
    //         this.onDeactivation.push(callback);
    //     }
    //     if (Array.isArray(callback)) {
    //         for (const item of callback) {
    //             this.addDeactivationListener(item)
    //         }
    //     }
    // }

    // addSvg(spriteId) {
    //     const svgHtml =
    //         `<svg class="button1__img" ${Component.idAttr}="img">
    //             <use xlink:href="#${spriteId}" ${Component.idAttr}="imgUse"></use>
    //         </svg>`;
    //     const svgNode = this._prepare(svgHtml);
    //     this.mainNode.append(svgNode);
    // }
    //
    // addInnerText(innerText) {
    //     const innerTextHtml = `<span class="button1__inner-text" ${Component.idAttr}="innerText">${innerText}</span>`;
    //     const textNode = this._prepare(innerTextHtml);
    //     this.mainNode.append(textNode);
    // }
}