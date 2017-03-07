const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const config = require('../config');
const tool = require('./tool');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ProdConfig = merge(baseConfig, {
  devtool: '#source-map',
  output: {
    path: config.build.staticRoot,
    filename: tool.staticPath('js/[name].[chunkhash].js'),
    chunkFilename: tool.staticPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          //https://github.com/ai/browserslist
          postcss: require('autoprefixer'),
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    //doesn't work ?
                  }
                }
              ],
              fallback: 'vue-style-loader', // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            })
          }
        }
      }
    ]
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    /*new webpack.optimize.UglifyJsPlugin({
     compress: {
     warnings: false,
     drop_debugger: true,
     drop_console: true
     },
     sourceMap: true
     //sourceMap: config.build.productionSourceMap
     }),*/
    //extract css  into one files?
    new ExtractTextPlugin({
      filename: tool.staticPath('css/[name].[contenthash].css')
    }),
    //solve extract css duplicated problem
    new OptimizeCSSPlugin(),
    //auto inject js css to index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
    //https://webpack.js.org/plugins/commons-chunk-plugin/
    //Generate an extra chunk, which contains common modules shared between entry points.
    //in here we generate chunk,which is from node_modules
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // If module has a path, and inside of the path exists the name "/\.js$/",like vue jq ...
        // only vendor node_modules file
        //console.log(JSON.stringify(module.resource)+'>>>>>>\n\n')
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever main.js bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
  ]
});
module.exports = ProdConfig;
