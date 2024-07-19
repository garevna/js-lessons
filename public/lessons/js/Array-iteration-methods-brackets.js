const section = document.body

String.prototype.testBrackets = (function () {
  const brackets = {
    '[': ']',
    '{': '}',
    '(': ')'
  }

  const all = ['[', '{', '(', ']', '}', ')']

  return function () {
    const self = this
      .split('')
      .filter(char => all.includes(char))

    let stack = [], result = ''

    self
      .forEach(symbol => {
        if (!brackets[symbol] && stack.length === 0) return false

        brackets[symbol] ? stack.push(symbol) : symbol = brackets[stack.pop()]

        result += symbol
      })

    return result === self.join('') && stack.length === 0
  }
})()

function addElem (tagName, container = section) {
  return container.appendChild(document.createElement(tagName))
}

const fontFamily = '"sans-serif", "system-ui", Arial'

const validStyle = `
  color: #090;
  font-family: ${fontFamily};
`

const invalidStyle = `
  color: #f00;
  font-family: ${fontFamily};
`

const message = Object.assign(addElem('p'), {
  style: `
    color: #09b;
    font-family: ${fontFamily};
  `,
  innerText: 'Enter the text to validate brackets'
})

const input = Object.assign(addElem('textarea'), {
  valid: true,
  style: `
    padding: 8px 16px;
    color: #555;
    letter-spacing: 2px;
    width: 80%;
  `,
  rows: 5,
  oninput: function (event) {
    Object.assign(event.target, {
      valid: event.target.value.testBrackets()
    })

    Object.assign(message, {
      innerText: event.target.valid ? 'Valid brackets' : 'Invalid brackets',
      style: event.target.valid ? validStyle : invalidStyle
    })
  }
})
