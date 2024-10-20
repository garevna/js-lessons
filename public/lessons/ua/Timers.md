# ![ico-35 study] Таймери

Першим аргументом таймера обов'язково передається функція зворотного виклику (callback).
Встановлення таймера повертає числовий ідентифікатор таймера.

## ![ico-30 clock] setTimeout

Метод ~setTimeout~ об'єкта ~window~ приймає два аргументи:

![ico-20 green-ok] функцію зворотного виклику (callback).
![ico-20 green-ok] тривалість інтервалу затримки (в мілісекундах).

Функція, передана як перший аргумент, буде викликана з інтервалом, зазначеним другим аргументом.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
(function () {
  console.log('START')

  setTimeout(() => console.log('One second has passed'), 1000)

  console.log('END')
})()
~~~

Спочатку в консолі з'являться повідомлення 'START' та 'END',
а потім, приблизно через секунду, повідомлення 'One second has passed'.

Однак це не означає, що якщо ви передасте нульове значення методу ~setTimeout~, функція зворотного виклику буде викликана негайно.

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
undefined // основний потік завершив роботу, стек викликів порожній.
1
3
~~~

____________________________

## ![ico-25 clock] setInterval

Я не рекомендую вам використовувати цей таймер.
По-перше, тому що точний часовий інтервал витримати неможливо.

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

![ico-25 warn] Обов'язково зупиніть таймери, інакше сторінка «зависне».
Це, до речі, друга причина, по якій не варто використовувати таймер **~setInterval~**.

{{{Timers-3.js}}}

_________________________________________

І третя причина, по якій не варто використовувати таймер **~setInterval~** полягає в тому, що частота, з якою браузер перемальовує сторінку, ніколи не буде співпадати з частотою, з якою викликається callback вашого таймера.

Тобто callback таймера може спрацьовувати кілька разів, але це буде відображатися на сторінці тільки при наступному перемальовуванні сторінки браузером.

Подивіться, як оновлюється на сторінці значення лічильника, яке збільшується таймером, встановленим на 1 мс:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
let counter = 0

const interval = setInterval(() => counter++, 1)
~~~

{{{Timers-4.js}}}

___________________________________________

Тепер давайте подивимося, як (не треба) анімувати об'єкт на сторінці за допомогою таймера **~setInterval~**.
Оскільки я рекомендую вам віддавати перевагу CSS-анімації скрізь, де це можливо, цей приклад також продемонструє аналогічну анімацію, але з **~@keyframes~**.

Для початку давайте подбаємо про стилізацію елементів, які будуть анімовані:

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

і оголосимо функцію, яка створює анімований елемент:

~~~js
const createFigure = () => document.body
  .appendChild(document.createElement('div'))
~~~

Тепер перейдемо до самої анімації.

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

Пам'ятайте, що саме браузер перетворює те, що ви створюєте для користувача, в пікселі, і він виконує свою роботу набагато ефективніше, ніж ваш код.
CSS-анімація завжди узгоджується з частотою оновлення сторінки.
Висновок: вам не варто намагатися конкурувати з браузером в тому, в чому він однозначно сильніший за вас.

Однак, якщо вам дійсно потрібно використовувати скрипт для анімації чогось, то браузер надає вам більш надійний інструмент, ніж таймери.

Це метод объекта window **~requestAnimationFrame~**.

____________________________________________

## ![ico-25 icon] requestAnimationFrame

Отже, є кілька «недоліків» таймерів, які роблять небажаним їх використання для анімації.
По-перше, ви ніколи не можете бути впевнені, що час, який пройде до того, як callback таймера потрапить у Call Stack, буде тим, який ви визначили під час встановлення таймера.
По-друге, абсолютно нереально звірити частоту перемальовування сторінок браузером з частотою виклику callback таймера.

У якості аргументу **~requestAnimationFrame~** отримує колбек-функцію, яка буде викликана перед наступною перерисовкою браузером сторінки.

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

**~requestAnimationFrame~** повертає ціле число, яке є унікальним ідентифікатором (посиланням) для функції зворотного виклику.

~~~js
const showTime = function () {
  document.body.innerHTML = `<h3>${Date.now()}</h3>`
}

console.log(requestAnimationFrame(showTime))
~~~

Браузери перемальовують сторінку зі швидкістю ~ 60fps (frames per second - кадрів в секунду).
Саме з цією частотою буде викликатися колбек-функція, що дозволяє уникнути "дребезгу" (_debouncing_).

Наступний приклад ілюструє, що **~requestAnimationFrame~**
забезпечує більш плавну анімацію, ніж анімація з таймером,
тому що частота зміни координат об'єкта узгоджується з частотою оновлення (перемальовування) сторінки браузером.

Як і в прикладі 5, спочатку стилізуємо анімовані елементи:

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

Далі ми будемо використовувати функцію **~createFigure~** з того ж прикладу 5.
А ще ми оголосимо функцію **~makeStep~**:

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

// Запускаємо анімацію:

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

У наступному прикладі ми виводитимемо на сторінку масив повідомлень:

~~~js
const messages = [
  'Old ECMAScript versions was named by numbers: ES5 and ES6.',
  'From 2016, versions are named by year: ES2016, 2018, 2020 ...',
  'ECMAScript® 2023 Internationalization API Specification',
  'The 2nd Edition API was adopted by the General Assembly of June 2015, as a complement to the ECMAScript 6th Edition.'
]
~~~

Зробимо так, щоб ці повідомлення виводилися на сторінку одночасно, але по одному символу за один раз:

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

Так званий "дребезг" (debounce) – це неприємне явище, яке означає, що якась функція викликається занадто часто.
Найчастіше таке відбувається з обробниками подій UI.
Особливо це погано, якщо код функції надсилає запит на сервер.
Для обробки такого запиту потрібен час, а нетерплячий користувач може багаторазово натискати на кнопку, не дочекавшись негайної відповіді.
Так само дребезг може виникати внаслідок технічних причин, наприклад, коли "залипає" кнопка мишки або клавіша на клавіатурі.

Наше завдання - не допустити дребезг незалежно від причини його походження, тобто «дроселювати» (throttle) виклики функції, контролюючи їхню частоту.

У наступному прикладі **~requestAnimationFrame~** використовується для того, щоб під час обробки кліків обмежити їхню частоту до 1 кліка на секунду.

Оголосимо допоміжну функцію **~addElem~**, яка дозволить нам наочно відобразити, як "дросселюються" кліки: коли клік "проходить", то з'являтиметься зафарбований прямокутник, коли клік ігнорується, то прямокутник буде "порожнім".
Функція **~addElem~** додає елемент на сторінку та встановлює його стильову властивість ~background~ у значення, яке передано функції аргументом.
При цьому дефолтне значення формального параметра **~back~** буде ~transparent~.

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

Тепер можна напиляти сам код "дросселя":

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

## ![ico-25 icon] Приклади

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
