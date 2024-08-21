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

    .css-animation {
      background-color: #09b;
      top: 80px;
      animation: move-to-right 12s forwards linear;
    }

    .css-animation:before {
      content: 'CSS animation';
    }

    .set-interval:before,
    .css-animation:before {
      font-family: Arial;
      font-size: 12px;
      color: #fff;
    }

    @keyframes move-to-right {
      from { left: 16px; }
      to { left: 416px; }
    }
  `

const createFigure = () => section
  .appendChild(document.createElement('div'))

const makeStep = figure => figure.offsetLeft < 416
  ? Object.assign(figure.style, {
      left: figure.offsetLeft + 1 + 'px'
    })
  : clearInterval(timer)

const figure1 = createFigure()
figure1.classList.add('animated', 'set-interval')

const figure2 = createFigure()
figure2.classList.add('animated', 'css-animation')

const timer = setInterval(() => makeStep(figure1), 30)
document.body.onclick = () => clearInterval(timer)
