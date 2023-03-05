export default class Component {
    collectNodes() {
        this.controlledNodes = {};
        for (const node of this.node.querySelectorAll('[data-id]')) {
            this.controlledNodes[node.getAttribute('data-id')] = node
            node.removeAttribute('data-id');
        }
    }
}