# ![ico-35 study] {{p1}}

{{p2}}
{{p3}}

## ![ico-30 clock] setTimeout

{{p4}}

{{p5}}
{{p6}}

{{p7}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
(function () {
  console.log('START')

  setTimeout(() => console.log('One second has passed'), 1000)

  console.log('END')
})()
~~~

{{p8}}

{{p9}}

{{p10}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
(function () {
  console.log('START')

  setTimeout(() => console.log('1'))

  console.log('2')

  setTimeout(() => console.log('3'), 0 )

  console.log('END')
})()
~~~

~~~console
START
2
END
undefined // основной поток завершил работу, стек вызовов пуст.
1
3
~~~

____________________________

## ![ico-25 clock] setInterval

{{p11}}
{{p12}}

^^^[![ico-25 coffee] 3]

~~~js
function showTime () {
  const demo = document.body
    .appendChild(document.createElement('h3'))
  Object.assign(demo, {
    start: Date.now(),
    timer: setInterval(() => {
      demo.innerText = 'Timer for 1000ms: ' + (Date.now() - demo.start)
      demo.start = Date.now()
    }, 1000)
  })

  document.body.onclick = function () {
    clearInterval(demo.timer)
    clearInterval(interval)
  }

  document.body.onmouseover = function () {
    for (let i = 0; i < 100000; i++) continue
  }
}

showTime()

var interval = setInterval(() => {
  for (let i = 0; i < 10000; i++) {
    document.body.dispatchEvent(new Event('mouseover'))
  }
}, 5)
~~~

^^^

{{p13}}
{{p14}}

{{{Timers-3.js}}}

_________________________________________

{{p15}}

{{p16}}

{{p17}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
let counter = 0

const interval = setInterval(() => counter++, 1)
~~~

{{{Timers-4.js}}}

___________________________________________

{{p18}}
{{p19}}

{{p20}}

~~~~js
const style = document.head
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
~~~~

{{p21}}

~~~js
const createFigure = () => document.body
  .appendChild(document.createElement('div'))
~~~

{{p22}}

◘◘![ico-25 cap] ** 5**◘◘

~~~js
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
~~~

{{{Timers-5.js}}}

{{p23}}
{{p24}}
{{p25}}

{{p26}}

{{p27}}

____________________________________________

## ![ico-25 icon] requestAnimationFrame

{{p28}}
{{p29}}
{{p30}}

{{p31}}

◘◘![ico-25 cap] ** 6**◘◘

~~~js
let stop = false

const showTime = function () {
  document.body.innerHTML = `<h3>${Date.now()}</h3>`
  !stop && requestAnimationFrame(showTime)
}

document.body.onclick = () => { stop = true }

showTime()
~~~

{{{Timers-6.js}}}

{{p32}}

~~~js
const showTime = function () {
  document.body.innerHTML = `<h3>${Date.now()}</h3>`
}

console.log(requestAnimationFrame(showTime))
~~~

{{p33}}
{{p34}}

{{p35}}
{{p36}}
{{p37}}

{{p38}}

~~~~js
const style = document.head
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
~~~~

{{p39}}
{{p40}}

~~~js
const makeStep = figure => figure.style.left = figure.offsetLeft + 1 + 'px'
~~~

◘◘![ico-25 cap] ** 7**◘◘

~~~js
let stopAnimation = false

const figure1 = createFigure()
figure1.classList.add('animated', 'set-interval')
figure1.makeStep = makeStep.bind(null, figure1)

const figure2 = createFigure()
figure2.classList.add('animated', 'request-animation-frame')
figure2.move = function () {
  makeStep(this)
  !stopAnimation && requestAnimationFrame(this.move.bind(this))
}.bind(figure2)

// Запускаем анимацию:

const timer = setInterval(() => figure1.makeStep(), 17)
figure2.move()
~~~

{{{Timers-7.js}}}

______________________________________________

◘◘![ico-25 cap] ** 8**◘◘

~~~js
const message = 'Old ECMAScript versions was named by numbers: ES5 and ES6.'

const demo = document.body
  .appendChild(document.createElement('h3'))

function recurse (message) {
  const array = message.split('')
  const char = array.shift()

  if (char) {
    demo.textContent += char
    requestAnimationFrame(recurse.bind(null, array.join('')))
  }
}

requestAnimationFrame(recurse.bind(null, message))
~~~

{{{requestAnimationFrame-5.js}}}

__________________________________________

{{p41}}

~~~js
const messages = [
  'Old ECMAScript versions was named by numbers: ES5 and ES6.',
  'From 2016, versions are named by year: ES2016, 2018, 2020 ...',
  'ECMAScript® 2023 Internationalization API Specification',
  'The 2nd Edition API was adopted by the General Assembly of June 2015, as a complement to the ECMAScript 6th Edition.'
]
~~~

{{p42}}

◘◘![ico-25 cap] ** 9**◘◘

~~~js
function recurse (demo, message) {
  const array = message.split('')
  const char = array.shift()

  if (char) {
    demo.textContent += char
    requestAnimationFrame(recurse.bind(null, demo, array.join('')))
  }
}

messages
  .forEach(message => {
    const demo = document.body
      .appendChild(document.createElement('h3'))
    requestAnimationFrame(recurse.bind(null, demo, message))
  })
~~~

{{{requestAnimationFrame-6.js}}}
___________________________________________________

## ![ico-25 icon] Debounce

{{p43}}
{{p44}}
{{p45}}
{{p46}}
{{p47}}

{{p48}}

{{p49}}

{{p50}}
{{p51}}
{{p52}}

~~~js
function addElem (back = 'transparent') {
  const elem = section
    .appendChild(document.createElement('span'))
  elem.style = `
    position: relative;
    display: inline-block;
    width: 10px;
    height: 20px;
    border: dotted 0.1px white;
    box-sizing: border-box;
    background: ${back};
  `
}
~~~

{{p53}}

◘◘![ico-25 cap] **10**◘◘
~~~js
const section = document.body

section.timeStamps = []

section.showClick = function () {
  const interval = section.timeEnd - section.timeStart
  const back = interval >= 1000 ? '#09b' : 'transparent'

  addElem(back)

  section.timeStart = interval >= 1000 ? section.timeEnd : section.timeStart
}

section.onclick = (function () {
  section.timeStart = section.timeEnd = new Date().getTime()

  return function (event) {
    section.timeEnd = new Date().getTime()
    requestAnimationFrame(section.showClick)
  }
})()
~~~

{{{Timers-10.js}}}

_________________________________________________________

## ![ico-25 icon] {{common.c10}}

![ico-25 cap] **11**

~~~~js
function addElem (tagName, container = document.body) {
  return container
    .appendChild(document.createElement(tagName))
}

function createAnimated (title, container) {
  return Object.assign(addElem('div', container), {
    title,
    style: `
      position: absolute;
      width: ${container.size}px;
      height: ${container.size}px;
      background: ${container.randomColor()};
      top: ${container.randomY()}px;
      left: ${container.randomX()}px;
    `,
    targetY: null,
    targetX: null,
    setTarget () {
      Object.assign(this, {
        targetY: container.randomY(),
        targetX: container.randomX()
      })
    },
    resetTarget () {
      Object.assign(this, { targetX: null, targetY: null })
    },

    setDistance () {
      Object.assign(this, {
        distanceX: this.targetX - parseInt(this.style.left),
        distanceY: this.targetY - parseInt(this.style.top)
      })
    },

    movieClip () {
      if (container.stop) return

      if (!this.targetY && !this.targetX) this.setTarget()
      else {
        this.setDistance()
        if (!this.distanceY && !this.distanceX) this.resetTarget()
        else {
          Object.assign(this.style, {
            top: parseInt(this.style.top) + Math.sign(this.distanceY) + 'px',
            left: parseInt(this.style.left) + Math.sign(this.distanceX) + 'px'
          })
        }
      }

      requestAnimationFrame(this.movieClip.bind(this))
    }
  })
}

const demo = Object.assign(addElem('section'), {
  size: 40,
  stop: true,
  style: `
    position: absolute;
    width: 95%;
    height: 300px;
    background-color: #000;
  `,
  random: (maxVal, minVal = 0) => Math.max(minVal, Math.round(Math.random() * maxVal)),
  randomX () {
    return this.random(this.offsetWidth - this.size)
  },
  randomY () {
    return this.random(this.offsetHeight - this.size)
  },
  randomColor () {
    return `rgb(${this.random(255, 100)}, ${this.random(255, 100)}, ${this.random(255, 100)})`
  }
})

Object.assign(demo, {
  elems: [1, 2, 3, 4].map(num => createAnimated(num, demo)),

  onclick: function (event) {
    this.stop = !this.stop
    !this.stop &&
      this.elems.forEach(elem => requestAnimationFrame(elem.movieClip.bind(elem)))
  }.bind(demo)
})

demo.dispatchEvent(new Event('click'))
~~~~

{{{Timers-requestAnimationFrame.js}}}

___________________________________________________

◘◘![ico-25 cap] **12**◘◘

~~~js
function store () {
  return Array.from(arguments)
    .reduce((res, item) => res += item)
}

const demo = document.body
  .appendChild(document.createElement('h3'))

document.body.onkeypress = function (event) {
  store = store.bind(null, parseInt(event.key) || 0)
  demo.innerText = store()
}

function recurse (num) {
  if (num > 0) {
    document.body
      .dispatchEvent(Object.assign(new Event('keypress'), {
        key: Math.round(Math.random() * 9)
      }))
    requestAnimationFrame(recurse.bind(null, --num))
  }
}

recurse(200)
~~~

{{{Timers-requestAnimationFrame-1.js}}}
______________________________________________

![ico-25 cap] **13**

{{{Timers-requestAnimationFrame-2.js}}}
