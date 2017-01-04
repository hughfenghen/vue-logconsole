<template>
    <div id="search-bar">
        <div class="search-border">
            <img src="../assets/search.png">
            <input type="text" v-model="keyword" debounce="500">
            <span class="clear_input" @click="clear" v-show="keyword">x</span>
        </div>
        <a class="button" @click="$emit('close-page')">close</a>
    </div>
</template>

<script>
export default {
    props: {
        keyword: {
            type: String,
            default: '',
            twoWay: true
        }
    },
    methods: {
        clear() {
            this.keyword = ''
        }
    }
}
</script>

<style lang="less" scoped>
#search-bar {
    display: -webkit-box;
    background: white;

    * {
        line-height: 30px;
        height: 30px;
        display: inline-block;
    }

    .search-border {
        display: -webkit-box;
        -webkit-box-flex: 1;
        border: 1px solid #BBB;
        border-radius: 5px;
        padding: 2px;
    }

    img {
        margin: 0 5px 0 2px;
        transform: scale(.8)
    }
    input {
        border: none;
        -webkit-box-flex: 1;
        display: block;
    }
    input, img {
        vertical-align: middle;
    }
    span.clear_input {
        width: 20px;
        height: 20px;
        text-align: center;
        font-size: 18px;
        line-height: 18px;

        margin: 5px;
        background-color: #AAAAAA;
        color: #FFFFFF;
        border-radius: 50%;
    }

    .button {
    	vertical-align: baseline;
    	outline: none;
    	cursor: pointer;
    	text-align: center;
    	text-decoration: none;
        margin-left: 3px;
        padding: 2px 4px;
    	text-shadow: 0 1px 1px rgba(0,0,0,.3);
    	border-radius: .5em;
    	box-shadow: 0 1px 2px rgba(0,0,0,.2);
    }
    .button:active {
    	position: relative;
    	top: 1px;
    }
}
</style>
