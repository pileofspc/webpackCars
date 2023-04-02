import Button from 'components/Button/Button';
import Component from 'components/Component/Component';
import Select from 'components/Select/Select';
import ProductCard from 'modules/ProductCard/ProductCard';

import './BookingInfiniteList.scss';
import global from '/src/js/global';
import { getCoords, htmlToElement } from '/src/js/_helpers.js';

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
        this._init(this.html);

        this.initSelects(
            [
                new Select({
                    name: 'Sort',
                    variant: 'bordered',
                    options: [
                        htmlToElement(`<div>Option1Option1Option1Option1Option1Option1</div>`),
                        htmlToElement(`<div>Option2Option2Option2Option2Option2Option2</div>`),
                        htmlToElement(`<div>Option3Option3Option3Option3Option3Option3</div>`),
                        htmlToElement(`<div>Option4Option4Option4Option4Option4Option4</div>`),
                        htmlToElement(`<div>Option5Option5Option5Option5Option5Option5</div>`),
                    ]
                }),
                new Select({
                    name: 'Category',
                    variant: 'bordered',
                })
            ]
        );

        const viewButton = new Button({
            id: 'view-type',
            iconPath: '../assets/img/view-type.svg'
        });
        viewButton.mainNode.classList.add('inf-list__button');
        viewButton.nodes.img.classList.add('inf-list__button-img');

        const filterButton = new Button({
            id: 'filter',
            iconPath: '../assets/img/filter.svg'
        });
        filterButton.mainNode.classList.add('inf-list__button');
        filterButton.nodes.img.classList.add('inf-list__button-img');

        this.nodes.buttons.append(
            viewButton.mainNode,
            filterButton.mainNode
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
    }

    addCards(amount) {
        let cards = this.api.queryMultiple(amount);
        if (cards) {
            for (const card of cards) {
                this.nodes.list.append(new ProductCard(card));
            }
        }
    }

    initSelects(selectsArray) {
        this.selects = selectsArray;

        for (let i = 0; i < selectsArray.length; i++) {
            const item = selectsArray[i];

            item.addListener('click', () => {
                this.closeOtherSelects(item)
            })
            this.nodes.selects.append(item.mainNode)
        }
    }

    closeOtherSelects(current) {
        for (let i = 0; i < this.selects.length; i++) {
            const item = this.selects[i];
            
            if (this.selects[i].isOpen === true && this.selects[i] !== current) {
                this.selects[i].close()
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