import Vue from 'vue'
import admin from './admin'
import '../../plugins/element.js'
import router from "./router";
import store from "@/store";


Vue.config.productionTip = false


new Vue({
    el: '#app',
    store,
    router,
    render: h => h(admin)
})