import './ProductCard.scss';
import global from '/src/js/global';

import Component from '@components/Component/Component';

import statAmountSvgPath from '@img/product-card_amount.svg';
import statTransmissionSvgPath from '@img/product-card_transmission.svg';
import heartSvg from '@img/icon_heart.svg?sprite';
import heartActiveSvg from '@img/icon_heart-active.svg?sprite';
import ButtonToggle from "@components/ButtonToggle/ButtonToggle";


export default class ProductCard extends Component {
    html = 
        `<div class="product-card">
            <div class="product-card__top-bar">
                <span class="product-card__name" ${Component.idAttr}="name">Porshe 718 Cayman S</span>
                <div ${Component.idAttr}="buttons"></div>
            </div>
            <div class="product-card__type" ${Component.idAttr}="type">Sport Coupe</div>
            <img class="product-card__img" alt="Car" ${Component.idAttr}="img">
            <div class="product-card__bottom-bar">
                <div class="product-card__stat">
                    <img class="product-card__stat-icon" src="${statAmountSvgPath}" alt="Amount">
                    <span class="product-card__stat-value" ${Component.idAttr}="amount">4</span>
                </div>
                <div class="product-card__stat">
                    <img class="product-card__stat-icon" src="${statTransmissionSvgPath}" alt="Transmission">
                    <span class="product-card__stat-value" ${Component.idAttr}="transmissions">Manual</span>
                </div>
                <div class="product-card__stat">
                    <span class="product-card__stat-value" ${Component.idAttr}="rentCost">$400/d</span>
                </div>
            </div>
        </div>`;



    api = new Api();
    controls = {};

    constructor({
        id,
        itemName,
        img,
        rentCost,
        type,
        transmission,
        amount,
    } = {}) {
        super();
        this._init(this.html);

        this.nodes.name.textContent = itemName;
        if (this.api.check(id)) {
            this.activateHeart()
        }
        this.nodes.type.textContent = type;
        this.nodes.img.setAttribute('src', img);
        this.nodes.amount.textContent = amount;
        this.nodes.transmissions.textContent = transmission;
        this.nodes.rentCost.textContent = `\$${rentCost}/d`;

        // this.nodes.heartButton.addEventListener('click', () => {
        //     if (!this.api.check(id)) {
        //         this.api.setFavorite(id);
        //         this.activateHeart();
        //     } else {
        //         this.api.removeFavorite(id);
        //         this.deactivateHeart();
        //     }
        // })

        this.initButtons(
            [
                new ButtonToggle(
                    {
                        iconSpriteId: heartSvg.id,
                        onActivation: () => {
                            this.activateHeart();
                        }
                    }
                )
            ]
        );
    }

    activateHeart() {
        this.nodes.heart.setAttribute('src', heartActiveSvg);
    }

    deactivateHeart() {
        this.nodes.heart.setAttribute('src', heartSvg);
    }

    initButtons(buttonsArray) {
        this.controls.buttons = buttonsArray;
        for (const button of buttonsArray) {
            this.nodes.buttons.append(button.mainNode)
        }
    }
}

class Api {
    global = global;

    setFavorite(id) {
        this.global.database.userFavoriteCars.add(id);
    }

    removeFavorite(id) {
        this.global.database.userFavoriteCars.delete(id);
    }

    check(id) {
        return this.global.database.userFavoriteCars.has(id);
    }
}


// <button className="button button_bgcolor_transparent product-card__favorite" ${Component.idAttr}="heartButton">
//     <img className="product-card__favorite-img" src="${heartSvg}" alt="Favorite" ${Component.idAttr}="heart">
// </button>