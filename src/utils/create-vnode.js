/**
 * Created by ccw on 2017/8/11.
 * Create vnode
 */
function createVnode(type, props) {
    var childrens = [].slice.call(arguments, 2)
    return { type: type, props: props, children: childrens }
}

module.exports = { createVnode }