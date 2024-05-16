# ![ico-30 study] Таймеры

Первым аргументом таймеру в обязательном порядке передается функция обратного вызова (callback)
Установка таймера возвращает числовой идентификатор таймера

## ![ico-25 icon] setTimeout

Метод ~setTimeout~ объекта ~window~ принимает два аргумента:

![ico-20 green-ok] функцию обратного вызова (callback)
![ico-20 green-ok] длительность интервала задержки (в миллисекундах)

Функция, переданная в качестве первого аргумента, будет вызвана через указанный вторым аргументом интервал

~~~js
(function () {
  console.log('START')

  setTimeout(() => console.log('Прошла 1 секунда'), 1000)

  console.log('END')
})()
~~~

Сначала в консоль будут выведены сообщения 'START' и 'END',

а затем, примерно через секунду - сообщение 'Прошла 1 секунда'

Однако это не означает, что если передать нулевое значение методу ~setTimeout~, то вызов коллбэк-функции произойдет немедленно

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
( основной поток завершил работу, стек вызовов пуст )
1
3
~~~

____________________________

## ![ico-25 icon] setInterval

____________________________________________

## ![ico-25 icon] requestAnimationFrame

**requestAnimationFrame** - метод объекта **window**

В качестве аргумента получает колбэк-функцию, которая будет вызвана перед следующей перерисовкой браузером страницы

~~~js
const showTime = function () {
  document.body.innerHTML = `<h3>${Date.now()}</h3>`
  requestAnimationFrame(showTime)
}

showTime()
~~~

Возвращает целое число, являющееся уникальным идентификатором (ссылкой) для callback-функции

~~~js
const showTime = function () {
  document.body.innerHTML = `<h3>${Date.now()}</h3>`
}

console.log(requestAnimationFrame(showTime))
~~~

Браузеры осуществляют перерисовку страницы с частотой ~ 60fps (frames per second - кадров в секунду)
Именно с этой частотой будет вызываться колбэк-функция, что позволяет избежать "дребезга" (_debouncing_)

Следующее live demo наглядно демонстрирует, что использование **~requestAnimationFrame~** 
обеспечивает более "гладкую" анимацию, чем анимация с помощью таймеров, 
поскольку частота изменения координат объекта 
согласована с частотой обновления ( перерисовки ) страницы браузером

~~~~js
let stopAnimation = false

document.body.onclick = () => stopAnimation = true

const style = document.head
  .appendChild(document.createElement('style'))

style.textContent = `
  .animated {
    position: absolute;
    width: 150px;
    height: 50px;
    left: 10px;
    font-family: Arial;
    font-size: 12px;
    color: white;
    padding: 8px;
  }
  .requestAnimationFrame {
    background-color: #079;
    top: 320px;
  }
`

const figure = document.body
  .appendChild(document.createElement('div'))

figure.classList.add('animated', 'requestAnimationFrame')
figure.innerText = 'requestAnimationFrame'

figure.showMustGoOn = function () {
  this.style.left = this.offsetLeft + 1 + 'px'
  !stopAnimation && requestAnimationFrame(this.showMustGoOn)
}.bind(figure)

figure.showMustGoOn ()
~~~~

Нажмите кнопку **Start** для запуска демонстрации

{{{requestAnimationFrame-1.js}}}


___________________________________________________

## ![ico-25 icon] debounce and requestAnimationFrame

В следующем примере requestAnimationFrame используется для того, чтобы при обработке кликов ограничить их частоту 1 кликом в секунду

~~~js
const section = document.body

section.timeStamps = []

