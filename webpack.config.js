module.exports = {
    entry: './app.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module:{
        loaders: [
            {
              test: /\.scss$/,
              loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.js|jsx$/,
                loader: "babel-loader",
                query: {presets: ['es2015']},
                exclude: /node_modules/
            },
        ]
    }
}

