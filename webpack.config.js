const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const INCLUDE_PATHS = [path.resolve(__dirname, 'src')];

module.exports = {
   entry: "./src/index.js",
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "bundle.js"
   },
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
      stats: 'errors-only',
      headers: {
         'Access-Control-Allow-Origin': '*'
      },
      open: true,
      compress: true
   },
   resolve: {
      extensions: [".webpack.js", ".web.js", ".js"],
      alias: {
         '@' : path.resolve(__dirname, 'src/'),
      }
   }, 
   module: {
      rules: [
         {
            test: /\.json$/,
            loader: 'json'
         },
         { 
            test: /\.js$/,
            loader: 'babel-loader',
            include: INCLUDE_PATHS,
            options: {
               presets: ['@babel/preset-env']
            } 
         },
         {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
               'file-loader'
            ]
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          { 
             test: /\.(woff|woff2|eot|ttf)$/,
             use: [
               'url-loader?limit=100000'
            ]
          }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         title: 'Pixi.js'
      }),
      new webpack.ProvidePlugin({
          PIXI_LAYERS: 'pixi-layers/dist/pixi-layers.js',
          PIXI: 'pixi.js'
      }),
      new CopyWebpackPlugin([
         { from: './src/images', to: 'images' },
         { from: './src/fonts', to: 'fonts' },
          { from: './src/media', to: 'media' }
      ]),
      new CleanWebpackPlugin(['dist']),
   ]
}
