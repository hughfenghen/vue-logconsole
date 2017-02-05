<template>
<div id="log-console" v-show="show">
    <search-bar :keyword.sync="keyword" @close-page="closePage"></search-bar>
    <log-level @lev-change="levChange"></log-level>
    <log-list :log-list="logList" :keyword="keyword" @select-tag="selectTag"></log-list>
</div>
</template>

<script>
import {
    ALL_LEV
} from './config'
import SearchBar from './components/search-bar'
import LogLevel from './components/log-level'
import LogList from './components/log-list'
import core from './core'

export default {
    data() {
        // 初始化、订阅日志
        let logs = core.readLog().map((it) => {
            it.isEllipsis = true
            return it
        })
        core.subscribe(it => {
            it.isEllipsis = true
            logs.unshift(it)
        })
        return {
            lev: ALL_LEV,
            keyword: '',
            logs: logs
        }
    },
    props: {
        show: Boolean
    },
    computed: {
        logList() {
            // 过滤日志
            let {
                lev,
                keyword
            } = this

            // regx escape
            let regx = new RegExp(keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i')

            return this.logs.filter(it => {
                return (lev === ALL_LEV || lev === it.lev) && (it.tag.search(regx) !== -1 || it.content.search(regx) !== -1)
            })
        }
    },
    methods: {
        levChange(lev) {
            this.lev = lev
        },
        selectTag(tag) {
            this.keyword = tag
        },
        closePage() {
            this.show = false
            this.$emit('close-log-page')
        }
    },
    components: {
        SearchBar,
        LogLevel,
        LogList
    }
}
</script>

<style lang='less'>
#log-console {
    * {
        margin: 0;
        padding: 0;
    }

    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    padding: 5px;
    background: #FFF;
    opacity: 0.9;
    z-index: 999;

    .color_all {
        color: #99CCFF;
    }
    .color_debug {
        color: #66AA77;
    }
    .color_info {
        color: #66CCCC;
    }
    .color_warn {
        color: #FF9966;
    }
    .color_error {
        color: #FF6666;
    }
    .high-light {
        background: #ffff00;
    }
}
</style>
