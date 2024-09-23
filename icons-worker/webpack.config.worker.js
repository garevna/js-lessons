const path = require('path')

module.exports = {
  context: require('path').resolve(__dirname),
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: require('path').resolve(__dirname, '../public'),
    filename: 'icons.worker.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
