const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');

module.exports = {
  // Entry files for our popup and background pages
  entry: {
    popup: './src/popup.js',
    annotations_list: './src/annotations_list.js',
    annotations_modal: './src/annotations_modal.js',
    annotationFunctions: "./src/annotationFunctions.js",
    prepPage: "./src/prepPage.js",
    contentScript: "./src/contentScript.js",
    annotations_mini_modal: './src/annotations_mini_modal.js'
  },
  // Extension will be built into ./dist folder, which we can then load as unpacked extension in Chrome
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  // Here we define loaders for different file types
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
					presets: ['es2017', 'react'],
					plugins: ["transform-class-properties"]
                }
            },
            {
                test: /.jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
					presets: ['es2017', 'react'],
					plugins: ["transform-class-properties"]
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
}
