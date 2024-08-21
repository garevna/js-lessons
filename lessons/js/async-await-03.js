const section = document.body
section.style = 'padding-top: 120px;'

const start = Date.now()

const step = Math.PI / 10

const sin = num => createPoint(num * step * 8, Math.sin(num * step) * 80, '#09b')
const cos = num => createPoint(num * step * 8, Math.cos(num * step) * 80)

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

const recurseSin = (times => {
  let counter = 0
  let promise = (async () => sin(0))()
  return function () {
    promise = promise.then(sin.bind(null, counter))
    counter++ < times && requestAnimationFrame(recurseSin)
  }
})(90)

const recurseCos = (times => {
  let counter = 0
  let promise = (async () => cos(0))()
  return function () {
    promise = promise.then(cos.bind(null, counter))
    counter++ < times && requestAnimationFrame(recurseCos)
  }
})(90)

function createFigure () {
  const figure = section
    .appendChild(document.createElement('div'))
  return Object.assign(figure, {
    style: `
      position: absolute;
      top: 108px;
      left: 48px;
      width: 100px;
      height: 100px;
      border-radius: 4px;
      background: #fa0;
    `,
    move () {
      const { left } = figure.style
      Object.assign(figure.style, {
        left: parseInt(left) + 4 + 'px'
      })
      Date.now() - start < 4000 && requestAnimationFrame(figure.move)
    }
  })
}

recurseSin()
recurseCos()
const figure = createFigure()
figure.move()
