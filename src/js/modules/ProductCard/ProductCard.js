import './ProductCard.scss';
import global from '/src/js/global';

import Component from 'components/Component/Component';

export default class ProductCard extends Component {
    api = new Api();

    constructor({
        html = 
            `<div class="product-card">
                <div class="product-card__top-bar">
                    <span class="product-card__name" ${Component.idAttr}="name">Porshe 718 Cayman S</span>
                    <button class="button button_bgcolor_transparent product-card__favorite" ${Component.idAttr}="heartButton">
                        <img class="product-card__favorite-img" src="../assets/img/heart.svg" alt="Favorite" ${Component.idAttr}="heart">
                    </button>
                </div>
                <div class="product-card__type" ${Component.idAttr}="type">Sport Coupe</div>
                <img class="product-card__img" src="../assets/img/car_id_1.png" alt="Car" ${Component.idAttr}="img">
                <div class="product-card__bottom-bar">
                    <div class="product-card__stat">
                        <img class="product-card__stat-icon" src="../assets/img/product-card_amount.svg" alt="Amount">
                        <span class="product-card__stat-value" ${Component.idAttr}="amount">4</span>
                    </div>
                    <div class="product-card__stat">
                        <img class="product-card__stat-icon" src="../assets/img/product-card_transmission.svg" alt="Transmission">
                        <span class="product-card__stat-value" ${Component.idAttr}="transmissions">Manual</span>
                    </div>
                    <div class="product-card__stat">
                        <span class="product-card__stat-value" ${Component.idAttr}="rentCost">$400/d</span>
                    </div>
                </div>
            </div>`,
        id,
        itemName,
        img,
        rentCost,
        type,
        transmission,
        amount,
    }) {
        super({
            html
        });

        this.nodes.name.textContent = itemName;
        if (this.api.check(id)) {
            this.activateHeart()
        }
        this.nodes.type.textContent = type;
        this.nodes.img.setAttribute('src', img);
        this.nodes.amount.textContent = amount;
        this.nodes.transmissions.textContent = transmission;
        this.nodes.rentCost.textContent = `\$${rentCost}/d`;

        this.nodes.heartButton.addEventListener('click', () => {
            if (!this.api.check(id)) {
                this.api.setFavorite(id);
                this.activateHeart();
            } else {
                this.api.removeFavorite(id);
                this.deactivateHeart();
            }
        })

        return this.mainNode
    }

    activateHeart() {
        this.nodes.heart.setAttribute('src', '../assets/img/heart-active.svg');
    }

    deactivateHeart() {
        this.nodes.heart.setAttribute('src', '../assets/img/heart.svg');
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