import {toCamelCase, uuid} from "/src/js/_helpers";
import Dropdown from "@components/Dropdown/Dropdown";
import './DropdownSelectOne.scss';

import RadioButton from "@components/RadioButton/RadioButton";
import Component from "@components/Component/Component";

export default class DropdownSelectOne extends Dropdown {
    static idField = 'selectId';

    selectName;
    selectOptions = [];
    contentsHtml =
        `<div class="dropdown__options" ${Component.idAttr}="selectOptions"></div>`

    constructor({
        name = 'DropdownSelectOne',
        children = null,
        isRightSided = false,
        variant,

        selectOptions = [],
        cleanup,
    } = {}) {
        super({
            name, children, isRightSided, variant
        });
        // const contents = this._element(this.contentsHtml);
        // this.nodes.appendHere.append(contents);
        // this._collectAll(this.mainNode);
        this._initAdditional(this.contentsHtml);

        this.selectName = toCamelCase(name);
        this.cleanup = cleanup;
        this.acceptOptions(selectOptions);
    }

    clear() {
        this.nodes.selectOptions.innerHtml = null;
    }

    acceptOptions(selectOptions) {
        this.clear();
        for (let option of selectOptions) {
            this.addOption(option)
        }
    }

    addOption(optionData) {
        let option = new RadioButton({
            label: optionData.label,
            groupName: this.selectName
        });
        this.setId(option);
        this.selectOptions.push(option);
        option.nodes.input.addEventListener('change', () => {

            this.cleanup();
            optionData.onSelected();

            setTimeout(() => {
                this.close()
            }, 200)
        });

        this.nodes.selectOptions.append(option.mainNode);
    }

    setId(option) {
        option[this.constructor.idField] = uuid();
    }

    removeOption(id) {
        let toRemove = this.selectOptions.find(option => option[this.constructor.idField] === id);
        this.selectOptions = this.selectOptions.filter(option => option !== toRemove);
        toRemove.mainNode.remove();
    }

    resetIds() {
        for (let option of this.selectOptions) {
            this.setId(option)
        };
    }
}