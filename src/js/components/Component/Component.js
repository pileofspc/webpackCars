import { htmlToElement } from '/src/js/_helpers';

export default class Component {
    static idAttr = 'data-nid';
    
    init() {
        this.mainNode = htmlToElement(this.html);
        this.nodes = {};
        for (const node of this.mainNode.querySelectorAll(`[${Component.idAttr}]`)) {
            this.nodes[node.getAttribute(Component.idAttr)] = node
            node.removeAttribute(Component.idAttr);
        }
        this.mainNode.nodes = this.nodes;
    }
}