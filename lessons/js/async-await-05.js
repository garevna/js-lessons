const section = document.body
section.style = 'padding: 48px;'

function createWatch () {
  const path = location.href.split('?')[0]
  const watch = section
    .appendChild(document.createElement('img'))
  return Object.assign(watch, {
    src: path + 'icons/sand-watch.png',
    style: `
      position: absolute;
      top: 8px;
      right: 8px;
      width: 32px;
      transition: all .5s;
  `
  })
}

function createFigure (color) {
  const path = location.href.split('?')[0] + 'images/lessons/'
  const figure = section
    .appendChild(document.createElement('img'))

  return Object.assign(figure, {
    src: path + (color === 'black' ? 'black.png' : 'white.png')
  })
}

const getStatus = async () => Math.random() > .5 ? 'white' : 'black'

function start () {
  const func = (callback => {
    const time = Math.max(Math.round(Math.random() * 20000), 4000)
    let startTime = Date.now()
    let angle = 0
    const watch = createWatch()
    return async timeStamp => {
      angle += 2
      watch.style.transform = `rotate(${angle}deg)`
      const interval = Math.round(Date.now() - startTime)
      if (interval < time) requestAnimationFrame(func)
      else {
        watch.remove()
        callback(await getStatus())
      }
    }
  })(createFigure)

  requestAnimationFrame(func)
}

start()
