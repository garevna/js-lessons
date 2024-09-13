const section = document.body

const css = section.appendChild(document.createElement('style'))

css.textContent = `
  .calc-container {
    max-height: 180px;
    overflow-y: auto;
    padding: 0 16px 0 0;
    margin-bottom: 12px;
    width: max-content;
    border: solid 1px #999;
    border-radius: 4px;
  }

  .result-string, decimal-string, binary-string {
    padding: 8px 16px;
    margin: 8px 0;
    border-radius: 4px;
    border: solid 1px #ddd;
  }

  .result-string {
    position: sticky;
    top: 0px;
    text-align: right;
  }

  input {
    padding: 8px 12px;
    margin: 16px;
    border: solid 1px #ddd;
    border-radius: 4px;
    width: 64px;
    font-size: 16px;
  }

  .arrow:before {
    content: '→';
    color: #ff8;
    font-size: 24px;
  }

  .number-degree {
  }

  .number-degree--num {
    color: #079;
    font-size: 16px;
  }

  .power-container {
    display: inline-block;
    margin-top: -12px;
    padding: 0 3px;
    border-radius: 50%;
    background: #070;
    border: solid 1px #070;
    vertical-align: text-top;
  }

  .power-value {
    vertical-align: middle;
    color: #fff;
    margin: 2px 3px;
  }

  .result-container {
    position: absolute;
    height: 100%;
    top: 0;
    right: 8px;
  }

  .result-string {
    position: sticky;
    top: 0;
  }
`

section.style = `
  background: #000;
  color: #ddd;
  font-family: monospace;
  font-weight: bold;
  font-size: 14px;
`
const calcs = Object.assign(section.appendChild(document.createElement('div')), {
  className: 'calc-container'
})
var decString, binString, resultString

let decimalNumber = 0
const input = section.appendChild(document.createElement('input'))
Object.assign(input, {
  type: 'number',
  value: decimalNumber,
  onchange (event) {
    event.target.remove()
    getBinary(event.target.value)
  }
})
const arrow = '<span class="arrow"></span>'

const deg = (number, power) => {
  const [container, num, pow, content] = ['number-degree', 'number-degree--num', 'power-container', 'power-value']
    .map(className => Object.assign(document.createElement(className === 'power-container' ? 'sup' : 'span'), { className }))

  container.appendChild(num)
  container.appendChild(pow)
  pow.appendChild(content)
  num.innerText = number
  content.innerText = power

  return container.outerHTML
}

const [bin, dec] = [2, 10].map(base => power => deg(base, power))

function getBinaryPower (number) {
  var power = 10
  const target = number - (number % 2)

  while (Math.pow(2, power) < target) power++
  while (Math.pow(2, power) > target) power--

  return power
}

let counter = 0

function recurse (number, result = 0) {
  const maxPower = getBinaryPower(number)
  result += Math.pow(10, maxPower)

  var rest = number - Math.pow(2, maxPower)
  const demo = calcs.appendChild(document.createElement('p'))
  Object.assign(demo, {
    style: 'opacity: 0; transition: opacity .5s; margin: 0 8px; padding: 0',
    innerHTML: `${number} ${arrow} ${Math.pow(2, maxPower)} + ${rest} ${arrow} ${bin(maxPower)} + ${rest}`
  })

  setTimeout(() => {
    demo.style.opacity = 1
    decString.innerHTML += `${bin(maxPower)} + `
    binString.innerHTML += `${dec(maxPower)} + `
    resultString.innerHTML = `<span style="color: #f50">${result}</span>`
  }, 3000 * counter++)

  rest > 0 && recurse(rest, result)
  return result
}

function getBinary (number) {
  const resutContainer = section.appendChild(document.createElement('div'))
  resutContainer.className = 'result-container'
  ;[decString, binString, resultString] = ['decimal-string', 'binary-string', 'result-string']
    .map(className => {
      const elem = (className === 'result-string' ? resutContainer : section)
        .appendChild(document.createElement('h3'))
      Object.assign(elem, { className })
      return elem
    })

  const last = number % 2
  const lastElem = `<span style="color: #09b">${last}</span>`

  const tmp = number - last
  const demo = calcs.appendChild(document.createElement('p'))
  demo.style = 'margin: 0 8px; padding: 0'
  demo.innerHTML = `${number} ${arrow} ${number - last} + ${lastElem}`
  recurse(tmp, last)

  ;[decString, binString].forEach(elem => setTimeout(() => {
    elem.innerHTML += lastElem
  }, 3000 * counter++))
}
