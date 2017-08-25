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
    text: '这是自定义的文案1'
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
})

console.log('JSX x Vue')