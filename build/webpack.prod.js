const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.base.config.js');
var path = require('path')
module.exports = merge(common, {
  devtool: 'source-map',
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: "[name].js"
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
});
