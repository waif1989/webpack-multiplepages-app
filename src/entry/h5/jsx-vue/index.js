import Vue from 'vue'
import Component from './app.vue'
import './app.less'
const App = Vue.extend(Component)
Vue.config.devtools = true
import AlertComponent from '../../../common/h5-ui/alert-component.jsx'
const alertBox = new AlertComponent({
    styleCustom: {
        acStyle: {
            backgroundColor: 'red'
        }
    },
    text: '这是实例外部注入'
})
const Child = {
    template: alertBox.render()
}
new Vue({
    el: '#app',
    components: {
        app: App,
        child: Child
    },
    mounted () {
        document.getElementById('static').innerHTML = alertBox.render()
    }
})

console.log('JSX x Vue')