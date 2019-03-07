const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const tsConfig = {
  entry: path.join(__dirname, 'src', 'app', 'index.tsx'),
  mode: 'production',
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
  target: 'web',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
};

const sassConfig = {
  entry: path.join(__dirname, 'src', 'app', 'styles', 'index.scss'),
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'public', 'css')
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ],
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
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/css/images',
              outputPath: 'images/'
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
};

module.exports = [
  tsConfig,
  sassConfig,
]
