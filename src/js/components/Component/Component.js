import { uuid, htmlToFragment, htmlToElement } from '/src/js/_helpers';

export default class Component {
    static idAttr = 'data-node-id';
    static appendHereAttr = 'data-append-here';

    children = [];
    nodes = {};
    
    _init(html) {
        if (!html) {
            console.error('В Component не поступила строка html');
            return
        }

        // Создаем мейн ноду и собираем нужные ноды в this.nodes
        this.mainNode = this._element(html);
        this._collectNodes(this.mainNode);
        this._collectAppendNode(this.mainNode);

        this.mainNode.INSTANCE_REFERENCE = this;
    }

    _initAdditional(html) {
        let additionalNode = this._element(html);
        this._collectNodes(additionalNode);
        this._append(additionalNode);
        this._collectAppendNode(additionalNode);

        return additionalNode
    }

    _collectNodes(fromNode) {
        let collectedNodes = Array.from(fromNode.querySelectorAll(`[${Component.idAttr}]`));
        if (fromNode !== this.mainNode && fromNode.getAttribute(Component.idAttr)) {
            collectedNodes.push(fromNode)
        }
        if (collectedNodes.length === 0) {
            return
        }

        for (const node of collectedNodes) {
            if (this.nodes[node.getAttribute(Component.idAttr)]) {
                console.warn(
                    `Нода "${node.getAttribute(Component.idAttr)}" asd экземпляра класса ${this.constructor.name} перезаписана!`
                )
            }
            this.nodes[node.getAttribute(Component.idAttr)] = node
            node.removeAttribute(Component.idAttr);
        }
    }

    _collectAppendNode(fromNode) {
        let collectedNode = fromNode.querySelector(`[${Component.appendHereAttr}]`);
        if (!collectedNode && fromNode.hasAttribute(Component.appendHereAttr)) {
            collectedNode = fromNode
        }
        if (!collectedNode) {
            return
        }

        this.nodes.appendHere = collectedNode;
        this.nodes.appendHere.removeAttribute(Component.appendHereAttr);
    }

    _fragment(html) {
        return htmlToFragment(html);
    }

    _element(html) {
        return htmlToElement(html);
    }

    _acceptChildren(children) {
        if (!children) {
            return
        }

        for (const child of children) {
            child.id = uuid();
            this.children.push(child)
        }
        if (this.nodes.appendHere) {
            this._appendChildren()
        }
    }

    _appendChildren() {
        for (const child of this.children) {
            this.nodes.appendHere.append(child.mainNode)
        }
    }

    _append(element) {
        this.nodes.appendHere?.append(element)
    }

    _removeChild(id) {
        let toRemove = this.children.find(child => child.id === id);
        if (!toRemove) {
            return
        }
        toRemove.mainNode.remove();
        this.children = this.children.filter(child => child !== toRemove);
    }

    _removeAllChildren() {
        for (const child of this.children) {
            child.mainNode?.remove();
        }
        this.children = [];
    }
}