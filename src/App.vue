<template>
    <div id="app">
        <!--<img src="./assets/logo.png">-->
        <h1>{{ msg }}</h1>
        <h1>{{ checkListOptions }}</h1>
        <h1>{{ checkListValue }}</h1>
        <h1>{{ menus }}</h1>
        <!--<mt-button v-bind:ab="test" @click.native="startHacking"-->
                   <!--v-bind:class="{ 'active': isActive, 'text-danger': hasError }">{{ msg }}-->
        <!--</mt-button>-->
        <div class="sidebar">
            <mt-cell v-bind:title="menu.title"
                     @click.native="startChange"
                     is-link v-for="(menu,index) in menus" v-bind:index="index">
                <mt-badge size="small">{{menu.size}}</mt-badge>
            </mt-cell>
        </div>
        <div class="main">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
                <mt-checklist
                        v-model="checkListValue"
                        :options="checkListOptions">
                </mt-checklist>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>

export default {
    name: 'app',
    data () {
        return {
            msg: 2,
            topStatus: '',
            checkListValue:[],
            isActive: true,
            hasError: true,
            test: 'abc',
            checkListOptions:[
                {
                    label:"t"
                },
                {
                    label:"d",
                    disable:false
                }
            ],
            menus:[
                { title:'t1', size:5},
                { title:'t2', size:6}
            ],
            index: 0
        }
    },
    methods: {
        startChange (event) {
            var vm = this;
            vm.menus[vm.index].finishValue = vm.checkListValue;
            vm.index = event.target.parentNode.getAttribute("index");
            vm.msg = vm.index;
            vm.checkListOptions = vm.menus[vm.index].contents;
            vm.checkListValue = vm.menus[vm.index].finishValue;
        },
        handleTopChange(status) {
            this.topStatus = status;
//            this.$toast('handleTopChange!')
        },

        loadTop() {
            var vm = this;
            vm.$toast('loadTop!')

//            setTimeout(() => {
////            this.$refs.loadmore.onTopLoaded();
//        }, 1500);

//            this.$refs.loadmore.onTopLoaded();
            vm.menus[vm.index].finishValue = vm.checkListValue;
            vm.axios.post('http://192.168.123.62:8084/list',vm.menus)
                .then(function (response) {
                    if(response.data == '0'){
                        vm.$toast('提交成功')
                    }else{
                        vm.$toast('提交失败，未知原因')
                    }
                    vm.$refs.loadmore.onTopLoaded();
                })
                .catch(function (error) {
                    vm.$refs.loadmore.onTopLoaded();
                    vm.$toast('提交失败，网络问题')
                })
        }
    },
    created (){
        var vm = this
        vm.axios.get('http://192.168.123.62:8084/list')
            .then(function (response) {
                vm.menus = response.data
                vm.checkListValue = vm.menus[0].finishValue
//                vm.msg = vm.checkListValue
                vm.checkListOptions = vm.menus[0].contents
            })
            .catch(function (error) {
//                vm.msg = error
                console.log('error' + error)
            })
    }
}

</script>

<style >

    #app{
        overflow: hidden;
        /*border-radius: 3px;*/

    }
    html, body {
        background-color: #fafafa;
        -webkit-overflow-scrolling: touch;
        user-select: none;
    }

    .sidebar, .main {
        height: 100%;
    }
    .sidebar {
        float: left;
        width: 150px;
        /*color: #f4f4f4;*/
        /*background-color: #2e3238;*/
    }
    .main {
        /*position: relative;*/
        overflow: hidden;
        /*background-color: #eee;*/
    }
    .mint-loadmore-topb span {
        display: inline-block;
        transition: .2s linear;
        vertical-align: middle;

        /*@when rotate {*/
            /*transform: rotate(180deg);*/
        /*}*/
    }
    .mint-spinner-snake {
        display: inline-block;
        vertical-align: middle;
    }

    html {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
        height: 100%
    }
    body {
        margin: 0;
        font-size: 14px;
        font-family: "Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    main,
    menu,
    nav,
    section,
    summary {
        display: block
    }
    audio:not([controls]) {
        display: none;
        height: 0
    }
    progress {
        vertical-align: baseline
    }
    template, [hidden] {
        display: none
    }
    a {
        background-color: transparent;
        -webkit-text-decoration-skip: objects;
        text-decoration: none
    }
    a:active,
    a:hover {
        outline-width: 0
    }
    abbr[title] {
        text-decoration: underline;
        text-decoration: underline dotted
    }
    b,
    strong {
        font-weight: bolder
    }
    dfn {
        font-style: italic
    }
    small {
        font-size: 80%
    }
    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline
    }
    sup {
        top: -0.5em
    }
    sub {
        bottom: -0.25em
    }
    img {
        border-style: none
    }
    svg:not(:root) {
        overflow: hidden
    }
    code,
    kbd,
    pre,
    samp {
        font-family: monospace, monospace;
        font-size: 1em
    }
    pre {
        overflow: auto;
        white-space: pre;
        white-space: pre-wrap;
        word-wrap: break-word
    }
    button,
    input,
    optgroup,
    select,
    textarea {
        color: inherit;
        font: inherit;
        margin: 0;
        vertical-align: middle
    }
    button, input, input {
        overflow: visible
    }
    button,
    select {
        text-transform: none
    }
    button, html [type="button"], [type="reset"], [type="submit"] {
        -webkit-appearance: button
    }
    [disabled] {
        cursor: default
    }
    [type="checkbox"],
    [type="radio"] {
        box-sizing: border-box;
        padding: 0
    }
    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
        height: auto
    }
    [type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px
    }
    [type="search"]::-webkit-search-cancel-button,
    [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none
    }
    ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit
    }
    textarea {
        overflow: auto;
        resize: none;
        vertical-align: top
    }
    optgroup {
        font-weight: bold
    }
    input,
    select,
    textarea {
        outline: 0
    }
    textarea,
    input {
        -webkit-user-modify: read-write-plaintext-only
    }
    input::-ms-clear,
    input::-ms-reveal {
        display: none
    }
    input:-ms-input-placeholder,
    textarea:-ms-input-placeholder {
        color: inherit;
        opacity: 0.54
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
        color: inherit;
        opacity: 0.54
    }
    table {
        border-collapse: collapse;
        border-spacing: 0
    }
    td,
    th {
        padding: 0
    }
    h1, h2, h3, h4, h5, h6, p, figure, form, blockquote {
        margin: 0
    }
    ul, ol, li, dl, dd {
        margin: 0;
        padding: 0
    }
    ul, ol {
        list-style: none outside none
    }
    h1, h2, h3, h4, h5, h6 {
        font-size: 100%;
        font-weight: normal;
        line-height: 2
    }
    * {
        box-sizing: border-box
    }
</style>
