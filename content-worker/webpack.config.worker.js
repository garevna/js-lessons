const path = require('path')

module.exports = {
  // Kept between runs so a rebuild only redoes what changed — see the note in
  // the root webpack.config.js. Same bundle, a fraction of the time.
  cache: { type: 'filesystem' },
  context: require('path').resolve(__dirname),
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: require('path').resolve(__dirname, '../public'),
    filename: 'content.worker.js'
  },
  module: {
    rules: [
      {
        test: /\.md/i,
        use: 'raw-loader'
      },
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
