var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: '#source-map',
    entry: "./app/app.js",
    output: {
        filename: "public/js/bundle.js",
        sourceMapFilename: "public/js/bundle.map"
    },
    devServer: {
      inline:true,
      port: 3000
    },
    externals: {
      'Config': JSON.stringify(require('./config.json'))
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              loaders: ['babel'],
              exclude: /node_modules/
            },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract( "style", "css!sass")
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
      new ExtractTextPlugin("./public/css/style.css", { allChunks: true })
    ]
}
