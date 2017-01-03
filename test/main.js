import Vue from 'vue'
import logConsole from '../src'

import App from './App'

Vue.use(logConsole)

window.Vue = Vue

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: {
        App
    }
})
