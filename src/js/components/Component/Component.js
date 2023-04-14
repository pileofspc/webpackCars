import { htmlToFragment, htmlToElement } from '/src/js/_helpers';

export default class Component {
    static idAttr = 'data-node-id';
    
    _init(html) {
        if (!html) {
            console.error('В Component не поступила строка html');
            return
        }

        // Создаем мейн ноду и собираем нужные ноды в this.nodes
        this.mainNode = htmlToElement(html);
        this.nodes = {};
        this._collectNodes(this.mainNode);
        this.mainNode.nodes = this.nodes;
    }

    _collectNodes(fromNode) {
        for (const node of fromNode.querySelectorAll(`[${Component.idAttr}]`)) {
            this.nodes[node.getAttribute(Component.idAttr)] = node
            node.removeAttribute(Component.idAttr);
        }
    }

    _fragment(html) {
        return htmlToFragment(html);
    }

    _element(html) {
        return htmlToElement(html);
    }
}