import Vue from 'vue'
import home from './home'
import '../../plugins/element.js'
import router from './router'
import store from "@/store";



Vue.config.productionTip = false



new Vue({
    el:'#app',
    store,
    router,
    render: h => h(home)})