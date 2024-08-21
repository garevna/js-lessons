const section = document.body

section.style.fontFamily = 'monospace'

const warn = `
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#f85" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16" style="vertical-align: middle;">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
  </svg>
`

const show = message => section.appendChild(document.createElement('p')).innerText = message
const log = messages => messages.forEach(show)

function warning (error) {
  const message = section
    .appendChild(document.createElement('p'))
  message.innerHTML = warn + ' <span style="color: #bbb"> ► </span>Error: ups...'
  message.style = `
    border-radius: 4px;
    padding: 4px 8px;
    background: #9907;
    color: #dd7;
  `
}

const executor = (resolve, reject) => Math.random() > 0.5 ? resolve('success') : reject(new Error('ups...'))

const promises = new Array(10).fill(new Promise(executor))

Promise.all(promises)
  .then(log, warning)
