const path = require('path')

module.exports = {
  // Kept between runs so a rebuild only redoes what changed — see the note in
  // the root webpack.config.js. Same bundle, a fraction of the time.
  cache: { type: 'filesystem' },
  context: require('path').resolve(__dirname),
  entry: ['./src/index.js'],
  output: {
    path: require('path').resolve(__dirname, '../public'),
    filename: 'service-worker.js'
  }
}
