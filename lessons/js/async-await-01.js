const section = document.body

section.style = 'padding: 120px;'

const step = Math.PI / 10

function createPoint (x, y, color = '#f50') {
  const point = section
    .appendChild(document.createElement('span'))
  point.innerText = '•'
  point.style = `
    position: relative;
    left: ${x.toFixed(2)}px;
    top: ${y.toFixed(2)}px;
    color: ${color};
  `
}

let num = 0

const sin = () => createPoint(num * step * 30, Math.sin(num * step) * 100, '#09b')
const cos = () => createPoint(num * step * 30, Math.cos(num * step) * 100)
const next = () => num++

const start = () => (async () => sin())().then(cos).then(next)

start()
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
  .then(start)
