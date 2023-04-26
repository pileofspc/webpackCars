import Component from "@components/Component/Component";
import './Dropdown.scss';

export default class Dropdown extends Component {
    html =
        `<div class="dropdown">
            <span class="dropdown__value" ${Component.idAttr}="value"></span>
            <div class="arrow dropdown__arrow" ${Component.idAttr}="arrow"></div>
            <div class="dropdown__window" ${Component.idAttr}="window" ${Component.appendHereAttr}></div>
        </div>`;

    isOpen = false;

    constructor(
        {
            name = 'Dropdown',
            children = null,
            isRightSided = false,
            variant,
        } = {}
    ) {
        super();
        this._init(this.html);

        this.addListener('click', this.toggle)

        this.nodes.value.textContent = name;
        if (isRightSided) {
            this.mainNode.classList.add('dropdown_right')
        };
        if (variant === 'bordered') {
            this.mainNode.classList.add('dropdown_bordered')
        };

        this._acceptChildren(children);
        // TODO: Возможно вынести стрелку в отдельный компонент, а если не выносить, то добавить в общие стили
    }
    open() {
        // TODO: Пересмотреть класс, т.к получается, что селект знает о поведении стрелки (оно описано в стилях)
        this.nodes.arrow.classList.add('arrow_open');
        this.nodes.window.classList.add('dropdown__window_open');
        this.isOpen = true;
    }

    close() {
        // TODO: Пересмотреть класс, т.к получается, что селект знает о поведении стрелки (оно описано в стилях)авппппппппппппппппппппппппппппппппппппппппппппппппп ававры ваыр ваыр ывар
        this.nodes.arrow.classList.remove('arrow_open');
        this.nodes.window.classList.remove('dropdown__window_open');
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
        this.nodes.appendHere.innerHtml = null;
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