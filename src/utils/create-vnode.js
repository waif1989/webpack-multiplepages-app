/**
 * Created by ccw on 2017/8/11.
 * Create vnode
 */
function createVnode(type, props, functionProps, selfClosing, nodeType) {
    var childrens = [].slice.call(arguments, 5)
    return { type: type, props: props, functionProps: functionProps, selfClosing: selfClosing, nodeType: nodeType, children: childrens }
}

module.exports = { createVnode }