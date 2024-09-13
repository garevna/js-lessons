const section = document.body

// section.style.fontFamily = 'monospace'
section.style.letterSpacing = 2

const create = (base) => {
  const container = section.appendChild(document.createElement('div'))
  container.style.marginTop = '48px'
  const number = container.appendChild(document.createElement('span'))
  number.innerText = base
  number.style = `
    font-size: 28px;
    color: #ddd;
  `
  const power = container.appendChild(document.createElement('sup'))
  power.style = `
    display: inline-block;
    font-size: 20px;
    color: #09b;
    margin-top: -16px;
    vertical-align: text-top;
  `

  const result = container.appendChild(document.createElement('span'))
  result.style = `
    display: inline-block;
    font-size: 18px;
    padding: 8px 12px;
    background: #ddd;
    border-radius: 4px;
    color: #000;
    margin-left: 32px;
  `

  return { power, result }
}

var [binary, decimal] = [2, 10].map(num => create(num))

var power = 2

while (power <= 1024) {
  const pow = power

  setTimeout(() => {
    ;[binary, decimal].forEach((elem, index) => {
      if (elem.result.innerText !== 'Infinity') {
        elem.power.innerText = pow
        elem.result.innerText = Math.pow(index ? 10 : 2, pow)
        if (elem.result.innerText === 'Infinity') {
          elem.result.style = `
            display: inline-block;
            margin-left: 32px;
            background: transparent;
            color: #f0f;
            font-weight: bold;
          `
        }
      }
    })
  }, (power++ - 2) * 200)
}
