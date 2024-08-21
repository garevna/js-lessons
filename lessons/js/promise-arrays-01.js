const section = document.body

section.style.fontFamily = 'monospace'

const show = message => section
  .appendChild(document.createElement('pre'))
  .innerText = message

const data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
const random = num => Math.round(Math.random() * num)

const promises = data.map(item => new Promise(resolve => setTimeout(() => resolve(item), random(5000))))
promises.forEach(promise => promise.then(show))
