#!/usr/bin/env node
/**
 * Turns an .svg file into an icon the lessons can write.
 *
 *   npm run icon public/icons/toilet.svg
 *   npm run icon public/icons/mdn.svg mozilla
 *
 * The second argument is the name ![ico-20 name] will use, when it differs
 * from the file's. Without it the file's own name is used.
 *
 * The worker does not read files: every icon is a module exporting a data URI,
 * picked up by require.context and keyed by its filename. So the picture is
 * encoded into icons-worker/src/assets/<name>.js, and a name that cannot be a
 * JavaScript identifier — arrow-right — becomes arrow_right there, with the
 * written form added to configs/icons.js as an alias.
 *
 * Afterwards: npm run icons-worker
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const ASSETS = path.join(root, 'icons-worker/src/assets')
const CONFIG = path.join(root, 'icons-worker/src/configs/icons.js')

const file = process.argv[2]

if (!file) {
  console.log('\n  npm run icon <путь к svg> [имя для ![ico-20 ...]]\n')
  process.exit(1)
}

const source = path.resolve(process.cwd(), file)

if (!fs.existsSync(source)) {
  console.log(`\n  Нет такого файла: ${file}\n`)
  process.exit(1)
}

const written = process.argv[3] || path.basename(source).replace(/\.svg$/i, '')
const identifier = written.replace(/[^A-Za-z0-9_]/g, '_')

const svg = fs.readFileSync(source)

if (!/^\s*(<\?xml|<svg|<!--)/.test(svg.toString('utf8').slice(0, 200))) {
  console.log(`\n  ${file} не похож на svg.\n`)
  process.exit(1)
}

// base64 rather than the percent-encoded form: it cannot be broken by a
// quote, a hash or a bracket inside the drawing, and url() takes it as is.
const uri = 'data:image/svg+xml;base64,' + svg.toString('base64')

const target = path.join(ASSETS, identifier + '.js')
const existed = fs.existsSync(target)

fs.writeFileSync(target, `/** ${path.basename(source)} */\nexport const ${identifier} = \`${uri}\`\n`)

console.log(`\n  ${existed ? 'перезаписан' : 'создан'}: icons-worker/src/assets/${identifier}.js   (${Math.round(uri.length / 1024 * 10) / 10} КБ в виде data-URI)`)

if (identifier !== written) {
  const config = fs.readFileSync(CONFIG, 'utf8')
  const alias = `  '${written}': '${identifier}',`

  if (config.includes(`'${written}'`)) {
    console.log(`  алиас '${written}' в configs/icons.js уже есть — не трогаю`)
  } else {
    const at = config.lastIndexOf('\n}')
    fs.writeFileSync(CONFIG, config.slice(0, at) + ',\n' + alias.replace(/,$/, '') + config.slice(at))
    console.log(`  добавлен алиас: '${written}' -> ${identifier}`)
  }
}

console.log(`\n  в уроке:  ![ico-20 ${written}]`)
console.log('  собрать:  npm run icons-worker\n')
