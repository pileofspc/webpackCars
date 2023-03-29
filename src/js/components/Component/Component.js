import { htmlToElement } from '/src/js/_helpers';

export default class Component {
    static idAttr = 'data-node-id';

    constructor({
        html
    } = {}) {
        this._init(html)
    }
    
    _init(html) {
        // Создаем мейн ноду и собираем нужные ноды в this.nodes
        this.mainNode = htmlToElement(html);
        this.nodes = {};
        for (const node of this.mainNode.querySelectorAll(`[${Component.idAttr}]`)) {
            this.nodes[node.getAttribute(Component.idAttr)] = node
            node.removeAttribute(Component.idAttr);
        }
        this.mainNode.nodes = this.nodes;
    }
}