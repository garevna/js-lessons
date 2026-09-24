// CommonJS on purpose. The source mixes ESM exports with require() calls —
// webpack only accepts that combination in its "javascript/auto" mode, which
// it uses for .js files unless package.json declares "type": "module".
// Declaring the package as ESM makes webpack treat every .js file as strict
// ESM, where require is undefined: the build then succeeds and the bundle
// throws "require is not defined" in the browser.

const path = require('path')

module.exports = {
  // Webpack keeps its work on disk between runs, so a rebuild only redoes the
  // modules that actually changed. The bundle is byte-identical either way —
  // this is the difference between waiting a few seconds after every edit and
  // waiting a few hundred milliseconds. The cache lives in node_modules/.cache
  // and invalidates itself when the config, a loader or a dependency changes.
  cache: { type: 'filesystem' },
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
