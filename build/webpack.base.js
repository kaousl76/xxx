// 使用路径模块
const path = require('path')

// 导入插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 模式
  // 入口
  entry: './src/main.js',
  devtool: 'eval',
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true
  },
  // 出口
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  // 打包规则
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.(jpg|jpeg|png|svg)$/,
      loader: 'file-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
  // 插件
  Plugin: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}
