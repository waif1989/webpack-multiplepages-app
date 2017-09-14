function inheritObject (o) {
    function F () {}
    F.prototype = o
    return new F()
}

function inheritPrototype (SubClass, SuperClass) {
    var p = inheritObject(SuperClass.prototype)
    p.constructor = SubClass
    SubClass.prototype = p
}

module.exports = inheritPrototype
module.exports.default = inheritPrototype