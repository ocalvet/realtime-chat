const path = require('path')

module.exports = {
  entry: {
    'client/bundle': './client/main.js',
    'server/index': './server/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
    noParse: /uws/
  },
  resolve: {
    extensions: ['*', '.js']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    uws: 'empty'
  },
  externals: ['uws']
}
