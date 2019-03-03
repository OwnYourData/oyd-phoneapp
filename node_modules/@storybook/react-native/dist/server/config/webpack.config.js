'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getConfig = function getConfig(options) {
  return {
    devtool: '#cheap-module-eval-source-map',
    entry: {
      manager: [require.resolve('../../manager')]
    },
    output: {
      path: _path2.default.join(__dirname, 'dist'),
      filename: 'static/[name].bundle.js',
      publicPath: '/'
    },
    plugins: [new _htmlWebpackPlugin2.default({
      filename: 'index.html',
      data: {
        options: (0, _stringify2.default)(options)
      },
      template: require.resolve('../index.html.ejs')
    }), new _utils.OccurenceOrderPlugin(), new _webpack2.default.HotModuleReplacementPlugin(), new _caseSensitivePathsWebpackPlugin2.default()],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        query: require('./babel.js'), // eslint-disable-line
        include: _utils.includePaths,
        exclude: _utils.excludePaths
      }, {
        test: /\.md$/,
        use: [{
          loader: 'html-loader'
        }, {
          loader: 'markdown-loader'
        }]
      }]
    }
  };
};

exports.default = getConfig;