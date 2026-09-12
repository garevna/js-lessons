// ESM, because package.json declares "type": "module" — a CommonJS config
// (require / module.exports / __dirname) throws "require is not defined in ES
// module scope" under current webpack-cli. The worker sub-projects declare no
// "type", so their configs stay CommonJS.

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

export default {
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
        // Under "type": "module" webpack resolves imports the strict ESM way,
        // where './components/glitch' must carry its .js extension. The source
        // omits extensions throughout, so relax it rather than rewrite every
        // import in the tree.
        test: /\.m?js$/,
        resolve: { fullySpecified: false }
      }
    ]
  }
}
