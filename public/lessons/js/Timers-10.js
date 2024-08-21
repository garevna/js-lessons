const section = document.body

section.timeStamps = []

const fone = section.appendChild(document.createElement('h1'))
Object.assign(fone, {
  style: `
    position: absolute;
    bottom: 3%;
    right: 4%;
    text-align: right;
    font-size: 48px;
    color: #9997;
    user-select: none;
  `,
  innerText: 'Click here!'
})

function addElem (back = 'transparent') {
  const elem = section
    .appendChild(document.createElement('span'))
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

section.showClick = function () {
  const interval = section.timeEnd - section.timeStart
  const back = interval >= 1000 ? '#09b' : 'transparent'

  addElem(back)

  section.timeStart = interval >= 1000 ? section.timeEnd : section.timeStart
}

section.onclick = (function () {
  section.timeStart =section.timeEnd =  new Date().getTime()

  return function (event) {
    section.timeEnd = new Date().getTime()
    requestAnimationFrame(section.showClick)
  }
})()
