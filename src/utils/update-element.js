/**
 * Created by ccw on 2017/8/14.
 * Update the element of dom tree
 */
var createRealnode = require('./create-realnode').createRealnode
function isChange (node1, node2) {
    return JSON.stringify(node1) !== JSON.stringify(node2)
}
function isElement (obj) {
    try {
        //Using W3 DOM2 (works for FF, Opera and Chrom)
        return obj instanceof HTMLElement
    }
    catch (e) {
        //Browsers not supporting W3 DOM2 don't have HTMLElement and
        //an exception is thrown and we end up here. Testing some
        //properties that all elements have. (works on IE7)
        return (typeof obj === 'object') &&
            (obj.nodeType === 1) && (typeof obj.style === 'object') &&
            (typeof obj.ownerDocument === 'object')
    }
}
/*function updateElement (parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        parent.appendChild(
            createRealnode(newNode)
        )
        return newNode
    } else if (!newNode) {
        parent.removeChild(
            parent.childNodes[index]
        )
        return parent
    } else if (isChange(newNode, oldNode)) {
        console.log('isChange')
        parent.replaceChild(
            createRealnode(newNode),
            parent.childNodes[index]
        )
        return newNode
    } else if (newNode.type) {
        console.log('newNode.type')
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
}*/
function updateElement (oldNode, newNode) {
    if (isElement(oldNode)) {
        oldNode.appendChild(
            createRealnode(newNode)
        )
    } else if (!isElement(oldNode) && isElement(newNode)) {
        while (newNode.firstChild) {
            newNode.removeChild(newNode.firstChild)
        }
    } else if (isChange(oldNode, newNode)) {
        console.log('chrage')
    }
    return newNode
}

module.exports = { updateElement }