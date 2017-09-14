function addEleList (doc, event, handler, that, useCapture) {
    doc.addEventListener(event, handler.bind(that), useCapture)
}

function removeEleList (doc, event, handler, that, useCapture) {
    doc.removeEventListener(event, handler.bind(that), useCapture)
}

module.exports = {
    addEleList: addEleList,
    removeEleList: removeEleList
}

module.exports.default = {
    addEleList: addEleList,
    removeEleList: removeEleList
}