/**
 * Created by chensiwei on 2017/8/10.
 */
import { createVnode } from '../../../utils/create-vnode'
import { createRealnode } from '../../../utils/create-realnode'
import { analysisHtml } from '../../../utils/template-analysis'
import { updateElement } from '../../../utils/update-element'
import tem from './template.html'
const results = analysisHtml(tem)
console.log('results---vdom-----', results)
var parent = document.getElementById('app')
function update (event) {
    console.log('============', event.target.value)
    console.log('------------', parent.innerHTML)
    const newVnode = document.getElementById('app').innerHTML
    oldVnode = updateElement(parent, oldVnode, newVnode)
}

let oldVnode = parent
oldVnode = updateElement(oldVnode, results)
window.update = update

// const vdom = createVnode('ul', {'class': 'list'}, createVnode('li', {}, 'item1'), createVnode('li', {}, 'item2'))
// console.log('vdom-----', vdom)
// app.appendChild(createRealnode(vdom))

