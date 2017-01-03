import core from './core'
import logConsole from './log-console'

export default {
    install(Vue, options) {
        core.initialize()

        let {debug, info, warn, error} = core
        Vue.Logger = {debug, info, warn, error}

        Vue.component('log-console', logConsole)
    }
}
