import Vue from 'vue'
import Component from './app.vue'
const App = Vue.extend(Component)
Vue.config.devtools = true

import header from '../../../common/h5-ui/header.jsx'
const h = header({
    reactRender: false,
    styleCustom: {
        d1Style: {
            fontSize: '30px',
            backgroundColor: 'yellow'
        }
    },
    componProps: {
        initProps: 1
    }
})
const Child = {
    template: h
}
new Vue({
    el: '#app',
    components: {
        app: App,
        child: Child
    },
})