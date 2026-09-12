// See webpack.config.js for why this is ESM.
//
// The entry list now matches the production config: 'main-menu' was missing
// here, so a development build produced no main-menu.js while the service
// worker expects one.

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

export default {
  mode: 'development',
  entry: {
    index: './src/start.js',
    donate: './src/donate.js',
    'main-menu': './src/main-menu.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(root, 'public'),
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
      },
      {
        // See webpack.config.js — extensionless imports under "type": "module".
        test: /\.m?js$/,
        resolve: { fullySpecified: false }
      }
    ]
  }
}
