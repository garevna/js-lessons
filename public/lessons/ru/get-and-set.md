# ![ico-30 study] Вычисляемые свойства

У объекта могут быть свойства, значения которых вычисляются на основании значений других свойств

Такие свойства объявляются с помощью функций **~get~** (геттера) и **~set~** (сеттера)

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

Когда мы запрашиваем значение вычисляемого свойства, вызывается геттер свойства:

~~~js
console.log(sample.years)
~~~

а когда мы присваиваем новое значение вычисляемому свойству:

~~~js
sample.years = 20
~~~

вызывается сеттер свойства, который меняет значение свойства ~birth~

~~~js
console.log(sample.birth)
~~~

_______________________________

## ![ico-25 cap] PriceUAH

Предположим, есть объект **~commodity~**, описывающий товар.

Цена товара **_~priceUSD~_** установлена в долларах.

Предположим, курс доллара устанавливается значением переменной **~course~**.

Для получения цены товара в гривне нужно умножить цену товара в долларах на курс доллара.

Однако крайне неудобно производить подобные операции каждый раз, когда нужна цена товара в гривне.

Создадим вычисляемое свойство **_~priceUAH~_**.

Для этого объявим геттер и сеттер свойства.

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

**Геттер** - это функция, которая будет вычислять актуальное значение цены товара в гривне и возвращать результат как значение свойства **~commodity.priceUAH~**.

![ico-20 warn] У геттера не может быть аргументов

**Сеттер** - это функция, которая будет получать новое значение цены товара в гривне (**_~newPriceUAH~_**) и пересчитывать цену товара в долларах (**~commodity.priceUSD~**) по текущему курсу (**_~course~_**).

Каждый раз, когда мы будем обращаться к свойству **~commodity.priceUAH~**, будет срабатывать геттер.

~~~js
console.log(commodity.priceUAH) // 560
~~~

Каждый раз, когда мы будем присваивать новое значение свойству **~commodity.priceUAH~**, на самом деле будет вызываться функция-сеттер, которая будет изменять значение свойства **~commodity.priceUSD~**.


~~~js
commodity.priceUAH = 250

console.log(commodity.priceUSD) // 8.928571428571429
~~~

{{{get-and-set-price.js}}}

^^^[Full code of example]

Let's create elements to edit dollar exchange rate

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

and now constructor of commodity

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

Now we are ready to create commodities

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

Для вычисляемых свойств "под капотом" операция присваивания заменяется вызовом функции-сеттера.

![ico-20 warn] Поэтому категорически нельзя внутри функции-сеттера использовать присваивание значения этому же свойству:

![ico-25 err]

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

Это приведет к бесконечной рекурсии и генерации исключения:

~► Uncaught RangeError: Maximum call stack size exceeded~

____________________________________________________________

## ![ico-25 cap] Calculator (sample)

Создадим простенький объект-калькулятор:

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

Вычисляемое свойство **~result~** этого объекта имеет геттер и сеттер

Когда мы обращамся к свойству **~result~** для получения его значения, срабатывает геттер

~~~js
console.log(calculator.result)
~~~

Если же мы выполним присваивание нового значения свойству **~result~**

~~~js
calculator.result = '5 - 8 '
~~~

сработает сеттер свойства, и в результате будут изменены значения свойств **_~firstValue~_**, **_~secondValue~_** и **_~operation~_** объекта **~calculator~**

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

## ![ico-25 cap] Human states

Создадим вычисляемое свойство **_~state~_** объекта **~human~**

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

**Результат:**

~~~console
Current state: 0 (work)
~~~

Если вычисляемое свойство **_~state~_** фигурирует в левой части оператора присваивания, то вызывается сеттер свойства.

Сеттер проверяет наличие такого значения в массиве **~human~**.**_~states~_**, и если такого значения там нет, то добавляет его.

Затем сеттер свойства **_~state~_** устанавливает значение свойства **~human~**.**_~currentState~_** равным индексу элемента массива **~human~**.**_~states~_**, значение которого будет отображать геттер свойства **_~state~_**.


~~~js
human.state = 'swim'

human.showState()
~~~

**Результат:**

~~~console
Current state: 3 (swim)
~~~
