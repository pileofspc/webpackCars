import Component from 'components/Component';
import Button from 'components/Button';
import Select from 'components/Select';
import InfiniteProductCardList from 'modules/InfiniteProductCardList';

import './BookingInfiniteProductCardList.scss';
import global from '/src/js/global';
import { htmlToElement } from '/src/js/_helpers.js';

export default class BookingInfiniteProductCardList extends InfiniteProductCardList {
    constructor({
        html = 
            `<div class="inf-list">
                <div class="inf-list__controls">
                    <div class="inf-list__selects" ${Component.idAttr}="selects"></div>
                    <div class="inf-list__buttons" ${Component.idAttr}="buttons"></div>
                </div>
                <div class="inf-list__list" ${Component.idAttr}="list"></div>
            </div>`,
    } = {}) {
        super({
            html,
            initialAmount: 12,
            addedAmount: 6,
            backendEndpoint: global.database.booking
        });

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