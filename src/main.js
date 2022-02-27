import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import './style/global.css'
import './icon/icon.css'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Axios from 'axios'
import router from './router'

Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
