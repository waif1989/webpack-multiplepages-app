/**
 * Created by ccw on 2017/8/14.
 * Update the element of dom tree
 */
var createRealnode = require('./create-realnode').createRealnode
function isChange (node1, node2) {
    // return JSON.stringify(node1) !== JSON.stringify(node2)
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
function diff (oldNode, newNode, parent, level) {
    // var isDiff = false
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
        parent.replaceChild(
            createRealnode(newNode),
            parent.childNodes[level]
        )
    }
    /*if (typeof oldNode === 'string') {
        if (oldNode !== newNode) {
            // isDiff = true
            console.log('index--', index)
            _parent.replaceChild(
                createRealnode(newNode),
                _parent.childNodes[index]
            )
        }
    } else {
        for (var i in oldNode) {
            if (Array.isArray(oldNode[i])) {
                /!*if (oldNode[i].length === newNode[i].length) {
                    var len = oldNode.children.length
                    index++
                    for (var x = 0; x < len; x++) {
                        diff(oldNode[i][x], newNode[i][x], _parent.childNodes[x], x)
                    }
                }*!/
                var newLength = newNode.children.length
                var oldLength = oldNode.children.length
                for (var x = 0; x < newLength || x < oldLength; x++) {
                    diff(
                        oldNode.children[x],
                        newNode.children[x],
                        parent.childNodes[x],
                        i
                    )
                }
            }/!* else if (typeof oldNode[i] === 'object') {
                for (var k in oldNode[i]) {
                    if (oldNode[i][k] !== newNode[i][k]) {
                        isDiff = true
                        document.getElementById('app').replaceChild(
                            createRealnode(newNode),
                            createRealnode(oldNode)
                        )
                        return
                    }
                }
            } else {
                if (oldNode[i] !== newNode[i]) {
                    isDiff = true
                    document.getElementById('app').replaceChild(
                        createRealnode(newNode),
                        createRealnode(oldNode)
                    )
                    return
                }
            }*!/
        }
    }*/
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
    } else {
        var a = diff(oldNode, newNode, document.getElementById('app'), 0)
        console.log('a----------------', a)
    }
    return newNode
}

module.exports = { updateElement }