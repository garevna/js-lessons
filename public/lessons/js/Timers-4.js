const section = document.body

section.style.fontFamily = 'monospace'

let counter = 0
const interval = setInterval(() => counter++, 10)

function show () {
  if (counter > 50) return clearInterval(interval)
  section
    .appendChild(document.createElement('h3'))
    .innerText = counter
  requestAnimationFrame(show)
}

requestAnimationFrame(show)
