const section = document.body

function message (text, start) {
  section
    .appendChild(document.createElement('p'))
    .innerHTML = `${Date.now() - start}: ${text}`
}

const figureStyle = `
  position: absolute;
  top: 140px;
  left: 48px;
  transition: all .5s;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background: #fa0;
`

function demo () {
  const start = Date.now()
  message('Well, you\'re screwed, kid, now wait for the cycle to complete....', start)
  const figure = section.appendChild(document.createElement('div'))

  Object.assign(figure, {
    style: figureStyle,
    move () {
      const { left } = figure.style
      Object.assign(figure.style, {
        left: parseInt(left) + 2 + 'px'
      })
      Date.now() - start < 10000 && requestAnimationFrame(figure.move)
    }
  })

  figure.move()

  setTimeout(function () {
    message('<b>Loop started</b>', start)
    for (var x = 0; x < 10000000000; x++) continue
    message('<b>Loop finished</b>', start)
  }, 0)
}

setTimeout(() => requestAnimationFrame(demo), 500)
