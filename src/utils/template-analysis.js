/**
 * Created by ccw on 2017/8/11.
 * Analysising the html string
 */
var createVnode = require('./create-vnode').createVnode

function analysisTag (tag) {
    /*
    * @param {String} tag - The html tag label
    * */
    var attrRegexp = /([\w-]+)|['"]{1}([^'"]*)['"]{1}/g   // Testing html tag attributes regular expression
    var functionRegexp = /^cv-(?:[a-zA-Z]+)/g             // Testing html tag function bind
    var selfClosing = false                               // Checking tag is selfClosing or not
    var tagName = ''                                       // Initializing the tag name
    var tagAttrs = {}                                      // Initializing the tag attributes
    var tagFunction = {}                                   // Initializing the tag function Object
    var nodeType = 'tag'                                   // Initializing the tag type
    var i = 0                                              // Initializing the matching results position
    var attrName = ''                                      // Initializing attributes name
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
    tag.replace(attrRegexp, function (match) {
        if (i % 2) {
            attrName = match     // Check odd number tag item. And match this tag's attruties name
        } else {
            if (i === 0) {
                // In the first tag, Check this tag is self-closing or not
                if (selfClosingTags[match] || tag.charAt(tag.length - 2) === '/') {
                    selfClosing = true
                }
                tagName = match
            } else {
                if (functionRegexp.test(attrName)) {
                    tagFunction[attrName.replace(/cv-/g, '')] = match.replace(/['"]/g, '')
                } else {
                    tagAttrs[attrName] =  match.replace(/['"]/g, '')  // This will setup "attrs" object name and object key
                }
            }
        }
        i++
    })
    return createVnode(tagName, tagAttrs, tagFunction, selfClosing, nodeType)
}
function analysisHtml (html, options/*0ptional*/) {
    /*
    * @param {String} html - The html string
    * @param {Object} options - {data: {Object}, components: {Object}}
    * */
    var tagRegexp = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g     // Testing html tag regular expression
    var variableRegexp = /^({{){1}[^{}'"]*(}}){1}/g                 // Testing html template data-binding
    var result = []                                                 // The Data structure of virtual dom tree, We get the first value. Because we must define the root element of html template
    var arr = []                                                    // Saving the children tree of virtual dom tree in the data structure
    var tagResult                                                   // Saving the results of the return of analysisTag function
    var level = -1                                                  // Marking the virtual dom tree level position
    var inComponent = false                                         // Checking the tag is real tag or customize tag
    var componentsOptions = options || {}                           // Marking the customized components options
    html.replace(tagRegexp, function (match, index) {
        var isTagStart = match.charAt(1) !== '/'                    // Judging the tag is end or just start
        var nextstart = index + match.length                        // Calculating the next string after this tag's start position
        var nextChar = html.charAt(nextstart)                       // Getting this tag's following char string
        var parent = {}                                             // Defining each virtual dom trees's parent node
        if (isTagStart) {
            level++
            tagResult = analysisTag(match)
            if (tagResult.nodeType === 'tag' && componentsOptions.components && componentsOptions.components[tagResult.type]) {
                tagResult.type = 'component'
                inComponent = true
            }
            if (!tagResult.selfClosing && !inComponent && nextChar && nextChar !== '<') {
                if (!variableRegexp.test(html.slice(nextstart, html.indexOf('<', nextstart)))) {
                    tagResult.children.push(html.slice(nextstart, html.indexOf('<', nextstart)))
                } else {
                    // If using data bind in template, We need extract the variable and set new value
                    var variable = html.slice(nextstart, html.indexOf('<', nextstart)).replace(/{{/g, '').replace(/}}/g, '')
                    for (var i in componentsOptions.data) {
                        if (i === variable) {
                            tagResult.children.push(componentsOptions.data[i])
                        }
                    }
                }
            }
            if (level === 0) {
                result.push(tagResult)
            }
            parent = arr[level - 1]
            if (parent) {
                parent.children.push(tagResult)
            }
            arr[level] = tagResult
        }
        if (!isTagStart || tagResult.selfClosing) {
            level--
            if (!inComponent && nextChar && nextChar !== '<') {
                arr[level].children.push(html.slice(nextstart, html.indexOf('<', nextstart)))
            }
        }
    })
    return result[0]
}
module.exports = { analysisHtml, analysisTag }