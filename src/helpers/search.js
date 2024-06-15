const { translations } = require('../configs').default

function engChars (string) {
  return string.split('')
    .filter(char => char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122)
    .length
}

function ruChars (string) {
  return string.split('')
    .filter(char => char.charCodeAt(0) >= 1072 && char.charCodeAt(0) <= 1103)
    .length
}

function uaChars (string) {
  return ruChars (string) + string.split('')
      .filter(char => ['ґ', 'є', 'ї', 'і'].includes(char))
      .length
}

function translate (string) {
  const translated = ruChars(string) > 0
    ? Object.keys(translations).find(key => translations[key].includes(string))
    : string
  return translated
}

export function search (event) {
  this.result.innerHTML = ''

  if (!event.target.value) {
    for (const item of this.menuOptions) {
      Object.assign(item.style, { display: 'block' })
      item.submenuOptions.forEach(option => Object.assign(option.style, {
        display: 'block'
      }))
    }
    return
  }

  const searchValue = translate(event.target.value.toLowerCase())

  if (searchValue) {
    const options = Object.keys(this.keywords)
      .filter(key => this.keywords[key].filter(keyword => keyword.includes(searchValue)).length)
    const lessons = Array.from(new Set(options.map(subItem => this.refs[subItem])))

    this.menuOptions.forEach(item => {
      Object.assign(item.style, {
        display: lessons.includes(item.id) ? 'block' : 'none'
      })
      item.submenuOptions.forEach(option => Object.assign(option.style, {
        display: options.includes(option.ref) ? 'block' : 'none'
      }))
    })
  }
}
