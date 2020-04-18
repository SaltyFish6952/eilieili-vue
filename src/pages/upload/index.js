import Vue from 'vue'
import upload from './upload'
import '../../plugins/element.js'

import store from "@/store";

Vue.config.productionTip = false


//mock_api
// import { mockXHR } from '../../../mock'
// if (process.env.NODE_ENV === 'development') {
//   mockXHR()
// }

new Vue({
    el:'#app',
    store,
    render: h => h(upload)})