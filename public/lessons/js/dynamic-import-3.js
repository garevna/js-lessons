const mod = document.body
  .appendChild(document.createElement('script'))
mod.type = 'module'
mod.textContent = `
  import { showMessage } from 'https://garevna.github.io/js-samples/js/index41.js';
  showMessage('Hi, students! Welcome to new age of ES Modules!')
`
