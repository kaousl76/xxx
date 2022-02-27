import request from '../utils/request'
import Axios from 'axios'
import Vue from 'vue'
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Vue.config.productionTip = false
export const getImage = () => {
  return request({
    method: 'GET',
    url: '/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN'
  })
}
