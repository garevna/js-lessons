const section = document.body

section.timeStamps = []

section.showClick = function () {
  const elem = section
    .appendChild(document.createElement('span'))

  const interval = section.timeEnd - section.timeStart

  const back = interval >= 1000 ? '#09b' : 'transparent'

  section.timeStart = interval >= 1000 ? section.timeEnd : section.timeStart

  elem.style = `
    position: relative;
    display: inline-block;
    width: 10px;
    height: 20px;
    border: dotted 0.1px white;
    box-sizing: border-box;
    background: ${back};
  `
}

section.onclick = (function () {
  section.timeStart =section.timeEnd =  new Date().getTime()

  return function (event) {
    section.timeEnd = new Date().getTime()
    requestAnimationFrame(section.showClick)
  }
})()