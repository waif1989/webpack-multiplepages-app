/**
 * Created by chensiwei on 2017/8/10.
 */
import { createVnode } from '../../../utils/create-vnode'
import { createRealnode } from '../../../utils/create-realnode'
import { analysisHtml } from '../../../utils/template-analysis'
import { updateElement } from '../../../utils/update-element'
import tem from './template.html'
function update (event) {
    const newVnode = analysisHtml(tem, {
        data: {
            name: event.target.value
        }
    })
    console.log('updata oldVnode============', oldVnode)
    console.log('updata newVnode------------', newVnode)
    oldVnode = updateElement(oldVnode, newVnode)
}

const newVnode = analysisHtml(tem, {
    data: {
        name: ''
    }
})

/*const vdom = createVnode('ul', {'class': 'list'}, {'click': 'updata'}, false, 'tag', createVnode('li', {}, {}, false, 'tag', 'item1'),  createVnode('li', {}, {}, false, 'tag', 'item2'))
app.appendChild(createRealnode(vdom))*/
let oldVnode = document.getElementById('app')
oldVnode = updateElement(oldVnode, newVnode)
console.log('init oldVnode============', oldVnode)
console.log('init newVnode------------', newVnode)
window.update = update



