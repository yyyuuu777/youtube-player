var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: './app.js',
    output: {
        path: __dirname,
        filename: "[name].js"
    },
    devtool: "source-map",
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
                                sourceMap: false
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
        new webpack.optimize.CommonsChunkPlugin('common')
    ],
    devServer: {
        contentBase: path.join(__dirname, ""),
        compress: true,
        port: 9100
    }
}

