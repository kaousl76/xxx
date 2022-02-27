const baseConfig = require('./webpack.base.js')
const merge = require('webpack-merge')
const proConfig = {
  // 模式
  mode: 'production' // development production

}

module.exports = merge(baseConfig, proConfig)
