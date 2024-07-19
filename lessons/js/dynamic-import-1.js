const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
mod.textContent = `
  const section = document
    .querySelector('[script="dynamic-import-1.js"]')
    .shadowRoot
    .querySelector('section')
  import { showSlider } from 'https://garevna.github.io/js-samples/js/index40.js'
  showSlider(section)
`
