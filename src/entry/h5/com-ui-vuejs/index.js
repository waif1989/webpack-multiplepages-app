/**
 * Created by chensiwei on 2017/9/8.
 */
import Vue from 'vue'
import Component from './app.vue'
const App = Vue.extend(Component)
Vue.config.devtools = true
console.log('com-ui-vuejs')
new Vue({
    el: '#app',
    components: {
        app: App
    }
})
