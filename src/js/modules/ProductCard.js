import Component from '/src/js/components/component'
import { htmlToElement } from '/src/js/_helpers.js';
import global from '/src/js/global';

export default class ProductCard extends Component {
    constructor({
        id,
        itemName,
        img,
        rentCost,
        type,
        transmission,
        amount,
    }) {
        super();

        this.api = new Api();
        this.html = 
            `<div class="product-card">
                <div class="product-card__top-bar">
                    <span class="product-card__name" data-id="nameNode">Porshe 718 Cayman S</span>
                    <button class="button button_bgcolor_transparent product-card__favorite" data-id="heartButtonNode">
                        <img class="product-card__favorite-img" src="../assets/img/heart.svg" alt="Favorite" data-id="heartNode">
                    </button>
                </div>
                <div class="product-card__type" data-id="typeNode">Sport Coupe</div>
                <img class="product-card__img" src="../assets/img/car_id_1.png" alt="Car" data-id="imgNode">
                <div class="product-card__bottom-bar">
                    <div class="product-card__stat">
                        <img class="product-card__stat-icon" src="../assets/img/product-card_amount.svg" alt="Amount">
                        <span class="product-card__stat-value" data-id="amountNode">4</span>
                    </div>
                    <div class="product-card__stat">
                        <img class="product-card__stat-icon" src="../assets/img/product-card_transmission.svg" alt="Transmission">
                        <span class="product-card__stat-value" data-id="transmissionNode">Manual</span>
                    </div>
                    <div class="product-card__stat">
                        <span class="product-card__stat-value" data-id="rentCostNode">$400/d</span>
                    </div>
                </div>
            </div>`
        this.node = htmlToElement(this.html);

        this.collectNodes();

        this.controlledNodes.nameNode.textContent = itemName;
        if (this.api.check(id)) {
            this.activateHeart()
        }
        this.controlledNodes.typeNode.textContent = type;
        this.controlledNodes.imgNode.setAttribute('src', img);
        this.controlledNodes.amountNode.textContent = amount;
        this.controlledNodes.transmissionNode.textContent = transmission;
        this.controlledNodes.rentCostNode.textContent = `\$${rentCost}/d`;

        this.controlledNodes.heartButtonNode.addEventListener('click', () => {
            if (!this.api.check(id)) {
                this.api.setFavorite(id);
                this.activateHeart();
            } else {
                this.api.removeFavorite(id);
                this.deactivateHeart();
            }
        })

        return this.node
    }

    activateHeart() {
        this.controlledNodes.heartNode.setAttribute('src', '../assets/img/heart-active.svg');
    }

    deactivateHeart() {
        this.controlledNodes.heartNode.setAttribute('src', '../assets/img/heart.svg');
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