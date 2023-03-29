import Component from "components/Component";
import './Select.scss';
import { htmlToElement } from '/src/js/_helpers';

export default class Select extends Component {
    static idAttr = 'data-select-id';

    childId = 1;
    isOpen = false;

    constructor({
        html = 
            `<a class="link select" href="#">
                <span class="select__value" ${Component.idAttr}="value"></span>
                <div class="arrow select__arrow" ${Component.idAttr}="arrow"></div>
                <div class="select__window" ${Component.idAttr}="selectWindow">
                    <form class="select__form" action="" ${Component.idAttr}="form"></form>
                </div>
            </a>`,
        name = 'Select',
        options = [htmlToElement('<div>No options yet :(</div>')],
        isRightSided = false,
        variant,
    } = {}) {
        super({
            html
        });

        this.addListener('click', this.toggle)

        this.nodes.value.textContent = name;
        if (isRightSided) {
            this.mainNode.classList.add('select_right')
        } 
        if (variant === 'bordered') {
            this.mainNode.classList.add('select_bordered')
        }
        this.populate(options);

        // TODO: Возможно вынести стрелку в отдельный компонент, а если не выносить, то добавить в общие стили
    }

    open() {
        // TODO: Пересмотреть класс, т.к получается, что селект знает о поведении стрелки (оно описано в стилях)
        this.nodes.arrow.classList.add('arrow_open');
        this.nodes.selectWindow.classList.add('select__window_open');
        this.isOpen = true;
    }

    close() {
        // TODO: Пересмотреть класс, т.к получается, что селект знает о поведении стрелки (оно описано в стилях)
        this.nodes.arrow.classList.remove('arrow_open');
        this.nodes.selectWindow.classList.remove('select__window_open');
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
        this.clear()
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
            if (!this.nodes.selectWindow.contains(e.target)) {
                callback.apply(this)
            }
        };

        this.mainNode.addEventListener(type, listener);
    }

    removeDefaultOnClick() {
        this.mainNode.removeEventListener('click', this.toggle)
    }
}