const section = document.body

section.style.fontFamily = 'monospace'

const start = Date.now()
const getRandom = () => Math.round(Math.random() * 5000)
const show = resp => section.appendChild(document.createElement('p')).innerText += resp

const test = ms => Date.now() - start >= ms

function func (name, time, callback) {
  test(time)
    ? callback(`${name}: ${time}`)
    : requestAnimationFrame(func.bind(null, name, time, callback))
}

function createPromise (name, time) {
  return new Promise(func.bind(null, name, time))
}

;['First', 'Second', 'Third']
  .forEach(name => createPromise(name, getRandom()).then(show))
