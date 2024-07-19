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
    top: 140px;
    left: 48px;
    transition: all .5s;
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
    Date.now() - start < 10000 && requestAnimationFrame(figure.move)
  }
})

message('Well, you\'re screwed, kid, now wait for the cycle to complete....')

figure.move()

setTimeout(function () {
  message('<b>Loop started</b>')
  for (var x = 0; x < 10000000000; x++) continue
  message('<b>Loop finished</b>')
}, 0)
