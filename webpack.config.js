'use strict';

const webpack = require('webpack');
const path = require('path');

const SRC = path.join(__dirname, 'app');
const DIST = path.join(__dirname, 'dist');

let cssLoader = 'style-loader!css-loader!sass-loader';
let sourcemap = 'inline-source-map';

module.exports = {
  entry: path.join(SRC, 'main.js'),
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: cssLoader,
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /node_modules/
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?jQuery!expose-loader?$'
      }
    ]
  },
  devServer: {
    publicPath: '/dist/'
  },
  stats: {
    colors: true
  },
  devtool: sourcemap
};
