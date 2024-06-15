const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'public', 'lessons')

const dirEntries = fs.readdirSync(dirPath, { withFileTypes: true })

const list = dirEntries
  .filter(file => file.name.slice(-3) === '.md')
  .map(file => file.name.slice(0, -3))

const toSave = `export const pages = ${JSON.stringify(list)}`

fs.writeFileSync(path.join(__dirname, 'src/configs/pages.js'), toSave, { encoding: 'utf-8' })
