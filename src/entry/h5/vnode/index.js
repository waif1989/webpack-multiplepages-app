/**
 * Created by chensiwei on 2017/8/10.
 */
import { createVnode } from '../../../utils/create-vnode'
import { createRealnode } from '../../../utils/create-realnode'
import { analysisHtml } from '../../../utils/template-analysis'
import { updateElement } from '../../../utils/update-element'
import tem from './template.html'
const results = analysisHtml(tem)
console.log('results---index-----', results)

let oldVnode = document.getElementById('app')
oldVnode = updateElement(oldVnode, results)

// const vdom = createVnode('ul', {'class': 'list'}, createVnode('li', {}, 'item1'), createVnode('li', {}, 'item2'))
// console.log('vdom-----', vdom)
// app.appendChild(createRealnode(vdom))

