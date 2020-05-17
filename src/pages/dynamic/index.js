import Vue from 'vue'
import dynamic from './dynamic'
import '../../plugins/element.js'

import store from "@/store";



Vue.config.productionTip = false



new Vue({
    el:'#app',
    store,
    render: h => h(dynamic)})