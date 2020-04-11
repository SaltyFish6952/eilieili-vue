import Vue from 'vue'
import app from './video.vue'
import store from "@/store";
import router from './router'


import '../../plugins/element.js'

Vue.config.productionTip = false

//mock_api
// import {mockXHR} from '../../../mock'

// if (process.env.NODE_ENV === 'development') {
//     mockXHR()
// }

new Vue({
    store,
    router,
    render: h => h(app),
}).$mount("#app")

