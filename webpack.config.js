var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: 'es2015'
        }
      }
    ]
  },
  plugins: [
    // this is here purely for chessboard js :(
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
};
