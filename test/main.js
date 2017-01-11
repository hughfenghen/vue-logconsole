import Vue from 'vue'
import logConsole from '../src'

import App from './App'

Vue.use(logConsole, {
    maxSize: 2 * 1024 * 1024, // 默认占用localstorage 1M空间
    threshold: -1 // 级别小于该值的日志不会被记录，{debug: 0, info: 1, warn: 2, error: 3}
})

window.Vue = Vue

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: {
        App
    }
})
