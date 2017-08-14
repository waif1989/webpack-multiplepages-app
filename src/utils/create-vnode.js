/**
 * Created by ccw on 2017/8/11.
 * Create vnode
 */
function createVnode(type, props, selfClosing, nodeType) {
    var childrens = [].slice.call(arguments, 4)
    return { type: type, props: props, selfClosing: selfClosing, nodeType: nodeType, children: childrens }
}

module.exports = { createVnode }