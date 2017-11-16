const merge = require('webpack-merge');
const common = require('./webpack.base.config.js');
module.exports = merge(common, {
  entry: [
    // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './app.js'
  ],
    output: {
        path: __dirname,
        filename: "[name].js"
  },
  devtool: 'inline-source-map',
});
