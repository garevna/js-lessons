const section = document.body

const start = Date.now()

function message (text) {
  section
    .appendChild(document.createElement('p'))
    .innerHTML = `${Date.now() - start}: ${text}`
}

const figure = section
  .appendChild(document.createElement('div'))
Object.assign(figure, {
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
      left: parseInt(left) + 2 + 'px'
    })
    Date.now() - start < 5000 && requestAnimationFrame(figure.move)
  }
})

figure.move()

const recurse = (counter => {
  message('<b>Loop started</b>')
  return function () {
    if (counter-- > 0) setTimeout(recurse)
    else message('<b>Loop finished</b>')
  }
})(1000)

recurse()
