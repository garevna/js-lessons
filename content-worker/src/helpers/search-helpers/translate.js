import { ruChars } from './ruChars'

const { translations } = require('../../configs').default

export function translate (string) {
  const translated = ruChars(string) > 0
    ? Object.keys(translations).find(key => translations[key].includes(string))
    : string
  return translated
}
