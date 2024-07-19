const section = document.body

section.style = `height: 400px!important;`

const [iron, fryingPan, saucepan] = ['iron', 'frying-pan', 'saucepan']
  .map(name => `${location.origin + location.pathname}images/lessons/${name}.jpg`)

const [container, label, course] = ['div', 'span', 'input'].map(tag => document.createElement(tag))

Object.assign(section.appendChild(container), { style: 'padding: 24px;' })

Object.assign(container.appendChild(label), {
  innerText: 'Dollar exchange rate: '
})

Object.assign(container.appendChild(course), {
  type: 'number',
  value: 28.5,
  onchange (event) {
    Commodity.prototype.course = event.target.value
    commodities.forEach(item => item.setPriceUAH())
  }
})

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

  this.addElem('small', prices).innerText = "Price (UAH): "

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

Commodity.prototype.course = course.value

Commodity.prototype.addElem = function (tagName, container) {
  return (container ? container : section)
    .appendChild(document.createElement(tagName))
}

const commodities = [
  new Commodity('Iron', 43, iron),
  new Commodity('Frying pan', 22, fryingPan),
  new Commodity('Saucepan', 25, saucepan)
]
