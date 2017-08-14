/**
 * Created by ccw on 2017/8/11.
 * Analysising the html string
 */
var createVnode = require('./create-vnode').createVnode

function analysisTag (tag) {
    /*
    * @param {String} tag - The html target label
    * */
    var attrRegexp = /([\w-]+)|['"]{1}([^'"]*)['"]{1}/g   // Test html target attributes regular expression
    var functionRegexp = /^cv-(?:[a-zA-Z]+)/g
    var selfClosing = false                               // Checking target is selfClosing or not
    var targetName = ''                                    // Initializing the target name
    var targetAttrs = {}                                   // Initializing the target attributes
    var targetFunction = {}
    var nodeType = 'tag'                                   // Initializing the target type
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
            attrName = match     // Check odd number target item. And match this target's attruties name
        } else {
            if (i === 0) {
                // In the first target, Check this target is self-closing or not
                if (selfClosingTags[match] || tag.charAt(tag.length - 2) === '/') {
                    selfClosing = true
                }
                targetName = match
            } else {
                if (functionRegexp.test(attrName)) {
                    targetFunction[attrName.replace(/cv-/g, '')] = match.replace(/['"]/g, '')
                } else {
                    targetAttrs[attrName] =  match.replace(/['"]/g, '')  // "res.attrs" is an object inside. This will setup "attrs" object name and object key
                }
            }
        }
        i++
    })
    return createVnode(targetName, targetAttrs, targetFunction, selfClosing, nodeType)
}
function analysisHtml (html, options/*0ptional*/) {
    /*
    * @param {String} html - The html string
    * @param {Object} options - {components: {customize_components_name: customize_components_value}}
    * */
    var tagRegexp = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g     // Testing html target regular expression
    var result = []                                                 // The Data structure of virtual dom tree, We get the first value. Because we must define the root element of html template
    var arr = []                                                    // Saving the children tree of virtual dom tree in the data structure
    var targetResult                                                // Saving the results of the return of analysisTag function
    var level = -1                                                  // Marking the virtual dom tree level position
    var inComponent = false                                        // Checking the target is real target or customize target
    var componentsOptions = options || {}                           // Marking the customized components options
    html.replace(tagRegexp, function (match, index) {
        var isTargetStart = match.charAt(1) !== '/'                 // Judging the target is end or just start
        var nextstart = index + match.length                        // Calculating the next string after this target's start position
        var nextChar = html.charAt(nextstart)                       // Getting this target's following char string
        var parent = {}                                             // Defining each virtual dom trees's parent node
        if (isTargetStart) {
            level++
            targetResult = analysisTag(match)
            if (targetResult.nodeType === 'tag' && componentsOptions.components && componentsOptions.components[targetResult.type]) {
                targetResult.type = 'component'
                inComponent = true
            }
            if (!targetResult.selfClosing && !inComponent && nextChar && nextChar !== '<') {
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
        if (!isTargetStart || targetResult.selfClosing) {
            level--
            if (!inComponent && nextChar && nextChar !== '<') {
                arr[level].children.push(html.slice(nextstart, html.indexOf('<', nextstart)))
            }
        }
    })
    return result[0]
}
module.exports = { analysisHtml, analysisTag }