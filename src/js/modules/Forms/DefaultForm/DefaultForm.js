import Component from 'components/Component/Component';
import './FormSensorsSeeAll.scss';

export default class FormSensorsSeeAll extends Component {
    html =
        `<form></form>`;
    constructor({
        action = '',
        children
    } = {}) {
        super();
        this._init(this.html);

        this.mainNode.setAttribute('action', action);

        if (children) {
            this.mainNode.append(children);
        }
    }
}


class FormGroup extends Component {
    html =
        ``;
    constructor() {
        super();
        this._init(this.html);

        
    }
}