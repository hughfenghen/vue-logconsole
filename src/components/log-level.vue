<template>
    <ul id="log-level">
        <li v-for="lev in levList"
            @click="changeLev($index, lev.name)"
            class=" {{ (lev.clsTag ? 'active_': 'color_') + lev.name }}">
            {{ lev.name | uppercase }}
            </li>
    </ul>
</template>
<script>
import { LEVELS, ALL_LEV } from '../config'

let levList = LEVELS.map((it, idx) => {
    let t = idx === ALL_LEV ? 1 : 0
    return {name: it, clsTag: t}
})

export default {
    data() {
        return {
            levList,
            ALL_LEV
        }
    },
    methods: {
        changeLev(idx) {
            levList.forEach(it => {
                it.clsTag = 0
            })
            levList[idx].clsTag = 1
            this.$emit('lev-change', idx)
        }
    }
}
</script>
<style lang='less' scoped>
#log-level {
    margin-top: 3px;
    li {
        display: inline-block;
        padding: 0 5px;
        border-radius: 25%;
    }

    .active_all {
        background-color: rgb(153, 204, 255);
        color: rgb(255, 255, 255);
    }
    .active_debug {
        background-color: rgb(102, 170, 119);
        color: rgb(255, 255, 255);
    }
    .active_info {
        background-color: rgb(102, 204, 204);
        color: rgb(255, 255, 255);
    }
    .active_warn {
        background-color: rgb(255, 153, 102);
        color: rgb(255, 255, 255);
    }
    .active_error {
        background-color: rgb(255, 102, 102);
        color: rgb(255, 255, 255);
    }
}
</style>
