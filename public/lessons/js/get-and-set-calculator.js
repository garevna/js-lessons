const section = document.body
section.style = `
  background-color: #000;
  color: #eee;
  font-family: Arial;
  font-size: 14px;
`

function Calculator (container) {
  this.container = container && container.nodeType === 1 ? container : document.body

  const label = Object.assign(this.addElem('p'), {
    innerText: 'Enter an arithmetic expression (for example 4/2, or 5*3)'
  })

  this.expression = Object.assign(this.addElem('input'), {
    style: `
      width: 180px;
      border: inset 1px;
      margin-bottom: 12px;
      padding: 4px 8px;
      font-size: 16px;
      display: block;
      outline: none;
    `,
    test: this.test.bind(this),
    oninput: function (event) {
      const matches = this.test(event.target.value)
      event.target.style.color = !matches ? '#900' : '#09b'
      event.target.title = !matches ? 'Invalid input' : 'Valid input'
    },
    onchange: function (event) {
      if (!this.test(event.target.value)) return event.target.value = ''
      this.result = event.target.value
    }.bind(this)
  })

  this.createInput('firstOperand', this.container)

  this.createInputOperation(this.container)

  this.createInput('secondOperand', this.container)

  this.demo = this.addElem('span')

  this.operations = ['+', '-', '*', '/', '%']

  Object.defineProperty(this, 'result', {
    get () {
      const secondOperand = this.formatNegative(this.secondOperand.value)
      this.expression.value = `${this.firstOperand.value}${this.operation.value}${secondOperand}`

      this.demo.innerText = ` = ${eval(this.expression.value)}`

      return this.expression.value
    },

    set (newValue) {
      if (!this.test(newValue)) return

      for (const operation of this.operations) {
        const operands = newValue.split(operation)
        if (operands.length === 1) continue
        this.operation.value = operation
        this.firstOperand.value = parseInt(operands[0])
        this.secondOperand.value = parseInt(operands[1])
        break
      }

      this.demo.innerText = ` = ${eval(this.expression.value)}`
    }
  })
}

Object.assign(Calculator.prototype, {
  test (value) {
    return value.match(/(\d){1,}[%\*\+\-\/]{1}(\d){1,}/)
  },

  addElem (tagName, container) {
    this.container = container && container.nodeType === 1 ? container : section
    return this.container.appendChild(document.createElement(tagName))
  },

  formatNegative (num) {
    return num < 0 ? `(${num})` : num
  },

  changeHandler (event) {
    const secondOperand = this.formatNegative(this.secondOperand.value)
    this.expression.value = `${this.firstOperand.value}${this.operation.value}${secondOperand}`
    this.result = this.expression.value
  },

  createInputOperation () {
    this.operation = Object.assign(this.addElem('input'), {
      maxLength: '1',
      value: '+',
      style: `
        width: 32px;
        color: #f50;
        font-weight: bold;
        padding: 4px;
        margin: 0 4px;
        font-size: 20px;
        outline: none;
        background: transparent;
        border: solid 1px #ddd;
        border-radius: 4px;
        text-align: center;
      `,
      oninput (event) {
        if (event.target.value.match(/[^\+\-\*\/\%]/)) Object.assign(event.target, { value: '+' })
      },
      value: '+',
      onchange: this.changeHandler.bind(this)
    })
  },

  createInput (prop) {
    this[prop] = Object.assign(this.addElem('input'), {
      type: 'number',
      value: 0,
      style: `
        width: 64px;
        border: 0;
        color: #09b;
        padding: 8px;
        font-size: 16px;
        border-radius: 4px;
      `,
      onchange: this.changeHandler.bind(this),
      test: this.test.bind(this)
    })
  }
})

var calculator = new Calculator(section)
