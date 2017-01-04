import core from './core'
import logConsole from './log-console'
import { setMaxSize, setThreshold } from './config'

export default {
    install(Vue, {maxSize, threshold} = {}) {
        core.initialize()

        let {debug, info, warn, error} = core
        Vue.Logger = {debug, info, warn, error}

        maxSize && setMaxSize(maxSize)
        threshold && setThreshold(threshold)

        Vue.component('log-console', logConsole)
    }
}
