const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'public', 'lessons')

const dirEntries = fs.readdirSync(dirPath, { withFileTypes: true })

const folders = dirEntries
  .filter(dirent => dirent.isDirectory())

folders.forEach(folder => {
  const folderPath = path.join(dirPath, folder.name)
  const files = fs.readdirSync(folderPath, { withFileTypes: true })
  const list = JSON.stringify(files.map(file => file.name.split('.').slice(0, -1).join('')))

  fs.writeFileSync(path.join(__dirname, `public/files/${folder.name}.json`), list, { encoding: 'utf-8' })

  if (folder.name === 'ru') {
    const toSave = `export const pages = ${list}`
    fs.writeFileSync(path.join(__dirname, 'src/configs/pages.js'), toSave, { encoding: 'utf-8' })
  }
})
