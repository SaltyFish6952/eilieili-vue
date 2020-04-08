import '../../plugins/element.js'
import app from "./login.vue"
import Vue from 'vue'
import store from "@/store";

Vue.config.productionTip = false

//mock_api
import {mockXHR} from '../../../mock'

if (process.env.NODE_ENV === 'development') {
    mockXHR()
}

// eslint-disable-next-line no-unused-vars
var video = new Vue({
    store,
    render: h => h(app),
}).$mount("#app")

window.console.log("i am created login VUE")

