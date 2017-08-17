/**
 * Created by ccw on 2017/8/14.
 * Update the element of dom tree
 */
var createRealnode = require('./create-realnode').createRealnode
function isChange (node1, node2) {
    return typeof node1 !== typeof node2 || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type
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
function painting (startRdom, newVdom, positonIndex, paintType) {
    switch (paintType) {
        case 'add':
            startRdom.appendChild(
                createRealnode(newVdom)
            )
            break
        case 'del':
            startRdom.removeChild(
                startRdom.childNodes[positonIndex]
            )
            break
        default:
            startRdom.replaceChild(
                createRealnode(newVdom),
                startRdom.childNodes[positonIndex]
            )
            break
    }
}
function diff (oldNode, newNode, parent, level) {
    // Judging the newNode is String or Object
    if (newNode.type) {
        var newLength = newNode.children.length
        var oldLength = oldNode.children.length
        for (var x = 0; x < newLength || x < oldLength; x++) {
            diff(
                oldNode.children[x],
                newNode.children[x],
                parent.childNodes[level],
                x
            )
        }
    } else if (isChange(newNode, oldNode)) {
        painting(parent, newNode, level)
    }
}

function updateElement (oldNode, newNode) {
    if (isElement(oldNode)) {
        painting(oldNode, newNode, 0, 'add')
    } else if (!isElement(oldNode) && isElement(newNode)) {
        painting(oldNode, newNode, 0, 'del')
    } else {
        diff(oldNode, newNode, document.getElementById('app'), 0)
    }
    return newNode
}

module.exports = { updateElement }