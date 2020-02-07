import Vue from 'vue'
import app from './video.vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

import '../../plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$video = videojs

new Vue({

    render: h => h(app),
}).$mount("#video")

