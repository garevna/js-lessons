import { icon } from './icon'
import { ico } from './ico'

const { createPath, minifier } = require('../helpers').default
const { iconFiles } = require('../configs').default

function createStyle (className, backgroundImage) {
  const path = `url(${createPath('icons', backgroundImage)})`
  return `.${className}{background-image: ${path};}`
}

let styles = Object.keys(iconFiles)
  .map(key => createStyle(key, iconFiles[key]))
  .join('')

export const iconStyles = styles + minifier(icon) + minifier(ico)
