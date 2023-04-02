import Component from 'components/Component/Component';

export default class ErrorDiv extends Component {
    html =
        `<div>Произошла ошибка!</div>`;
    constructor(text, userText) {
        super();
        this._init(this.html);

        if (userText) {
            this.mainNode.textContent = userText;
        }

        console.error(text);
    }
}