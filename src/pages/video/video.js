import Vue from 'vue'
import app from './video.vue'
import '../../plugins/element.js'

Vue.config.productionTip = false

new Vue({

    render: h => h(app),
}).$mount("#video")

