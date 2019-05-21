const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { spawn } = require('child_process');

const nodeExternals = require('webpack-node-externals');

// mode
const isPROD = process.argv[process.argv.indexOf('--mode')+1] === 'production'

// Config directories
const SRC_DIR = path.resolve(__dirname, './../app');
const DIST_DIR = path.resolve(__dirname, './../dist');

// Any directories you will be adding code/files into, need to be
// added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR];


// Electron main
const mainCfg = {
  target: 'electron-main',
  entry: { main: SRC_DIR + '/main.js' },
};

// Electron renderer
const rendererCfg = {
  target: 'electron-renderer',
  entry: { index: SRC_DIR + '/src/index.js' },
  plugins: [
    isPROD 
      ? new CleanWebpackPlugin({ 
          dry: false,
          cleanOnceBeforeBuildPatterns: ['*', '!pyserver'],
        })
      : () => {},
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/src/template/default.ejs',
      chunks: ['index'],
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    isPROD ? new OptimizeCSSAssetsPlugin({}) : () => {}
  ],
  // devtool: 'cheap-source-map',
  devServer: {
    // hot: true,
    contentBase: DIST_DIR,
    port: 3000,
    watchContentBase: true,
    stats: {
      colors: true,
      chunks: false,
      children: false
    },
    before: (app, server) => {
      // launch electron process
      spawn(
        'electron',
        ['./dist/start.and.watch.js'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
      .on('close', code => process.exit(0))
      .on('error', spawnError => console.error(spawnError));
    }
  }
};

// relaunch python api on change
const watchCfg = {
  target: 'electron-main',
  entry: { 'start.and.watch': './utils/start.and.watch.js' },
  externals: [nodeExternals()] // for 'zmq.node not to choke the system'
};

// Commun config
const sharedCfg = {
  output: {
    path: DIST_DIR,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        include: defaultInclude
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [ 
          MiniCssExtractPlugin.loader,
          "css-loader" ,
          'sass-loader',
        ],
        include: defaultInclude
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: { name: '[name].[ext]?[hash]' },
        include: defaultInclude
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  node :{
    __dirname: false
  },
  resolve: {
      extensions: ['.js', '.json'],
  }
}

module.exports = [
  Object.assign(rendererCfg, sharedCfg),
  Object.assign(mainCfg, sharedCfg),
  Object.assign(watchCfg, sharedCfg)
]
