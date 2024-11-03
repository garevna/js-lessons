const path = require('path')

module.exports = {
  context: require('path').resolve(__dirname),
  entry: ['./src/index.js'],
  output: {
    path: require('path').resolve(__dirname, '../public'),
    filename: 'service-worker.js'
  }
}
