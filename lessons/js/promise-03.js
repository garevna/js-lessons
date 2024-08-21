const section = document.body

section.style.letterSpacing = '1.5px'

function output (result) {
  section
    .appendChild(document.createElement('h4'))
    .innerText = result
}

function createPromise (startTime, title) {
  const interval = Math.round(Math.random() * 5000)
  function recurse (callback) {
    const time = Date.now() - startTime
    time < interval
      ? requestAnimationFrame(recurse.bind(null, callback))
      : callback(`${title}: ${Date.now() - startTime}`)
  }
  return new Promise(resolve => recurse(resolve))
}

const first = createPromise(Date.now() + 10, 'first')
const second = createPromise(Date.now() + 5, 'second')
const third = createPromise(Date.now(), 'third')

first.then(output)
second.then(output)
third.then(output)
