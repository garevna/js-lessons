// See webpack.config.js for why this is CommonJS.
//
// The entry list matches the production config: 'main-menu' was missing here,
// so a development build produced no main-menu.js while the service worker
// expects one.

const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/start.js',
    donate: './src/donate.js',
    'main-menu': './src/main-menu.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    clean: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
