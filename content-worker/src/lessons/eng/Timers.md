# ![ico-35 study] Таймеры

The first argument passed to the timer is always the callback function.
Setting a timer returns a numeric timer ID.

## ![ico-30 clock] setTimeout

The ~setTimeout~ method of the ~window~ object takes two arguments:

![ico-20 green-ok] callback function.
![ico-20 green-ok] duration of the delay interval (in milliseconds).

The function passed as the first argument will be called at the interval specified by the second argument.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
(function () {
  console.log('START')

  setTimeout(() => console.log('One second has passed'), 1000)

  console.log('END')
})()
~~~

First, the messages 'START' and 'END' will be printed to the console,

and then, after about a second, the message 'One second has passed'.

However, this does not mean that if you pass a null value to the ~setTimeout~ method, the callback function will be called immediately.

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
undefined // the main thread has finished its work, the call stack is empty.
1
3
~~~

____________________________

## ![ico-25 clock] setInterval

I don't recommend you use this timer.
Firstly, because the exact time interval cannot be maintained.

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

![ico-25 warn] Be sure to stop the timers, otherwise the page will freeze.
This, by the way, is the second reason why you should not use the **~setInterval~** timer.

{{{Timers-3.js}}}

_________________________________________

And the third reason why you should not use the **~setInterval~** timer is that the frequency at which the browser redraws the page will never coincide with the frequency at which your timer callback is called.

That is, the timer's callback may trigger several times, but it will only appear on the page when the browser repaints the page again.

See how the counter value, which is incremented by the timer set to 1ms, is updated on the page:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
let counter = 0

const interval = setInterval(() => counter++, 1)
~~~

{{{Timers-4.js}}}

___________________________________________

Now let's see how (you shouldn't do this) to animate an object on a page using the **~setInterval~** timer.
Since I recommend that you favour CSS animation wherever possible, this example will demonstrate a similar animation, but using **~@keyframes~**.

First, let's take care of styling the animated elements:

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

and declare a function that creates the animated element:

~~~js
const createFigure = () => document.body
  .appendChild(document.createElement('div'))
~~~

Now let's go directly to the animation.

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

Remember, it is the browser that turns what you create for the user into pixels, and it does its job much more efficiently than your code.
CSS animations are always coordinated with the page refresh rate.
Conclusion: you should not try to compete with the browser in what it is obviously stronger than you.

However, if you need to use a script to animate something, the browser provides you with a more reliable tool than timers.

This **~requestAnimationFrame~** is a method of the **window** object.

____________________________________________

## ![ico-25 icon] requestAnimationFrame

So, there are a few ‘shortcomings’ of timers that make it undesirable to use them for animation.
The first is that you can never be sure that the time that passes until the timer's callback function enters the Call Stack will be the time you set when you set the timer.
The second is that it is completely unrealistic to match the frequency at which the browser redraws the page with the frequency at which the timer's callback is called.

As an argument, **~requestAnimationFrame~** gets a callback function that will be called before the next time the browser redraws the page.

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

**~requestAnimationFrame~** returns an integer that is a unique identifier (reference) for the callback function.

~~~js
const showTime = function () {
  document.body.innerHTML = `<h3>${Date.now()}</h3>`
}

console.log(requestAnimationFrame(showTime))
~~~

Browsers redraw the page at a frequency of ~ 60fps (frames per second).
This is the frequency at which the callback function will be called, thus avoiding _debouncing_.

The following example clearly demonstrates that using **~requestAnimationFrame~**.
provides a smoother animation than animation using timers,
because the frequency of object coordinate changes is matched to the frequency at which the browser refreshes (redraws) the page.

As in Example 5, we first style the animated elements:

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

Next, we will use the **~createFigure~** function from the same example 5.
We will also declare the **~makeStep~** function:

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

// Let's run the animation:

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

In the following example, we will output to the page the next array of messages:

~~~js
const messages = [
  'Old ECMAScript versions was named by numbers: ES5 and ES6.',
  'From 2016, versions are named by year: ES2016, 2018, 2020 ...',
  'ECMAScript® 2023 Internationalization API Specification',
  'The 2nd Edition API was adopted by the General Assembly of June 2015, as a complement to the ECMAScript 6th Edition.'
]
~~~

Let's make these messages appear on the page at the same time, but one character at a time:

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

Debounce is an unpleasant phenomenon which means that some function is called too often.
This happens most frequently with UI event handlers.
It is especially bad if the function code sends a request to the server.
It takes time to process such a request, and an impatient user may repeatedly press the button without waiting for an immediate response.
Also debounce can occur due to technical reasons, for example, when a mouse button or a key on the keyboard ‘sticks’.

Our task is to prevent debounce regardless of the reason of its origin, i.e. ‘throttle’ function calls by controlling their frequency.

In the following example, **~requestAnimationFrame~** is used to limit the frequency of clicks to 1 click per second.

Let's declare an auxiliary function **~addElem~**, which will allow us to visualise how clicks are ‘throttled’: when a click ‘passes’, a coloured rectangle will appear, when a click is ignored, the rectangle will be ‘empty’.
The **~addElem~** function adds an element to the page and sets its ~background~ style property to the value passed to the function as an argument.
The default value of the **~back~** formal parameter will be ~transparent~.

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

Now we can write the ‘throttle’ code itself:

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

## ![ico-25 icon] Examples

^^^[![ico-25 cap] 11]

~~~js
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
~~~
^^^

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
