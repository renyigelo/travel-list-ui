<template>
    <div id="app">
        <img src="./assets/logo.png">
        <h1>{{ msg }}</h1>
        <mt-button v-bind:ab="test" @click.native="startHacking"
                   v-bind:class="{ 'active': isActive, 'text-danger': hasError }">{{ msg }}
        </mt-button>
        <div>
            <mt-cell v-bind:title="menu.title"
                     @click.native="startHacking"
                     is-link v-for="(menu,index) in menus">
                <mt-badge size="small">{{menu.size}}</mt-badge>
            </mt-cell>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data () {
            return {
                msg: 2,
                isActive: true,
                hasError: true,
                test: 'abc',
                menus:[
                    { title:'t1', size:5},
                    { title:'t2', size:6}
                ]
            }
        },
        methods: {
            startHacking () {
                this.$toast('It Works!')
            },
        },
        created (){
            var vm = this
            vm.axios.get('http://127.0.0.1:8084/list')
                .then(function (response) {
                    vm.msg = response
                })
                .catch(function (error) {
                    vm.msg = error
                })
        }
    }

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
