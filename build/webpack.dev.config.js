const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
});

const devConfig = merge(baseConfig, {
  //more on https://webpack.js.org/configuration/devtool/
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: false
                }
              }
            ],
            scss: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: false
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: false
                }
              }
            ],
            sass: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: false
                }
              },
              {
                loader: "sass-loader",
                options: {
                  indentedSyntax: true,
                  sourceMap: false
                }
              }
            ],
            postcss: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  minimize: false,
                  sourceMap: false
                }
              }
            ]
          }
        }
      }
    ]
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    //https://github.com/glenjamin/webpack-hot-middleware
    //new webpack.optimize.OccurenceOrderPlugin(), //webpack 1 only
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin(),//webpack 1 only
    new webpack.NoEmitOnErrorsPlugin(),
    //auto inject js css to index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    new FriendlyErrorsPlugin()
  ]
});
module.exports = devConfig;
