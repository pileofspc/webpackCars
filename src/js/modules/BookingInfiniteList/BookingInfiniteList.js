import Button from 'components/Button/Button';
import Component from 'components/Component/Component';
import Select from 'components/Select/Select';
import ProductCard from 'modules/ProductCard/ProductCard';

import './BookingInfiniteList.scss';
import global from '/src/js/global';
import { getCoords } from '/src/js/_helpers.js';

export default class BookingInfiniteList extends Component {
    api = new Api();
    html = 
        `<div class="inf-list">
            <div class="inf-list__controls">
                <div class="inf-list__selects" ${Component.idAttr}="selects"></div>
                <div class="inf-list__buttons" ${Component.idAttr}="buttons"></div>
            </div>
            <div class="inf-list__list" ${Component.idAttr}="list"></div>
        </div>`;
    constructor() {
        super();
        this.init();

        let firstSelect = new Select();
        this.nodes.selects.append(firstSelect);
        
        const viewButton = new Button({
            id: 'view-type',
            icon: '../assets/img/view-type.svg'
        });
        viewButton.classList.add('inf-list__button');
        viewButton.nodes.img.classList.add('inf-list__button-img');

        const filterButton = new Button({
            id: 'filter',
            icon: '../assets/img/filter.svg'
        });
        filterButton.classList.add('inf-list__button');
        filterButton.nodes.img.classList.add('inf-list__button-img');

        this.nodes.buttons.append(
            viewButton,
            filterButton
        );


        this.addCards(12);
        
        window.addEventListener('scroll', (e) => {
            let top = document.documentElement.scrollTop;
            let bottom = document.documentElement.clientHeight + top;
            let listBottom = getCoords(this.mainNode).bottom;


            if (listBottom - bottom < 50) {
                this.addCards(6);
            }
        });
        
        return this.mainNode;
    };

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
    database = global.database.booking;
    currentIndex = 0;

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