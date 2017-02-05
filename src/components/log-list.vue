<template>
    <div id="log-list">
        <dl>
            <template v-for="it in logList">
                <dt class="color_{{ LEVELS[it.lev] }}">
                    <span @click="selectTag(it.tag)">{{{ highlight(it.tag) }}}</span>
                    <p>{{(new Date(it.time)).toLocaleString()}}</p>
                </dt>
                <dd :class="{ 'con-ellipsis': it.isEllipsis }" @click="it.isEllipsis = !it.isEllipsis">
                    {{{ highlight(it.content) }}}
                </dd>
            </template>
        </dl>
    </div>
</template>

<script>
import {
    LEVELS
} from '../config'

export default {
    data() {
        console.log(this.logList)
        return {
            LEVELS
        }
    },
    props: {
        keyword: String,
        logList: Array
    },
    methods: {
        highlight(str) {
            if (!this.keyword) return str

            let kwRegx = new RegExp(`(${this.keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig')
            let repStr = '<span style="background-color:#FF0">$1</span>'
            return str.replace(kwRegx, repStr)
        },
        selectTag(tag) {
            this.$emit('select-tag', tag)
        }
    }
}
</script>

<style lang='less' scoped>
#log-list {
    position: absolute;
    top: 60px;
    left: 5px;
    right: 5px;
    bottom: 0;
    overflow-y: scroll;
    word-wrap: break-word;

    dt {
        font-weight: bold;
        margin: 3px 0;

        p {
            margin: 0;
            padding-left: 10px;
        }
    }
    dd {
        padding-left: 10px;
        margin: 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .con-ellipsis {
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
    }
}
</style>
