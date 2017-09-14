console.log('counter-comp-mix')

import $ from 'jquery'

import Vue from 'vue'
import CounterCompVue from './vueapp.vue'
const App = Vue.extend(CounterCompVue)
Vue.config.devtools = true

import CounterComp from '../../../common/h5-ui/counter-comp-mix.jsx'

import CounterCompReact from './reactapp.jsx'
/* h5 Demo */
function addOnCall (val) {
    console.log('Dom add-on-call:' + val)
}
function redOnCall (val) {
    console.log('Dom red-on-call:' + val)
}
const h5Counter = new CounterComp({
    initVal: 1,
    addOnCall: addOnCall,
    redOnCall: redOnCall
})
$('#h5app').on('click', '.com-count-add', () => {
    h5Counter.add()
    h5Counter.update()
})
$('#h5app').on('click', '.com-count-red', () => {
    h5Counter.red()
    h5Counter.update()
})
document.getElementById('h5app').innerHTML = `<p>The element below is DOM element</p>${h5Counter.createTem(document.getElementById('h5app'))}`
/* react Demo */
CounterCompReact()
/* vue Demo */
new Vue({
    el: '#vueapp',
    components: {
        app: App
    }
})