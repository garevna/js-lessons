let stopAnimation = false

document.body.onclick = () => stopAnimation = true

const createFigure = () => document.body
  .appendChild(document.createElement('div'))

const style = document.head
  .appendChild(document.createElement('style'))
style.textContent = `
  .animated {
    position: absolute;
    width: 150px;
    height: 50px;
    left: 10px;
    font-family: Arial;
    font-size: 12px;
    color: white;
    padding: 8px;
  }
  .setTimeout {
    background-color: #f50;
    top: 10px;
  }
  .requestAnimationFrame {
    background-color: #079;
    top: 80px;
  }
`

const figure1 = createFigure()
figure1.classList.add('animated', 'setTimeout')

Object.assign(figure1, {
  innerText: 'setTimeout',
  resolve: function () {
    this.style.left = this.offsetLeft + 1 + 'px'
    return this.offsetLeft
  }.bind(figure1),

  [Symbol.iterator]: function * () {
    while (true) {
      yield new Promise(resolve => setTimeout(resolve, 16)).then(this.resolve)
    }
  }.bind(figure1),

  showMustGoOn: async function () {
    let counter = 0
    for (let item of this) {
      let res = await item
      if (stopAnimation || counter++ > 800) break
    }
  }.bind(figure1)
})

const figure2 = createFigure()
figure2.classList.add('animated', 'requestAnimationFrame')
Object.assign(figure2, {
  innerText: 'requestAnimationFrame',
  showMustGoOn: function () {
    this.style.left = this.offsetLeft + 1 + 'px'
    !stopAnimation && requestAnimationFrame(this.showMustGoOn)
  }.bind (figure2)
})

;[figure1, figure2].forEach(figure => figure.showMustGoOn())
