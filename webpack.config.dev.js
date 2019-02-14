const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const tsConfig = {
  entry: path.join(__dirname, 'src', 'app', 'index.tsx'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'public', 'js')
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
  target: 'web',
};

const sassConfig = {
  entry: path.join(__dirname, 'src', 'app', 'styles', 'index.scss'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public', 'css')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.min.css",
    })
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ]
  },
};

module.exports = [
  tsConfig,
  sassConfig,
]
