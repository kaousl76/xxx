import axios from 'axios'

const request = axios.create({
  baseURL: 'https://cn.bing.com'
})

export default request
