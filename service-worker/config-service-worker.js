const fs = require('fs-extra')
const path = require('path')

const json = fs.readJsonSync(path.join(__dirname, './package.json'))

function updateVersionNumber (version) {
  const nums = version.split('.').map(val => Number(val))
  if (nums[2] < 9) ++nums[2]
  else {
    nums[2] = 0
    if (nums[1] < 9) ++nums[1]
    else {
      nums[1] = 0
      ++nums[0]
    }
  }
  return nums.join('.')
}

json.version = updateVersionNumber(json.version)

fs.writeJsonSync(path.join(__dirname, './package.json'), json)
fs.writeFileSync(path.join(__dirname, '../src/configs/serviceWorkerVersion.js'), `export const serviceWorkerVersion = "${json.version}"`)
fs.writeFileSync(path.join(__dirname, '../src/configs/serviceWorkerDate.js'), `export const serviceWorkerDate = "${new Date().toISOString().slice(0, 10)}"`)

const dirPath = path.join(__dirname, '../public/lessons')

const dirEntries = fs.readdirSync(dirPath, { withFileTypes: true })

const folders = dirEntries
  .filter(dirent => dirent.isDirectory())

const result = {}

folders.forEach(folder => {
  const folderPath = path.join(dirPath, folder.name)
  const files = fs.readdirSync(folderPath, { withFileTypes: true })

  const fileList = files.map(file => file.name)

  fileList.forEach(fileName => {
    const filePath = `${dirPath}/${folder.name}/${fileName}`
    const lastModified = fs.statSync(filePath).mtime
    Object.assign(result, { [`${folder.name}/${fileName}`]: lastModified })
  })
})

;[
  'index.js',
  'content.worker.js',
  'icons.worker.js',
  'main-menu.js',
  'donate.js',
  'registerServiceWorker.js',
  'service-worker.js'
].forEach(fileName => Object.assign(result, { [fileName]: fs.statSync(path.join(__dirname, `../public/${fileName}`)).mtime }))

const list = JSON.stringify(result, null, '\t').replaceAll('"', '\'')

const content = `export const versions = ${list}`

fs.writeFileSync(path.join(__dirname, `src/configs/versions.js`), content, { encoding: 'utf-8' })
