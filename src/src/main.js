import Vue from 'vue'
import router from './router'
import App from './App'
import './common/style/icon.css'

import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex'
import store from './store'


var app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})