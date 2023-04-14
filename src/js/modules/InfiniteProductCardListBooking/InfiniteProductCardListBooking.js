import Component from 'components/Component/Component';
import Button from 'components/Button/Button';
import Select from 'components/Select/Select';
import InfiniteProductCardList from 'modules/InfiniteProductCardList/InfiniteProductCardList';

import global from '/src/js/global';
import Modal from 'components/Modal/Modal';
import RadioButton from 'components/RadioButton/RadioButton';

export default class BookingInfiniteProductCardList extends InfiniteProductCardList {
    html = 
        `<div class="infinite-product-card-list__controls">
            <div class="infinite-product-card-list__selects" ${Component.idAttr}="selects"></div>
            <div class="infinite-product-card-list__buttons" ${Component.idAttr}="buttons"></div>
        </div>`;

    constructor() {
        super({
            initialAmount: 12,
            addedAmount: 6,
            backendEndpoint: global.database.booking
        });

        const controls = this._fragment(this.html);
        this.mainNode.prepend(controls);
        this._collectNodes(this.mainNode);

        this.initSelects(
            [
                new Select({
                    name: 'Sort',
                    variant: 'bordered',
                    options: [
                        new RadioButton({label: 'Oldest', groupName: 'sort'}).mainNode,
                        new RadioButton({label: 'Newest', groupName: 'sort'}).mainNode,
                        new RadioButton({label: 'High Price', groupName: 'sort'}).mainNode,
                        new RadioButton({label: 'Low Price', groupName: 'sort'}).mainNode,
                    ]
                }),
                new Select({
                    name: 'Categories',
                    variant: 'bordered',
                    options: [
                        new RadioButton({label: 'Manual Transmission', groupName: 'sort'}).mainNode,
                        new RadioButton({label: 'Auto Transmission', groupName: 'sort'}).mainNode,
                        new RadioButton({label: 'Coupe', groupName: 'sort'}).mainNode,
                        new RadioButton({label: 'Sport Coupe', groupName: 'sort'}).mainNode,
                    ]
                })
            ]
        );

        this.initButtons(
            [
                new Button({
                    id: 'view-type',
                    iconPath: '/assets/img/view-type.svg',
                    handleClick() {
                        if (this.isActive) {
                            console.log('ACTIVATED')
                        }
                    }
                }),
                new Button({
                    id: 'filter',
                    iconPath: '/assets/img/filter.svg'
                })
            ]
        );
    }

    initSelects(selectsArray) {
        this.selects = selectsArray;

        for (let i = 0; i < selectsArray.length; i++) {
            const item = selectsArray[i];

            item.addListener('click', () => {
                this.closeSelectsExcept(item)
            });
            window.addEventListener('click', (e) => {
                if (!this.isEventInsideSelects(e)) {
                    this.closeSelectsExcept(null);
                }
            })
            this.nodes.selects.append(item.mainNode);
        }
    }

    initButtons(buttonsArray) {
        this.buttons = buttonsArray;

        for (let i = 0; i < buttonsArray.length; i++) {
            const item = buttonsArray[i];

            item.mainNode.classList.add('infinite-product-card-list__button');
            item.nodes.img.classList.add('infinite-product-card-list__button-img');

            this.nodes.buttons.append(item.mainNode)
        }
    }

    closeSelectsExcept(current) {
        for (let i = 0; i < this.selects.length; i++) {
            const item = this.selects[i];
            
            if (this.selects[i].isOpen === true && this.selects[i] !== current) {
                this.selects[i].close()
            }
        }
    }

    isEventInsideSelects(e) {
        for (let i = 0; i < this.selects.length; i++) {
            const item = this.selects[i];
            if (item.mainNode.contains(e.target)) {
                return true
            }
        }
        return false;
    }
}