'use strict';

const webpack = require('webpack');
const path = require('path');
const Extract = require('extract-text-webpack-plugin');

const SRC = path.join(__dirname, 'app');
const DIST = path.join(__dirname, 'dist');

const extractCss = new Extract('main.css');
let cssLoader = 'style-loader!css-loader!sass-loader!import-glob-loader';
let sourcemap = 'inline-source-map';
let plugins = [
  extractCss,
];

if (process.env.ENV === 'production') {
  cssLoader = extractCss.extract([
    'css-loader',
    'sass-loader',
    'import-glob-loader',
  ]);
  sourcemap = 'source-map';
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    sourceMap: true,
  }))
}

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
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        query: {
          name: '../dist/images/[name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|woff2?|svg)(\?v=.*)?$/,
        loader: 'file-loader',
        query: {
          name: '../dist/fonts/[name].[ext]'
        }
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
  plugins: plugins,
  devtool: sourcemap
};
