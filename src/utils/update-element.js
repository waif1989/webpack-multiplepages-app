/**
 * Created by ccw on 2017/8/14.
 * Update the element of dom tree
 */
var createRealnode = require('./create-realnode').createRealnode
function isChange (node1, node2) {
    return typeof node1 !== typeof node2 || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type
}
function updateElement (parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        parent.appendChild(
            createRealnode(newNode)
        )
    } else if (!newNode) {
        parent.removeChild(
            parent.childNodes[index]
        )
    } else if (isChange(newNode, oldNode)) {
        parent.replaceChild(
            createRealnode(newNode),
            parent.childNodes[index]
        )
    } else if (newNode.type) {
        const newLength = newNode.children.length
        const oldLength = oldNode.children.length
        for (var i = 0; i < newLength || i < oldLength; i++) {
            updateElement(
                parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            )
        }
    }
}

module.exports = { updateElement }