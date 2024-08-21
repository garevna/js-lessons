const section = document.body

const step = Math.PI / 10

section.style = 'padding: 120px;'

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

const sin = num => createPoint(num * step * 30, Math.sin(num * step) * 100, '#09b')
const cos = num => createPoint(num * step * 30, Math.cos(num * step) * 100)

const recurseSin = (times => {
  let counter = 0
  let promise = (async () => sin(0))()
  return function () {
    promise = promise.then(sin.bind(null, counter))
    counter++ < times && requestAnimationFrame(recurseSin)
  }
})(20)

const recurseCos = (times => {
  let counter = 0
  let promise = (async () => cos(0))()
  return function () {
    promise = promise.then(cos.bind(null, counter))
    counter++ < times && requestAnimationFrame(recurseCos)
  }
})(20)

recurseSin()
recurseCos()
