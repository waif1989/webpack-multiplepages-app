/**
 * Created by ccw on 2017/8/11.
 * Change vnode to rnode
 */
function createRealnode (node) {
    if (typeof node === 'string') {
        return document.createTextNode(node)
    }
    var $el = document.createElement(node.type)
    for (var i in node.props) {
        switch (i) {
            case 'class':
                $el.className = node.props[i]
                break
            case 'id':
                $el.id = node.props[i]
                break
            default:
                $el.setAttribute(i, node.props[i])
                break
        }
    }
    node.children
        .map(createRealnode)
        .forEach($el.appendChild.bind($el))
    return $el
}

module.exports = { createRealnode }