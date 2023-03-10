import Component from "components/Component/Component";

export default class Select extends Component {
    isOpen = false;
    html = 
        `<a class="link select" href="#">
            <span class="select__value">Assets</span>
            <div class="arrow select__arrow" ${Component.idAttr}="arrow"></div>
            <div class="select__window" ${Component.idAttr}="selectWindow">
                <form class="select__form" action="" ${Component.idAttr}="form"></form>
            </div>
        </a>`;
    constructor() {
        super();
        this.init();

        // `<div class="sensor sensors__sensor">
        //     <label class="sensor__label">
        //         <input class="checkbox sensor__checkbox" type="checkbox" name="fuel">
        //             <div class="custom-checkbox custom-checkbox_bgcolor_secondary1 sensor__custom-checkbox">
        //                 <svg class="custom-checkbox__checkmark" data-src="assets/img/checkmark.svg"></svg>
        //             </div>
        //             <span class="sensor__label-text">Asset</span><span class="sensor__unit">(km)</span>
        //     </label>
        //     <a href="#" class="sensor__graphic">
        //         <svg class="sensor__graphic-svg" data-src="assets/img/sensor__graphic-svg.svg"></svg>
        //     </a>
        // </div>`

        this.nodes.selectWindow.style.visibility = 'hidden';

        this.nodes.selectWindow.ontransitionend = () => {
            if (!this.isOpen) {
                this.nodes.selectWindow.style.visibility = 'hidden';
            }
        };
        this.nodes.selectWindow.ontransitionstart = () => {
            if (this.isOpen) {
                this.nodes.selectWindow.style.visibility = 'visible';
            }
        };

        this.mainNode.addEventListener('click', (e) => {
            // if (!this.nodes.selectWindow.contains(e.target)) {
                if (this.isOpen) {
                    this.close();
                } else {
                    this.open();
                }
            // }
        });

        return this.mainNode;
    }

    open() {
        this.nodes.arrow.classList.add('arrow_open');
        this.nodes.selectWindow.classList.add('select_open');
        this.isOpen = true;
    }

    close() {
        this.nodes.arrow.classList.remove('arrow_open');
        this.nodes.selectWindow.classList.remove('select_open');
        this.isOpen = false;
    }
}