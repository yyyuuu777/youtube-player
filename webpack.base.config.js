var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
    module:{
        loaders: [
            {
              test: /\.scss$/,
              // loader: ExtractTextPlugin.extract('style-loader!css-loader!sass-loader')
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 2,
                                sourceMap: false,
                                minimize: true
                            }
                        },
                        "postcss-loader",
                        {
                            loader:"sass-loader",
                            options: {
                                sourceMap: false
                            }
                        }
                    ]
                })
            },
            {
                test: /\.js|jsx$/,
                loader: "babel-loader",
                query: {presets: ['es2015']},
                exclude: /node_modules/
            },
        ]
    },
    // postcss config
    plugins: [
        new ExtractTextPlugin("style.css"),
        new webpack.optimize.CommonsChunkPlugin('common'),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: './index.html'
        })
    ]
}
