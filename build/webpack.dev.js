const path = require('path')// 路径包
const HtmlWebpackPlugin = require('html-webpack-plugin')// 打包html模版到dist文件夹下面
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 将css文件单独打包
const { CleanWebpackPlugin } = require('clean-webpack-plugin')// 每次打包之前会清除掉之前的包
module.exports = {
  devtool: '#eval-source-map', // 本地开发的时候可以快速定位到相关的位置
  entry: {
    bundle: './src/main.js',
    vendor: ['vue', 'vuex']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name][chunkhash].js'
    // hashDigestLength: 8 // 默认长度是20
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }), // 打包html模版用的webpack插件，html-webpack-plugin
    new ExtractTextPlugin({
      filename: 'css/[name][chunkhash].css' // 路径以及命名
    }), // 打包css文件
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
    port: 9000, // 端口改为9000
    open: true // 自动打开浏览器，适合懒人
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        include: [
          path.resolve(__dirname, '../src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1&name=images/[name].[ext]',
        include: [
          path.resolve(__dirname, '../src')
        ],
        exclude: /node_modules/
      },
      // {
      //   test: /\.lhtml$/,
      //   loader: path.resolve(__dirname, "../loaders/lhtml.js"),
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [
          path.resolve(__dirname, '../src')
        ],
        exclude: /node_modules/
      }
    ]
  }
}
