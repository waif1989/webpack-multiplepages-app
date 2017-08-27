/**
 * Created by ccw on 2017/8/27.
 */
function adaptToVueAttr (htmlString) {
    var vAttrRegexp = /data-v-/g
    var vFuncRegexp = /data-on-/g
    var attrReturn = htmlString.replace(vAttrRegexp, 'v-')
    var funcReturn = attrReturn.replace(vFuncRegexp, '@')
    return funcReturn
}
module.exports = { adaptToVueAttr }