const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServe: {
    contentBase: './dist'
  },
  Plugin: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname, './node_modules'),
      include: path.resolve(__dirname, './src'),
      options: {
        presets: ['latest']
      }
    },
    {
      test: /\.vue$/,
      use: ['vue-loader']
    }]
  },
  resolve: {
    alias: { vue$: 'vue/dist/vue.esm.js' }
  }
}
