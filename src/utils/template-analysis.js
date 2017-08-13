// var HTML = require('html-parse-stringify')
var createVnode = require('./create-vnode').createVnode

function analysisTag (tag) {
    var attrRegexp = /([\w-]+)|['"]{1}([^'"]*)['"]{1}/g
    var selfClosingTags = {
        base: true,
        br: true,
        col: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        keygen: true,
        link: true,
        menuitem: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true
    }
    var i = 0
    var attrName
    var res = {
        type: 'tag',
        name: '',
        selfClosing: false,
        attrs: {},
        children: []
    }
    tag.replace(attrRegexp, function (match) {
        // console.log('match-------', match)
        if (i % 2) {
            attrName = match     // Check odd number target item. And match this target's attruties name
        } else {
            if (i === 0) {
                // In the first target, Check this target is self-closing or not
                if (selfClosingTags[match] || tag.charAt(tag.length - 2) === '/') {
                    res.selfClosing = true
                }
                res.name = match
            } else {
                res.attrs[attrName] = match.replace(/['"]/g, '')  // "res.attrs" is an object inside. This will setup "attrs" object name and object key
            }
        }
        i++
        // console.log('res.name-------', res.name)
    })
    // return res
    return createVnode(res.name, res.attrs)
}
function analysisHtml (html) {
    // var results = HTML.parse(tem)
    // return results
    console.log('htmlstring-------', html)
    var tagRegexp = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g
    var result = []
    var arr = []
    var targetResult
    var level = -1
    var inComponent = false
    var options = {}
    options.components = {}
    html.replace(tagRegexp, function (match, index) {
        var isTargetStart = match.charAt(1) !== '/'  // Judge this target is end or just start
        var nextstart = index + match.length         // Calculate the next string after this target's start position
        var nextChar = html.charAt(nextstart)        // Get this target's following char string
        var parent
        // console.log('tag-------', match, index, isTargetStart, nextstart, nextChar)
        // targetResult = analysisTag(match)
        // console.log('targetResult-------', targetResult)
        if (isTargetStart) {
            level++
            targetResult = analysisTag(match)
            console.log('targetResult-------', targetResult)
            /*if (targetResult.type === 'tag' && options.components[targetResult.name]) {
                targetResult.type = 'component'
                inComponent = true
            }
            if (!targetResult.selfClosing && !inComponent && nextChar && nextChar !== '<') {
                targetResult.children.push({
                    type: 'text',
                    content: html.slice(nextstart, html.indexOf('<', nextstart))
                })
            }*/
            if (nextChar && nextChar !== '<') {
                targetResult.children.push(html.slice(nextstart, html.indexOf('<', nextstart)))
            }
            if (level === 0) {
                result.push(targetResult)
            }
            parent = arr[level - 1]
            if (parent) {
                parent.children.push(targetResult)
            }
            arr[level] = targetResult
        }
        /*if (!isTargetStart || targetResult.selfClosing) {
            level--
            if (!inComponent && nextChar !== '<' && nextChar) {
                // trailing text node
                arr[level].children.push({
                    type: 'text',
                    content: html.slice(start, html.indexOf('<', start))
                });
            }
        }*/
        if (!isTargetStart) {
            level--
            if (nextChar && nextChar !== '<') {
                arr[level].children.push(html.slice(nextstart, html.indexOf('<', nextstart)))
            }
        }
    })
    return result[0]
}
module.exports = { analysisHtml }