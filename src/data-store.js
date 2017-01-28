/**
 * Created by xueliang.chen on 2017/1/25.
 */
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

if(!localStorage){
    var vm = this
    vm.axios.get('https://yesno.wtf/api')
        .then(function (response) {
            localStorage.msg = "12"
        })
        .catch(function (error) {
            localStorage.msg = "23"
        })
}

export default {
    fetch () {
        return JSON.parse(localStorage);
    }
};

