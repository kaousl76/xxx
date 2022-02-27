module.exports = {
  devServer: {
    proxy: {
      // 名字可以自定义，这里我用的是api
      '/api': {
        target: '', // 设置你调用的接口域名和端口号
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    port: 1234
  }
}
