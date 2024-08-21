const section = document.body

section.style.fontFamily = 'monospace'

const warn = `
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#f85" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16" style="vertical-align: middle;">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
  </svg>
`

function output (error) {
  const mess = section
    .appendChild(document.createElement('p'))
  mess.innerHTML = warn + `<span style="color: #bbb"> ► </span> (${error.code}) ${error.name}: ${error.message}`
  mess.style = `
    border-radius: 4px;
    padding: 4px 8px;
    background: #9907;
    color: #dd7;
  `
}

Object.defineProperty(Error.prototype, 'name', {
  get () { return this.errorNames[this.code] }
})

Object.defineProperty(Error.prototype, 'message', {
  get () { return this.messages[this.code] }
})

Object.assign(Error.prototype, {
  errorNames: [
    'CustomError',
    'RandomError',
    'FatalError',
    'GameOver',
    'Shit',
    'FuckingError',
    'StrangeError',
    'XSS',
    'DoS',
    'DDoS'
  ],
  messages: [
    'Not authorized.',
    'Something happens...',
    'Access denied.',
    'Try another way.',
    'You are the kremlin troll.',
    'Operation failed.',
    'Unknown operation.',
    'Malicious code injection.',
    'Denial-of-service attack.',
    'Distributed denial-of-service attack.'
  ]
})

const func = callback => callback(Object.assign(new Error(), { code: Math.round(Math.random() * 9) }))

const getError = (resolve, reject) => setTimeout(func.bind(null, reject), Math.random() * 10000)

for (let num = 0; num < 10; num++) {
  new Promise(getError)
    .then(null, output)
}
