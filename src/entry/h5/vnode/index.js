/**
 * Created by chensiwei on 2017/8/10.
 */
import { createVnode } from '../../../utils/create-vnode'
import { createRealnode } from '../../../utils/create-realnode'
import { analysisHtml } from '../../../utils/template-analysis'
import { updateElement } from '../../../utils/update-element'
import tem from './template.html'
function update (event) {
    const parent = document.getElementById('app')
    const newVnode = analysisHtml(tem, {
        data: {
            name: event.target.value
        }
    })
    console.log('oldVnode============', oldVnode)
    console.log('newVnode------------', newVnode)
    oldVnode = updateElement(parent, newVnode, oldVnode)
}

const newVnode = analysisHtml(tem, {
    data: {
        name: ''
    }
})
console.log('results---vdom-----', newVnode)
let oldVnode = document.getElementById('app')

oldVnode = updateElement(oldVnode, newVnode)
console.log('oldVnode-----', oldVnode)
window.update = update

// const vdom = createVnode('ul', {'class': 'list'}, createVnode('li', {}, 'item1'), createVnode('li', {}, 'item2'))
// console.log('vdom-----', vdom)
// app.appendChild(createRealnode(vdom))

