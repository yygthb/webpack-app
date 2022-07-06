const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isProd ? false : 'source-map',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    filename: isProd ? 'scripts.[contenthash].js' : 'scripts.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      favicon: './public/favicon.svg',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? 'styles.[contenthash].css' : 'styles.css',
    }),
    ...(isProd ? [new ESLintPlugin({ extensions: ['ts'] })] : []),
  ],
  module: {
    rules: [
      {
        test: /\.ts/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    open: true,
    port: 8080,
  },
};
