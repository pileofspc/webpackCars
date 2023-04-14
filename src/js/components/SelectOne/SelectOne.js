import Component from "components/Component/Component";
import { htmlToElement } from '/src/js/_helpers';
import './SelectOne.scss';

export default class SelectOne extends Component {
    static idAttr = 'data-select-id';

    html = 
        `<div class="select select_one">
            <span class="select__value" ${Component.idAttr}="value"></span>
            <div class="arrow select__arrow" ${Component.idAttr}="arrow"></div>
            <div class="select__window" ${Component.idAttr}="window">
                <form class="select__form" action="" ${Component.idAttr}="form"></form>
            </div>
        </div>`;

    childId = 1;
    isOpen = false;

    constructor({
        name = 'Select',
        options = [htmlToElement('<div>No options yet :(</div>')],
        isRightSided = false,
        variant,
    } = {}) {
        super();
        this._init(this.html);

        this.addListener('click', this.toggle)

        this.nodes.value.textContent = name;
        if (isRightSided) {
            this.mainNode.classList.add('select_right')
        };
        if (variant === 'bordered') {
            this.mainNode.classList.add('select_bordered')
        };
        this.populate(options);

        // TODO: Возможно вынести стрелку в отдельный компонент, а если не выносить, то добавить в общие стили
    }

    open() {
        // TODO: Пересмотреть класс, т.к получается, что селект знает о поведении стрелки (оно описано в стилях)
        this.nodes.arrow.classList.add('arrow_open');
        this.nodes.window.classList.add('select__window_open');
        this.isOpen = true;
    }

    close() {
        // TODO: Пересмотреть класс, т.к получается, что селект знает о поведении стрелки (оно описано в стилях)
        this.nodes.arrow.classList.remove('arrow_open');
        this.nodes.window.classList.remove('select__window_open');
        this.isOpen = false;
    }

    toggle() {
        if (this.isOpen) {
            this.close()
        } else {
            this.open()
        }
    }

    clear() {
        this.nodes.form.innerHtml = null;
        this.childId = 1;
    }

    populate(options) {
        this.clear();
        for (let option of options) {
            this.addOption(option)
        }
    }

    addOption(option) {
        option.setAttribute(Select.idAttr, this.childId);
        this.childId++;
        this.nodes.form.append(option);
    }

    removeOption(id) {
        this.nodes.form.children.find(item => item.getAttribute(Select.idAttr) === id).remove();
    }

    resetIds() {
        this.childId = 0;
        for (let option of this.nodes.form.children) {
            option.setAttribute(Select.idAttr, this.childId);
            this.childId++;
        } 
    }

    addListener(type, callback) {
        let listener = (e) => {
            if (!this.nodes.window.contains(e.target)) {
                callback.apply(this)
            }
        };

        this.mainNode.addEventListener(type, listener);
    }

    removeDefaultOnClick() {
        this.mainNode.removeEventListener('click', this.toggle)
    }
}