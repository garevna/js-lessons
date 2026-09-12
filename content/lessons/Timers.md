# ![ico-35 study] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

## ![ico-30 clock] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

~~~js
(function () {
  console.log('START')

  setTimeout(() => console.log('One second has passed'), 1000)

  console.log('END')
})()
~~~

{{s2.p6}}

{{s2.p7}}

{{s2.p8}}

{{s2.p9}}

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

## ![ico-25 clock] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

{{s3.p3}}

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

{{s3.p4}}
{{s3.p5}}

{{{Timers-3.js}}}

_________________________________________

{{s3.p6}}

{{s3.p7}}

{{s3.p8}}

{{s3.p9}}

~~~js
let counter = 0

const interval = setInterval(() => counter++, 1)
~~~

{{{Timers-4.js}}}

___________________________________________

{{s3.p10}}
{{s3.p11}}

{{s3.p12}}

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

{{s3.p13}}

~~~js
const createFigure = () => document.body
  .appendChild(document.createElement('div'))
~~~

{{s3.p14}}

{{s3.p15}}

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

{{s3.p16}}
{{s3.p17}}
{{s3.p18}}

{{s3.p19}}

{{s3.p20}}

____________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}
{{s4.p3}}

{{s4.p4}}

{{s4.p5}}

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

{{s4.p6}}

~~~js
const showTime = function () {
  document.body.innerHTML = `<h3>${Date.now()}</h3>`
}

console.log(requestAnimationFrame(showTime))
~~~

{{s4.p7}}
{{s4.p8}}

{{s4.p9}}
{{s4.p10}}
{{s4.p11}}

{{s4.p12}}

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

{{s4.p13}}
{{s4.p14}}

~~~js
const makeStep = figure => figure.style.left = figure.offsetLeft + 1 + 'px'
~~~

{{s4.p15}}

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

{{s4.p16}}

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

{{s4.p17}}

~~~js
const messages = [
  'Old ECMAScript versions was named by numbers: ES5 and ES6.',
  'From 2016, versions are named by year: ES2016, 2018, 2020 ...',
  'ECMAScript® 2023 Internationalization API Specification',
  'The 2nd Edition API was adopted by the General Assembly of June 2015, as a complement to the ECMAScript 6th Edition.'
]
~~~

{{s4.p18}}

{{s4.p19}}

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

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}
{{s5.p2}}
{{s5.p3}}
{{s5.p4}}
{{s5.p5}}

{{s5.p6}}

{{s5.p7}}

{{s5.p8}}
{{s5.p9}}
{{s5.p10}}

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

{{s5.p11}}

{{s5.p12}}
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

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

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

{{s6.p2}}

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

{{s6.p3}}

{{{Timers-requestAnimationFrame-2.js}}}
