/**
 * @author Jan Guzman <janfrancisco19@gmail.com>
 * @desc Webpack module bundler configuration for production
 */

const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 400
  },

  // Js Minification configuration 
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
}