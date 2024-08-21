const section = document.body

section.style.fontFamily = 'monospace'

const show = message => section
  .appendChild(document.createElement('pre'))
  .innerText = JSON.stringify(message, null, '  ')
    .replace('"status"', 'status')
    .replace('"value"', 'value')
    .replace('"reason"', 'reason')
const log = messages => messages.forEach(show)

const promises = ['map', 'google', 'research', 'store'].map(item => Promise.resolve(item))
promises.push(new Promise((resolve, reject) => setTimeout(reject, 100, 'Access denied.')))

Promise.allSettled(promises).then(log)
