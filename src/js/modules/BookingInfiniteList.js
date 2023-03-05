import { htmlToElement, getCoords } from '/src/js/_helpers.js';
import Component from '/src/js/components/component';
import Button from '/src/js/components/Button'
import ProductCard from './ProductCard';
import global from '/src/js/global';

export default class BookingInfiniteList extends Component {
    api = new Api();
    constructor() {
        super();

        this.html = 
            `<div class="inf-list" data-id="mainNode">
                <div class="inf-list__controls">
                    <div class="inf-list__selects" data-id="selectsNode"></div>
                    <div class="inf-list__buttons" data-id="buttonsNode"></div>
                </div>
                <div class="inf-list__list"></div>
            </div>`
        this.node = htmlToElement(this.html);

        this.collectNodes();

        this.selects = this.node.querySelector('.inf-list__selects');
        this.buttons = this.node.querySelector('.inf-list__buttons');
        this.list = this.node.querySelector('.inf-list__list');




        // ВРЕМЕННО
        let selectsContent = htmlToElement(
            `<select class="inf-list__select inf-list__select_category">
                <option value="New">New</option>
                <option value="Old">Old</option>
            </select>
            <select class="inf-list__select inf-list__select_company">
                <option value="Toyota">Toyota</option>
                <option value="Subaru">Subaru</option>
            </select>`);
        // let buttonsContent = htmlToElement(
        //     `<button class="button button_bgcolor_dark1 button_round inf-list__button inf-list__view-type-button">
        //         <svg class="inf-list__button-img" data-src="../assets/img/view-type.svg"></svg>
        //     </button>
        //     <button class="button button_bgcolor_dark1 button_round inf-list__button inf-list__filter-button">
        //         <svg class="inf-list__button-img" data-src="../assets/img/filter.svg"></svg>
        //     </button>`);
        this.controlledNodes.selectsNode.append(selectsContent);
        this.controlledNodes.buttonsNode.append(
            new Button({
                id: 'view-type',
                icon: '../assets/img/view-type.svg'
            }),
            new Button({
                id: 'filter',
                icon: '../assets/img/filter.svg'
            })
        );
        // ВРЕМЕННО



        this.addCards(12);
        
        window.addEventListener('scroll', (e) => {
            let top = document.documentElement.scrollTop;
            let bottom = document.documentElement.clientHeight + top;
            let listBottom = getCoords(this.controlledNodes.mainNode).bottom;


            if (listBottom - bottom < 50) {
                this.addCards(6);
            }
        });

        return this.node;
    };

    addCards(amount) {
        let cards = this.api.queryMultiple(amount);
        if (cards) {
            for (const card of cards) {
                this.list.append(new ProductCard(card));
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