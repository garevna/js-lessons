# ![ico-35 study] Таймеры

Первым аргументом таймеру в обязательном порядке передается функция обратного вызова (callback).
Установка таймера возвращает числовой идентификатор таймера.

## ![ico-30 clock] setTimeout

Метод ~setTimeout~ объекта ~window~ принимает два аргумента:

![ico-20 green-ok] функцию обратного вызова (callback).
![ico-20 green-ok] длительность интервала задержки (в миллисекундах).

Функция, переданная в качестве первого аргумента, будет вызвана через указанный вторым аргументом интервал.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
(function () {
  console.log('START')

  setTimeout(() => console.log('One second has passed'), 1000)

  console.log('END')
})()
~~~

Сначала в консоль будут выведены сообщения 'START' и 'END',

а затем, примерно через секунду - сообщение 'One second has passed'.

Однако это не означает, что если передать нулевое значение методу ~setTimeout~, то вызов коллбэк-функции произойдет немедленно.

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

Я не рекомендую вам использовать этот таймер.
Во-первых, потому что точный интервал времени не может быть выдержан.

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

![ico-25 warn] Обязательно остановите таймеры, иначе страница будет "подвисать".
Это, кстати, вторая причина, почему не стоит использовать таймер **~setInterval~**.

{{{Timers-3.js}}}

_________________________________________

И третья причина, почему не стоит использовать таймер **~setInterval~** заключается в том, что частота перерисовки страницы браузером никогда не совпадет с частотой вызова колбека вашего таймера.

То есть, колбек таймера может сработать несколько раз, но на странице это отобразится только во время очередной перерисовки страницы браузером.

Посмотрите, как обновляется на странице значение счетчика, которое инкрементируется таймером, установленным на 1мс:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
let counter = 0

const interval = setInterval(() => counter++, 1)
~~~

{{{Timers-4.js}}}

___________________________________________

Теперь посмотрим, как (не надо) анимировать объект на странице с помощью таймера **~setInterval~**.
Поскольку я рекомендую вам отдавать предпочтение CSS-анимации везде, где это возможно, то одновременно в этом примере будет продемонстрирована аналогичная анимация, но с помощью **~@keyframes~**.

Для начала давайте позаботимся о стилевом оформлении анимируемых элементов:

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

и объявим функцию, создающую анимируемый элемент:

~~~js
const createFigure = () => document.body
  .appendChild(document.createElement('div'))
~~~

Теперь перейдем непосредственно к анимации.

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

Помните, что именно браузер превращает в пиксели то, что вы создаете для юзера, и он гораздо эффективнее выполняет свою работу, чем ваш код.
CSS-анимация всегда согласована с частотой обновления страницы.
Вывод: вам не стоит пытаться конкурировать с браузером в том, в чем он заведомо сильнее вас.

Однако если уж так необходимо использовать скрипт для анимации чего-либо, то и здесь браузер предоставляет вам более надежный инструмент, чем таймеры.

Это **~requestAnimationFrame~** - метод объекта **window**.

____________________________________________

## ![ico-25 icon] requestAnimationFrame

Итак, есть несколько "недостатоков" таймеров, которые делают нежелательным их использование для анимации.
Первое - вы никогда не можете быть уверены в том, что время, которое пройдет до момента попадания колбека таймера в колстек, будет таким, которое вы задали при установке таймера.
Второе - совершенно нереально согласовать частоту перерисовки страницы браузером с частотой вызова колбека таймера.

В качестве аргумента **~requestAnimationFrame~** получает колбэк-функцию, которая будет вызвана перед следующей перерисовкой браузером страницы.

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

**~requestAnimationFrame~** возвращает целое число, являющееся уникальным идентификатором (ссылкой) для callback-функции.

~~~js
const showTime = function () {
  document.body.innerHTML = `<h3>${Date.now()}</h3>`
}

console.log(requestAnimationFrame(showTime))
~~~

Браузеры осуществляют перерисовку страницы с частотой ~ 60fps (frames per second - кадров в секунду).
Именно с этой частотой будет вызываться колбэк-функция, что позволяет избежать "дребезга" (_debouncing_).

Следующий пример наглядно демонстрирует, что использование **~requestAnimationFrame~**.
обеспечивает более "гладкую" анимацию, чем анимация с помощью таймеров,
поскольку частота изменения координат объекта согласована с частотой обновления (перерисовки) страницы браузером.

Как и в примере 5, сначала стилизуем анимируемые элементы:

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

Далее мы будем использовать функцию **~createFigure~** из того же примера 5.
А еще мы объявим функцию **~makeStep~**:

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

В следующем примере мы будем выводить на страницу массив сообщений:

~~~js
const messages = [
  'Old ECMAScript versions was named by numbers: ES5 and ES6.',
  'From 2016, versions are named by year: ES2016, 2018, 2020 ...',
  'ECMAScript® 2023 Internationalization API Specification',
  'The 2nd Edition API was adopted by the General Assembly of June 2015, as a complement to the ECMAScript 6th Edition.'
]
~~~

Сделаем так, чтобы эти сообщения выводились на страницу одновременно, но по одному символу за раз:

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

Так называемый "дребезг" (debounce) - это неприятное явление, которое означает, что какая-то функция вызывается слишком часто.
Чаще всего такое происходит с обработчиками событий UI.
Особенно это плохо, если код функции отправляет запрос на сервер.
Для обработки такого запроса нужно время, а нетерпеливый юзер может многократно нажимать на кнопку, не дождавшись немедленного ответа.
Так же дребезг может возникать вследствие технических причин, например, когда "залипает" кнопка мышки или клавиша на клавиатуре.

Наша задача - не допустить дребезг независимо от причины его происхождения, т.е. "дросселировать" (throttle) вызовы функции, контролируя их частоту.

В следующем примере **~requestAnimationFrame~** используется для того, чтобы при обработке кликов ограничить их частоту 1 кликом в секунду.

Объявим вспомогательную функцию **~addElem~**, которая позволит нам наглядно отобразить, как "дросселируются" клики: когда клик "проходит", то будет появляться закрашенный прямоугольник, когда клик игнорируется, то прямоугольник будет "пустым".
Функция **~addElem~** добавляет элемент на страницу и устанавливает его стилевое свойство ~background~ в значение, которое передано функции аргументом.
При этом дефолтное значение формального параметра **~back~** будет ~transparent~.

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

Теперь можно напилить сам код "дросселя":

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

## ![ico-25 icon] Примеры

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
