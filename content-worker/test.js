const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'src/lessons')

const dirEntries = fs.readdirSync(dirPath, { withFileTypes: true })

const folders = dirEntries
  .filter(dirent => dirent.isDirectory())

folders.forEach(folder => {
  const folderPath = path.join(dirPath, folder.name)
  const files = fs.readdirSync(folderPath, { withFileTypes: true })
  const list = JSON.stringify(files.map(file => file.name.split('.').slice(0, -1).join('')))
    .replaceAll('"', '\'')

  const content = `export const ${folder.name} = ${list}`

  fs.writeFileSync(path.join(__dirname, `src/configs/${folder.name}.js`), content, { encoding: 'utf-8' })

  if (folder.name === 'ru') {
    const pages = `export const pages = ${list}`
    fs.writeFileSync(path.join(__dirname, 'src/configs/pages.js'), pages, { encoding: 'utf-8' })
  }
})
