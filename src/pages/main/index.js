import Vue from 'vue'
import main from './main'
import '../../plugins/element.js'
import router from './router'
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
  router,
  render: h => h(main)})
// }).$mount('#app')


window.console.log("i am created main VUE")