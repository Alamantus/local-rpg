const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackExport = require('./webpack.config.base.js');

webpackExport.entry = path.resolve(__dirname, 'src/client', 'index.js');
webpackExport.output.path = path.resolve(__dirname, 'build/client');
webpackExport.output.filename = 'local-rpg.js';

webpackExport.plugins.push(new webpack.DefinePlugin({
  BASEPATH: JSON.stringify(''),
}));
webpackExport.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
}));
webpackExport.plugins.push(new HtmlWebpackPlugin({
  template: 'src/client/index.html',
  filename: 'client.html',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
  inject: true,
}));

webpackExport.devtool = 'source-map';

module.exports = webpackExport;