section.showClick = function () {
  const elem = section.appendChild(document.createElement('span'))
  const interval = section.timeEnd - section.timeStart
  const back = interval >= 1000 ? '#09b' : 'transparent'
  section.timeStart = interval >= 1000 ? section.timeEnd : section.timeStart

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

section.onclick = (function () {
  section.timeStart = section.timeEnd = new Date().getTime()

  return function (event) {
    section.timeEnd = new Date().getTime()
    requestAnimationFrame(section.showClick)
  }
})()
~~~

{{{Timers-1.js}}}

_________________________________________________________

## ![ico-25 icon] requestAnimationFrame

Следующие примеры идентичны во всем, кроме одного:

в первом примере мы используем **requestAnimationFrame**,
а во втором - **setInterval**

~~~~js
let stop = false
document.body.onclick = () => stop = !stop

function MovieElement (title) {
  this.elem = this.container.appendChild(document.createElement('div'))
  this.elem.style = `
    position: absolute;
    width: ${this.size}px;
    height: ${this.size}px;
    background: ${this.randomColor()};
    top: ${this.randomY ()}px;
    left: ${this.randomX ()}px;
    font-size: 10px;
    font-family: Arial;
  `

  this.elem.title = title
  this.targetY = null
  this.targetX = null

  requestAnimationFrame(this.movieClip.bind(this))
}

MovieElement.prototype.size = 40

MovieElement.prototype.container = document.body
  .appendChild(document.createElement('section'))

MovieElement.prototype.container.style = `
  position: absolute;
  width: 95%;
  height: 300px;
  background-color: #000;
`

MovieElement.prototype.randomNum = maxVal => Math.round(Math.random() * maxVal)

MovieElement.prototype.randomX = function () {
  return this.randomNum(this.container.offsetWidth - this.size)
}

MovieElement.prototype.randomY = function () {
  return this.randomNum(this.container.offsetHeight - this.size)
}

MovieElement.prototype.randomColor = function () {
  return `rgb(${this.randomNum(255)}, ${this.randomNum(255)}, ${this.randomNum(255)})`
}

MovieElement.prototype.getDistance = function (axis) {
  return this['target' + axis.toUpperCase()] - parseInt(this.elem.style[axis.toLowerCase() === 'y' ? 'top' : 'left'])
}

MovieElement.prototype.movieClip = function () {
  if (!this.targetY && !this.targetX) {
    this.targetY = this.randomY()
    this.targetX = this.randomX()
  } else {
    this.distanceY = this.getDistance('y')
    this.distanceX = this.getDistance('x')
    if (this.distanceY === 0 && this.distanceX === 0) {
      this.targetY = null
      this.targetX = null
    } else {
      this.stepY = Math.sign(this.distanceY)
      this.stepX = Math.sign(this.distanceX)
      this.elem.style.top = parseInt(this.elem.style.top) + this.stepY + 'px'
      this.elem.style.left = parseInt(this.elem.style.left) + this.stepX + 'px'
    }
  }

  stop || requestAnimationFrame(this.movieClip.bind(this))
}

for (const tick of [1, 2, 3, 4]) {
  new MovieElement(tick)
}
~~~~

{{{Timers-requestAnimationFrame.js}}}

___________________________________________________

{{{Timers-requestAnimationFrame-1.js}}}

___________________________________________________

## ![ico-25 icon] setInterval

~~~~js
let stop = false
document.body.onclick = () => stop = !stop

function MovieElement (title) {
  this.elem = this.container
    .appendChild(document.createElement('div'))
  this.elem.style = `
    position: absolute;
    width: ${this.size}px;
    height: ${this.size}px;
    background: ${this.randomColor()};
    top: ${this.randomY ()}px;
    left: ${this.randomX ()}px;
    font-size: 10px;
    font-family: Arial;
  `

  this.elem.title = title

  this.targetY = null
  this.targetX = null

  this.mc = this.movieClip.bind(this) 

  this.interval = setInterval(this.mc, 10)
}

MovieElement.prototype.size = 40

MovieElement.prototype.container = document.body
  .appendChild(document.createElement('section'))

MovieElement.prototype.container.style = `
  position: absolute;
  width: 95%;
  height: 300px;
  background-color: #000;
`

MovieElement.prototype.randomNum = maxVal => Math.round(Math.random() * maxVal)

MovieElement.prototype.randomX = function () {
  return this.randomNum(this.container.offsetWidth - this.size)
}

MovieElement.prototype.randomY = function () {
  return this.randomNum(this.container.offsetHeight - this.size)
}

MovieElement.prototype.randomColor = function () {
  return `rgb(${this.randomNum(255)}, ${this.randomNum(255)}, ${this.randomNum(255)})`
}

MovieElement.prototype.getDistance = function (axis) {
  return this['target' + axis.toUpperCase()] -
    parseInt(this.elem.style[axis.toLowerCase() === 'y' ? 'top' : 'left'])
}

MovieElement.prototype.movieClip = function () {
  if (!this.targetY && !this.targetX) {
    Object.assign(this, {
      targetY: this.randomY(),
      targetX: this.randomX()
    })
  } else {
    Object.assign(this, {
      distanceY: this.getDistance('y'),
      distanceX: this.getDistance('x')
    })

    if (!this.distanceY && !this.distanceX) {
      Object.assign(this, { targetY: null, targetX: null })
    } else {
      Object.assign(this, {
        stepY: Math.sign(this.distanceY),
        stepX: Math.sign(this.distanceX)
      })
      Object.assign(this.elem.style, {
        top: parseInt(this.elem.style.top) + this.stepY + 'px',
        left: parseInt(this.elem.style.left) + this.stepX + 'px'
      })
    }
  }

  stop ? clearInterval(this.interval) : null
}

for (const item of [1, 2, 3, 4]) {
  const mc = new MovieElement(item)
}
~~~~

{{{Timers-setInterval.js}}}
