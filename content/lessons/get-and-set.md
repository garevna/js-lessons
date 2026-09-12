# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

~~~js
var sample = {
  birth: 2004,
  get years () {
    return new Date().getFullYear() - this.birth
  },
  set years ( newVal ) {
    this.birth = new Date().getFullYear() - newVal
  }
}
~~~

{{s1.p3}}

~~~js
console.log(sample.years)
~~~

{{s1.p4}}

~~~js
sample.years = 20
~~~

{{s1.p5}}

~~~js
console.log(sample.birth)
~~~

_______________________________

## ![ico-25 cap] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}

{{s2.p7}}

~~~js
var course = 28

var commodity = {
  name: 'Iron',
  mark: 'Tefal',
  priceUSD: 20,

  get priceUAH () {
    return this.priceUSD * course
  },
  set priceUAH (newPriceUAH) {
    this.priceUSD = newPriceUAH / course
  }
}
~~~

{{s2.p8}}

{{s2.p9}}

{{s2.p10}}

{{s2.p11}}

~~~js
console.log(commodity.priceUAH) // 560
~~~

{{s2.p12}}


~~~js
commodity.priceUAH = 250

console.log(commodity.priceUSD) // 8.928571428571429
~~~

{{{get-and-set-price.js}}}

^^^[{{s2.spoiler1}}]

{{s2.p13}}

~~~js
const section = document.body

const [container, label, course] = ['div', 'span', 'input']
  .map(tag => document.createElement(tag))

Object.assign(section.appendChild(container), { style: 'padding: 24px;' })
Object.assign(container.appendChild(label), { innerText: 'Dollar exchange rate: ' })
Object.assign(container.appendChild(course), {
  type: 'number',
  value: 28.5,
  onchange (event) {
    Commodity.prototype.course = event.target.value
    commodities.forEach(item => item.setPriceUAH())
  }
})
~~~

{{s2.p14}}

~~~js
function Commodity (name, priceUSD, picture) {
  Object.assign(this, {
    name,
    priceUSD,
    setPriceUAH () { priceUAH.value = this.priceUAH },
    setPriceUSD () { priceUSDElement.innerText = this.priceUSD }
  })

  Object.defineProperty(this, 'priceUAH', {
    get () {
      return this.priceUSD * this.course
    },
    set (newPriceUAH) {
      this.priceUSD = Math.round(newPriceUAH * 100 / this.course) / 100
      this.setPriceUSD()
    }
  })

  const card = Object.assign(this.addElem('figure'), {
    style: `
      font-family: Arial;
      width: 160px;
      border: solid 1px white;
      padding: 24px;
      float: left;
      margin: 8px;
      box-sizing: boreder-box;
    `
  })

  const commodityName = Object.assign(this.addElem('h4', card), {
    innerText: name,
    style: 'margin-top: 0;'
  })

  const img = Object.assign(this.addElem('img', card), {
    src: picture,
    height: 100,
    style: 'margin: 0 0 16px 24px'
  })

  const prices = this.addElem('div', card)

  this.addElem('small', prices).innerText = 'Price (UAH): '

  const priceUAH = Object.assign(this.addElem('input', prices), {
    style: `
      background: transparent;
      width: 80px;
      border: 0;
      color: #09b;
    `,
    value: this.priceUAH,
    onchange: function (event) {
      this.priceUAH = event.target.value
      this.setPriceUSD()
    }.bind(this)
  })

  const usd = Object.assign(this.addElem('div', card ), {
    style: `
      padding: 16px 0 0 0;
      font-size: 0.8rem;
      color: #888;
    `
  })

  this.addElem('small', usd).innerText = 'Price (USD): '

  const priceUSDElement = Object.assign(this.addElem('small', usd), {
    style: 'color: #f50'
  })

  this.setPriceUSD()
}

Object.assign(Commodity.prototype, {
  course: course.value,
  addElem (tagName, container) {
    return (container ? container : section)
      .appendChild(document.createElement(tagName))
  }
})
~~~

{{s2.p15}}

~~~js
const [iron, fryingPan, saucepan] = ['iron', 'frying-pan', 'saucepan']
  .map(name => `${location.origin + location.pathname}images/lessons/${name}.svg`)

const commodities = [
  new Commodity('Iron', 43, iron),
  new Commodity('Frying pan', 22, fryingPan),
  new Commodity('Saucepan', 25, saucepan)
]
~~~

^^^
_____________________________________________________

{{s2.p16}}

{{s2.p17}}

{{s2.p18}}

~~~js
var commodity = {
  name: 'Iron',
  mark: 'Tefal',
  priceUSD: 20,

  get priceUAH () {
    return this.priceUSD * course
  },
  set priceUAH (newPriceUAH) {
    this.priceUAH = newPriceUAH
  }
}
~~~

{{s2.p19}}

{{s2.p20}}

____________________________________________________________

## ![ico-25 cap] {{s3.h1}}

{{s3.p1}}

~~~js
var calculator = {
  firstValue: 0,
  secondValue: 0,
  operations: ['+', '-', '*', '/', '%'],
  operation: '+',
  get result () {
    return eval(`${this.firstValue}${this.operation}${this.secondValue}`)
  },
  set result (newValue) {
    for (var x of this.operations) {
      var operands = newValue.split(x)
      if (operands.length === 1) continue
      this.operation = x
      this.firstValue = Number(operands[0])
      this.secondValue = Number(operands[1])
      break
    }
  }
}
~~~

{{s3.p2}}

{{s3.p3}}

~~~js
console.log(calculator.result)
~~~

{{s3.p4}}

~~~js
calculator.result = '5 - 8 '
~~~

{{s3.p5}}

~~~console
▼ {firstValue: 5, secondValue: 8, operations: Array(5), operation: "-"}
    firstValue: 5
    operation: "-"
  ► operations: (5) ["+", "-", "*", "/", "%"]
    result: (...)
    secondValue: 8
  ► get result: ƒ result()
  ► set result: ƒ result( newValue )
  ► __proto__: Object
~~~

{{{get-and-set-calculator.js}}}

__________________________________________

## ![ico-25 cap] {{s4.h1}}

{{s4.p1}}

~~~js
var human = {
  name: 'Piter',
  states: ['work', 'relax', 'enjoy'],
  currentState: 0,

  addState (state) {
    this.states.push(state)
  },

  get state () {
    return this.states[this.currentState]
  },

  set state (newState) {
    !this.states.includes(newState) && this.addState(newState)
    this.currentState = this.states.indexOf(newState)
  },

  showState: function () {
    console.log(`Current state: ${this.currentState} (${this.state})`)
  }
}

human.showState()
~~~

{{s4.p2}}

~~~console
Current state: 0 (work)
~~~

{{s4.p3}}

{{s4.p4}}

{{s4.p5}}


~~~js
human.state = 'swim'

human.showState()
~~~

{{s4.p6}}

~~~console
Current state: 3 (swim)
~~~
