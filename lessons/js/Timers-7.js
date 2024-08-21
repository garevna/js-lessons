const section = document.body

section.style.fontFamily = 'monospace'

const style = section
  .appendChild(document.createElement('style'))

style.textContent = `
  .animated {
    position: absolute;
    width: 136px;
    height: 48px;
    padding: 8px;
  }

  .set-interval {
    background-color: #f50;
    top: 16px;
    left: 16px;
  }

  .set-interval:before {
    content: 'setInterval';
  }

  .request-animation-frame {
    background-color: #09b;
    top: 80px;
  }

  .request-animation-frame:before {
    content: 'requestAnimationFrame';
  }

  .set-interval:before,
  .request-animation-frame:before {
    font-family: Arial;
    font-size: 12px;
    color: #fff;
  }
`

let stopAnimation = false

const createFigure = () => section
  .appendChild(document.createElement('div'))

const makeStep = figure => figure.style.left = figure.offsetLeft + 1 + 'px'

const figure1 = createFigure()
figure1.classList.add('animated', 'set-interval')
figure1.makeStep = makeStep.bind(null, figure1)

const figure2 = createFigure()
figure2.classList.add('animated', 'request-animation-frame')
figure2.move = function () {
  makeStep(this)
  !stopAnimation && requestAnimationFrame(this.move.bind(this))
}.bind (figure2)

const timer = setInterval(() => figure1.makeStep(), 17)
figure2.move()

document.body.onclick = () => {
  stopAnimation = true
  clearInterval(timer)
}
