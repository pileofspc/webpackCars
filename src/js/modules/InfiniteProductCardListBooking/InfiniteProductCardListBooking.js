import Component from '@components/Component/Component';
import InfiniteProductCardList from '@modules/InfiniteProductCardList/InfiniteProductCardList';
import ButtonToggle from '@components/ButtonToggle/ButtonToggle';
import DropdownSelectOne from "@components/DropdownSelectOne/DropdownSelectOne";
import DropdownSelectMultiple from "@components/DropdownSelectMultiple/DropdownSelectMultiple";
import Modal from '@components/Modal/Modal';

import global from '/src/js/global';

import filterSvg from '@img/button_filter.svg?sprite';
import viewModeSvg from '@img/button_view-mode.svg?sprite';

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
                new DropdownSelectOne({
                    name: 'Sort',
                    variant: 'bordered',
                    selectOptions: [
                        {label: 'Oldest', onSelected: 'делать что то'},
                        {label: 'Newest', onSelected: 'делать что то'},
                        {label: 'High Price', onSelected: 'делать что то'},
                        {label: 'Low Price', onSelected: 'делать что то'},
                    ],
                    cleanup: 'общая уборка'
                }),
                new DropdownSelectMultiple({
                    name: 'Categories',
                    variant: 'bordered',
                    selectOptions: [
                        {label: 'Manual Transmission', onSelected: 'делать что то', cleanup: 'убрать за собой'},
                        {label: 'Auto Transmission', onSelected: 'делать что то', cleanup: 'убрать за собой'},
                        {label: 'Coupe', onSelected: 'делать что то', cleanup: 'убрать за собой'},
                        {label: 'Sport Coupe', onSelected: 'делать что то', cleanup: 'убрать за собой'},
                    ]
                })
            ]
        );

        this.initButtons(
            [
                new ButtonToggle({
                    id: 'view-type',
                    iconSpriteId: viewModeSvg.id,
                    onActivation() {
                        console.log(123)
                    }
                }),
                new ButtonToggle({
                    id: 'filter',
                    // iconSpriteId: filterSvg.id,
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
                    this.closeAllSelects();
                }
            })
            this.nodes.selects.append(item.mainNode);
        }
    }

    initButtons(buttonsArray) {
        this.buttons = buttonsArray;

        for (let i = 0; i < buttonsArray.length; i++) {
            const item = buttonsArray[i];

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

    closeAllSelects() {
        this.closeSelectsExcept(null)
    }

    isEventInsideSelects(e) {
        for (let item of this.selects) {
            if (item.mainNode.contains(e.target)) {
                return true
            }
        }
        return false;
    }
}