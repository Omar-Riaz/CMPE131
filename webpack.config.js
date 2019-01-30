const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');
module.exports = {
  entry: {
    popup: './src/popup.js',
    annotations_list: './src/annotations_list.js',
    annotations_modal: './src/annotations_modal.js',
    annotationFunctions: "./src/annotationFunctions.js",
    annotationMap: "./src/data_structs/annotationMap.js",
    prepPage: "./src/prepPage.js",
    contentScript: "./src/contentScript.js",
    annotations_mini_modal: './src/annotations_mini_modal.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    // // create CSS file with all used styles
    // new ExtractTextPlugin('bundle.css'),
    // // create popup.html from template and inject styles and script bundles
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['popup'],
      filename: 'popup.html',
      template: './src/popup.html'
    }),
    // copy extension manifest and icons
    new CopyWebpackPlugin([
      { from: './src/manifest.json' },
      { context: './src/assets', from: 'icon-**', to: 'assets' }
    ]),
    new WebpackNotifierPlugin({alwaysNotify: true}),
    new ChromeExtensionReloader()
  ]
};