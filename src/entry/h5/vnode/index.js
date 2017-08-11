/**
 * Created by chensiwei on 2017/8/10.
 */
import { createVnode } from '../../../utils/create-vnode'
import { createRealnode } from '../../../utils/create-realnode'
import { analysisHtml, arrToVnode } from '../../../utils/template-analysis'
import tem from './template.html'
const results = analysisHtml(tem)
// arrToVnode(results)
const a = arrToVnode(results)
console.log('----', a)
const vdom = createVnode('ul', {'class': 'list'}, createVnode('li', {}, 'item1'), createVnode('li', {}, 'item2'))
console.log('+++++', vdom)
const app = document.getElementById('app')
app.appendChild(createRealnode(vdom))
