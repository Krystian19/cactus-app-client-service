const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const tsConfig = {
  entry: path.join(__dirname, 'src', 'app', 'index.tsx'),

   // Using production mode tag in development, to avoid a webpack build bug
  mode: 'production',

  devtool: 'inline-source-map',
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

   // Using production mode tag in development, to avoid a webpack build bug
  mode: 'production',

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
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/css/fonts',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
    ]
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
};

module.exports = [
  tsConfig,
  sassConfig,
]
