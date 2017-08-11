var HTML = require('html-parse-stringify')
var createVnode = require('./create-vnode').createVnode
var arrtem = []
function analysisHtml (tem) {
    var results = HTML.parse(tem)
    return results
}
function arrToVnode (arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type === 'tag') {
            console.log('tag-------', arr[i])
            arrtem.push(createVnode(arr[i].name, arr[i].attrs))
            arrToVnode(arr[i].children)
        } else {
            console.log('content-------', arr[i])
        }
    }
    return arrtem
}
module.exports = { analysisHtml, arrToVnode }