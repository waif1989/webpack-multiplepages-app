/**
 * Created by ccw on 2017/8/11.
 * Change vnode to rnode
 */
function createRealnode (node) {
    if (typeof node === 'string') {
        return document.createTextNode(node)
    }
    var $el = document.createElement(node.type)
    node.children
        .map(createRealnode)
        .forEach($el.appendChild.bind($el))
    return $el
}

module.exports = { createRealnode }