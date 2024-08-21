const section = document.body

section.style.fontFamily = 'monospace'

const recurse = (function (start) {
  const timer = section.appendChild(document.createElement('p'))
  return function () {
    timer.innerText = Date.now() - start
    if (Date.now() - start < 5000) requestAnimationFrame(recurse)
    else timer.remove()
  }
})(Date.now())

const show = message => section
  .appendChild(document.createElement('pre'))
  .innerText = JSON.stringify(message, null, '  ')
    .replace('"time"', 'time')
    .replace('"value"', 'value')

    const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
    const random = num => Math.round(Math.random() * num)

    const promises = data.map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))

const results = []
const start = Date.now()
promises.forEach((promise, index) => promise.then(value => { results[index] = { time: Date.now() - start, value } }))

requestAnimationFrame(recurse)

setTimeout(() => results.forEach(show), 5000)
