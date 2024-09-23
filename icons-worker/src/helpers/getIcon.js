const data = require('../assets').default
const { icons } = require('../configs').default

export function getIcon (key) {
  return Object.keys(data).includes(key)
    ? data[key]
    : icons[key] ? data[icons[key]] : data.default
}
