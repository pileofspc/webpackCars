import Component from "@components/Component/Component";
import DropdownSelectOne from "@components/DropdownSelectOne/DropdownSelectOne";
import Checkbox from "@components/Checkbox/Checkbox";

import './DropdownSelectMultiple.scss';

export default class DropdownSelectMultiple extends DropdownSelectOne {
    html =
        `<div class="dropdown__controls">
            <button class="button dropdown__button dropdown__reset" ${Component.idAttr}="reset">Reset</button>
            <button class="button dropdown__button dropdown__apply" ${Component.idAttr}="apply">Apply</button>
        </div>`

    constructor(
        {
            name = 'DropdownSelectMultiple',
            children = null,
            isRightSided = false,
            variant,

            selectOptions = [],
        } = {}
    ) {
        super({
            name,
            children,
            isRightSided,
            variant,
            selectOptions
        });

        this._initAdditional(this.html);

        this.nodes.reset.addEventListener('click', () => {
            this.uncheckOptions();
        })

        this.nodes.apply.addEventListener('click', () => {
            this.applyOptions();
        })
    }

    addOption(optionData) {
        let option = new Checkbox({
            label: optionData.label,
            groupName: this.selectName
        });
        this.setId(option);
        this.selectOptions.push(option);
        option.nodes.input.addEventListener('change', () => {
            if (option.nodes.input.checked) {
                optionData.onSelected();
            } else {
                optionData.cleanup();
            }
        });

        this.nodes.selectOptions.append(option.mainNode);
    }

    uncheckOptions() {
        for (const option of this.selectOptions) {
            option.uncheck();
        }
    }

    applyOptions() {
        this.close()
    }
}