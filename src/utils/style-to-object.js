function styletoobject (string) {
    var styleObj = {}
    if (!!string && string !== undefined) {
        var strArr = string.split(';')
        strArr.forEach(function (match) {
            var parma = ''
            var pramaArr = match.split(':')
            parma = pramaArr[0].replace(/((?:[a-zA-Z]+)-(?:[a-zA-Z]+))/g, function (item) {
                var t = item.split('-')
                var i
                var ss = t[1].toLowerCase().split(/\s+/)
                for (i = 0; i < ss.length; i++) {
                    ss[i] = ss[i].slice(0, 1).toUpperCase() + ss[i].slice(1)
                }
                var p = ss.join('')
                return t[0] + p
            }).replace(/\s+/g, '')
            styleObj[parma] = pramaArr[1]
        })
        return styleObj
    }
    return styleObj
}

module.exports = styletoobject