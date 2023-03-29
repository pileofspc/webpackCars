import Component from 'components/Component';
import ProductCard from 'modules/ProductCard';

import './InfiniteProductCardList.scss';
import { getCoords } from '/src/js/_helpers.js';

export default class InfiniteProductCardList extends Component {
    constructor({
        html = 
            `<div class="infinite-product-card-list">
                <div class="infinite-product-card-list__list" ${Component.idAttr}="list"></div>
            </div>`,
        initialAmount,
        addedAmount,
        backendEndpoint
    } = {}) {
        super({
            html,
        });
        
        this.api = new Api(backendEndpoint)

        this.addCards(initialAmount);
        
        window.addEventListener('scroll', (e) => {
            let top = document.documentElement.scrollTop;
            let bottom = document.documentElement.clientHeight + top;
            let listBottom = getCoords(this.mainNode).bottom;

            if (listBottom - bottom < 50) {
                this.addCards(addedAmount);
            }
        });
    }

    addCards(amount) {
        let cards = this.api.queryMultiple(amount);
        if (cards) {
            for (const card of cards) {
                this.nodes.list.append(new ProductCard(card));
            }
        }
    }
}

class Api {
    currentIndex = 0;

    constructor(backendEndpoint) {
        this.database = backendEndpoint
    }

    query(id) {
        return this.database.find(item => item.id === id)
    }

    queryMultiple(amount) {
        if (this.currentIndex > this.database.length) {
            return
        }

        let result = this.database.slice(this.currentIndex, this.currentIndex + amount);
        this.currentIndex += amount;
        return  result;
    }
}