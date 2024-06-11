# ![ico-30 study] Генераторы и итераторы

**ES 2015**

^^Обычная функция не может быть приостановлена в середине кода и при следующем вызове продолжить с того места, где она остановилась.^^
^^Единственный способ выйти из обычной функции до того, как ее код исполнится до конца - это оператор _return_ или _throw_.^^
^^Если еще раз вызвать функцию, она начнет выполняться с начала.^^

__________________________________________

^^![ico-20 warn] Для того, чтобы обеспечить возможность приостановить выполнение кода и при следующем вызове продолжить с того места, где произошла остановка, в JS есть специальная функция-**генератор**.^^

## ![ico-25 icon] Symbol.iterator

Для того, чтобы некая коллекция данных (объект) была итерабельной, у нее должно быть определено свойство **~[Symbol.iterator]~**.

**~[Symbol.iterator]~** должен быть ссылкой на функцию-**_генератор_** (т.е. быть методом).

Чтобы быть **_генератором_**, этот метод должен удовлетворять следующим условиям:

______________________________

![ico-20 yes] Метод **~[Symbol.iterator]~** должен возвращать _объект_.
![ico-20 yes] Этот объект должен иметь метод **_~next()~_**.
![ico-20 yes] Метод **_~next()~_** должен возвращать объект со свойствами **_~value~_** и **_~done~_**.

___________________________

**Design pattern "~Iterator~"**

^^Используя свойство **~Symbol.iterator~**, создадим итерабельный объект **browsers**.^^
^^Для этого нам нужно, чтобы **~Symbol.iterator~** возвращал объект, у которого есть метод **~_next()_~**.^^

◘◘![ico-20 cap] ** 1**◘◘

~~~js
const browsers = {
  [Symbol.iterator]() {
    let step = 0
    return {
      next() {
        step++
        return step === 1
          ? { value: 'Google', done: false }
          : step === 2
            ? { value: 'Mozilla', done: false }
            : step === 3
              ? { value: 'Safari', done: false }
              : { value: '', done: true }
      }
   	}
  }
}
~~~

^^Проверим, что объект **browsers** является итерабельным:^^

~~~js
for (const name of browsers) {
  console.log(name)
}
~~~

{{{generators-1.js}}}


^^Теперь объект **browsers** можно деструктурировать и применять к нему оператор ~spread~:^^

~~~js
console.log(...browsers)
~~~

~~~console
Google Mozilla Safari
~~~

^^Что мы, собственно говоря, сделали:^^

^^создали генератор **~[Symbol.iterator]~**, который определяет протокол итерирования объекта **browsers**, т.е. последовательность перебора значений.^^

______________________________________

## ![ico-25 icon] Генератор

^^Предыдущий пример раскрывает принцип работы генератора.^^
^^Однако нет необходимости создавать генераторы подобным образом.^^
^^Этот шаблон проектирования уже реализован в языке встроенной функцией-генератором ![ico-20 smile]^^

Функция-генератор объявляется с помощью ключевого слова ~function *~

![ico-20 warn] ~ *~ - обязательный атрибут функции-генератора

Сама по себе функция-генератор ничего не итерирует,
но задает последовательность перебора значений (_протокол итерирования_)
и возвращает объект-**_итератор_**.

~~~js
const iterator = generator(...)
~~~

Поскольку основная задача генератора - задать точки, в которых код будет приостановлен с возвратом промежуточного результата, очевидно, что нужна некая альтернатива оператору **~return~**, поскольку использование **~return~** приведет к завершению выполнения кода.

Такой альтернативой является оператор  **~yield~**.

Этот оператор является инструкцией приостановки выполнения кода с возвратом промежуточного результата, следующего за оператором **~yield~**.

^^Вспомним, как работает асинхронная функция:^^
^^• она, как Карлсон, который живет на крыше, "_улетел, но обещал вернуться_" - нужно "ловить" момент ее "возвращения" методом  **_then_**^^
^^• внутри код приостанавливается и ждет завершения очередной асинхронной операции, пока не дойдет до конца или оператора **_return_**^^

Короче,

| Управление | **Асинхронная функция** | **Генератор** |
| _Приостановка_ | внутренняя<br>( **~await~** ) | внутренняя<br>( **~yield~** ) |
| _Возобновление работы_ | внутреннее<br>( **~await~** ) | внешнее<br>( метод **~next()~** итератора ) |
| | ~await~ отправляет колбэк в Event Loop и ждет его возвращения | ~yield~ выдает значение наружу и ждет очередного вызова ~next()~ |


~~~js
function* generator (...) {
  ...
  yield ...
  ...
  yield ...
  ...
}
~~~

Перепишем предыдущий пример с использованием функции-генератора:

____________________

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const browsers = {
  [Symbol.iterator]: function * () {
    yield 'Google'
    yield 'Mozilla'
    yield 'Safari'
  }
}
~~~

Код явно стал короче и читабельнее ![ico-20 smile]

_________________

◘◘![ico-20 cap] ** 3**◘◘

~~~js
const browsers = (function * () {
  yield 'Chrome'
  yield 'Mozilla'
  yield 'Safari'
  yield 'Edge'
})()

for (const x of [1, 2, 3, 4]) setTimeout(() => console.log(browsers.next().value), 1000 * x)
~~~

{{{generators-3.js}}}

Получается прикольная штука:
весь код внутри генератора выполняется асинхронно
^^(ведь заранее неизвестно, когда выполнение кода генератора возобновится начиная с места предыдущей остановки)^^

___________________________


## ![ico-25 icon] Итератор

**Итератор** - это _объект_,
у которого есть обязательный метод **~next()~**,
и этот метод возвращает _объект_
со свойствами **~_value_~** и **~_done_~**.

Итератор переходит от одного **~yield~** к следующему с помощью метода **~next()~**.

Все строго по протоколу ![ico-20 require]

**~next()~** переставляет лапы итератору, заставляя его двигаться по намеченному маршруту ![ico-20 smile]

### lazy evaluation

Попробуйте запустить рекурсивную функцию:

~~~js
function recurse (arg) {
  console.log(arg++)
  recurse(arg)
}

recurse(1)
~~~

на каком значении arg произойдет **RangeError** ?

Последнее значение, которое мы получим до **_Maximum call stack size exceeded_**, будет 11434

А теперь используем итератор:

~~~js
const lazyEvaluatedInfiniteList = (function * recurse (arg) {
  while (true) { yield arg++ }
})(0)

for (let x = 0; x < 12000; x++) {
  console.log(lazyEvaluatedInfiniteList.next().value)
}
~~~

Переполнения стека не происходит ![ico-20 wink]

С помощью генератора можно создавать бесконечные списки,
поскольку генератор обеспечивает "ленивые вычисления" значений элементов списка,
т.е. не нужно хранить их в памяти -
мы просто ставим в соответствие каждому элементу бесконечного списка
некую функцию, которая вычислит в нужный момент его значение

______________________________________________________________

## ![ico-25 icon] next()

У объекта-**_итератора_** обязательно есть метод **~next()~**

С помощью этого метода итератор переходит от текущего элемента структуры данных к следующему

![ico-20 warn] Этот метод возвращает объект с двумя свойствами:    **_~value~_**  и  **_~done~_**

• Свойство  **_~value~_**  содержит то, что указано в протоколе генератора после ключевого слова слова **~yield~**
• Свойство  **_~done~_**  принимает значение  ~true~, когда процесс итерирования структуры данных завершен

_____________________________________________________________

◘◘![ico-20 cap] ** 4**◘◘

~~~js
function * colorsGenerator () {
  const clr = () => Math.round(Math.random() * 255)
  while (true) { yield `rgb(${clr()}, ${clr()}, ${clr()})` }
}

const colorIterator = colorsGenerator()

for (let x=0; x < 100; x++) {
  const point = document.body
    .appendChild(document.createElement('div'))
  point.style = `
    float: left;
    width: 10px;
    height: 10px;
    background-color: ${ colorIterator.next().value};
  `
}
~~~

{{{generators-4.js}}}

Используя **IIFE**, можно сократь код:

~~~js
const colorIterator = (function * () {
  const clr = () => Math.round(Math.random() * 255)
  while (true) { yield `rgb(${clr()}, ${clr()}, ${clr()})` }
})()
~~~

Также можно отдельно вынести в функцию код создания элемента с параметрами ширины и высоты:

◘◘![ico-20 cap] ** 4.1**◘◘

~~~js
function createColoredElement (w, h) {
  const point = document.createElement('div')
  point.style = `
    position: absolute;
    width: ${w}px;
    height: ${h}px;
    background-color: ${ colorIterator.next().value};
  `
  return point
}
~~~

После чего можно в цикле создавать элементы:

~~~js
for (let x = 0; x < 75; x++) {
  document.body
    .appendChild(createColoredElement(400-x*5, 400-x*5))
}
~~~

{{{generators-4-1.js}}}

________________________________________________________________

Добавим асинхронности в предыдущие примеры (4)
Причем мы не будем использовать таймер,
а воспользуемся **~requestAnimationFrame~**

◘◘![ico-20 cap] ** 5**◘◘

~~~js
function * colorsGenerator () {
  const clr = () => Math.round(Math.random() * 255)

  while (true) {
    let counter = 10
    yield new Promise(resolve => requestAnimationFrame(function sigma () {
      if (counter-- > 0) requestAnimationFrame(sigma)
      else {
        counter = 10
        resolve(`rgb(${clr()}, ${clr()}, ${clr()})`)
      }
    }))
  }
}

const colorIterator = colorsGenerator()

async function showColors(num) {
  const res = colorIterator.next()
  const point = document.body
    .appendChild(document.createElement('div'))
  point.style = `
    float: left;
    width: 10px;
    height: 10px;
    background-color: ${await res.value};
  `;
  if (--num > 0) showColors(num)
}

showColors(50)
~~~

{{{generators-5.js}}}

________________________________________________________________

Для бесконечной подзагрузки данных с сервера при прокрутке страницы можно также использовать итератор:

◘◘![ico-20 cap] ** 6**◘◘

~~~js
const iterator = (function * (arg) {
  const add = user => Object.assign(document.body.appendChild(document.createElement('img')), {
    src: user.avatar_url,
    height: 100
  })
  while (true) {
    yield fetch(`https://api.github.com/users?since=${arg}`)
      .then(response => response.json())
      .then(users => users.forEach(user => add(user)))
    arg += 30
  }
})(0)


document.body.onmousewheel = () => iterator.next()
~~~

________________________________________

^^Пусть есть некий объект **user**^^

◘◘![ico-20 cap] ** 7**◘◘

~~~~js
const user = {
  login: 'Сергей',
  avatar: 'https://www.shareicon.net/data/2015/12/14/207817_face_300x300.png',
  email: 'serg789@gmail.com',

  place (tagName) {
    return document.body.appendChild(document.createElement(tagName))
  },

  showAvatar () {
    return Object.assign(this.place('img'), {
      src: this.avatar,
      width: 70
    })
  },

  showLogin () {
    return Object.assign(this.place('h3'), {
      innerHTML: this.login
    })
  },

  showEmail () {
    return Object.assign(this.place('p'), {
      innerHTML: this.email
    })
  }
}
~~~~

^^С помощью генератора определим протокол итерирования этого объекта:^^

~~~js
user.generator = function * () {
  yield this.showLogin()
  yield this.showEmail()
  yield this.showAvatar()
}
~~~

^^Теперь создадим объект итератора:^^

~~~js
user.iterator = user.generator ()
~~~

^^и запустим цикл итерирования:^^

~~~js
while (!user.iterator.next().done) {}
~~~

^^На самом деле такое решение является чрезмерно громоздким^^

^^Все значительно упростится с использованием глобального символа **~Symbol.iterator~**^^

^^Если у объекта есть свойство  **~Symbol.iterator~**, то этот объект является итерабельным^^
^^( то есть можно перебирать его свойства оператором for...of )^^

**~Symbol.iterator~**  является ссылкой на функцию-генератор

^^Используем **~Symbol.iterator~** в контексте предыдущего примера^^

~~~js
user[Symbol.iterator] = function * () {
  yield this.showLogin()
  yield this.showEmail()
  yield this.showAvatar()
}
~~~

^^Теперь объект **user** можно итерировать обычным ~for...of~^^

~~~js
for (const prop of user) {}
~~~

^^или воспользоваться оператором ~spread~:^^

~~~js
console.log(...user)
~~~

{{{generators-7.js}}}

___________________________________________________________________

◘◘![ico-20 cap] ** 8**◘◘

~~~js
const elements = [
  { tagName: 'h1', attrs: { id: 'first', innerText: 'first' } },
  { tagName: 'h2', attrs: { id: 'second', innerText: 'second' } },
  { tagName: 'h3', attrs: { id: 'third', innerText: 'third' } },
  { tagName: 'p', attrs: { id: 'forth', innerText: 'forth' } }
]

elements[Symbol.iterator] = function * () {
  let itemNum = 0
  while (itemNum < this.length) {
    yield (() => {
      const elem = document.body
        .appendChild(document.createElement(this[itemNum].tagName))
      for (const attr in this[itemNum].attrs) elem[attr] = this[itemNum].attrs[attr]
      itemNum++
      return elem
    })()
  }
}

console.log(...elements)
~~~

{{{generators-8.js}}}

___________________________________________________

## ![ico-25 icon] Связные списки

◘◘![ico-20 cap] ** 9**◘◘

~~~js
const points = {
  first:  { val: { x: 400, y: 30, c: '#09b' }, nextPoint: 'second' },
  forth:  { val: { x: 100, y: 50, c: '#f50' }, nextPoint: 'fifth' },
  sixth:  { val: { x: 300, y: 120, c: '#090' }, nextPoint: null },
  third:  { val: { x: 200, y: 90, c: '#990' }, nextPoint: 'forth' },
  fifth:  { val: { x: 50,  y: 100, c: '#f0f' }, nextPoint: 'sixth' },
  second: { val: { x: 150, y: 150, c: '#0ff' }, nextPoint: 'third' }
}

points[Symbol.iterator] = function * () {
  let currentPoint = 'first'

  const draw = (point) => {
    const { x, y, c } = point
    document.body
      .appendChild(document.createElement('div'))
      .style = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${c};
        position: absolute;
        top: ${y}px;
        left: ${x}px;
      `
  }

  while (currentPoint) {
    draw(this[currentPoint].val)
    currentPoint = this[currentPoint].nextPoint
    yield currentPoint
  }
}

console.log(...points)
~~~

{{{generators-9.js}}}

___________________________________________________

^^Пусть у нас есть массив объектов^^

◘◘![ico-20 cap] ** 10**◘◘

~~~js
const objects = [
  { val: 'first',  nextItem: 'second' },
  { val: 'forth',  nextItem: 'fifth' },
  { val: 'sixth',  nextItem: null },
  { val: 'third',  nextItem: 'forth' },
  { val: 'fifth',  nextItem: 'sixth' },
  { val: 'second', nextItem: 'third' }
]
~~~

^^Каждый элемент массива содержит свойство **~nextItem~** - ссылку на другой элемент этого же массива^^

^^Создадим протокол итерирования такого массива^^

^^Пусть элементы массива перебираются не в том порядке, в котором они расположены в массиве, а по новому протоколу, т.е. следующим будет выбираться элемент, указанный в свойстве **~nextItem~** текущего элемента^^

~~~js
function * someGenerator (objs) {
  let currentItem = objs[0]
  let nextItem = objs[0]

  while (!!nextItem) {
    currentItem = nextItem
    nextItem = !!currentItem.nextItem && objs.find(x => currentItem.nextItem === x.val) || null
    yield currentItem.val
  }
}
~~~

^^Генератор принимает в качестве аргумента ссылку на итерируемый массив^^

^^Создадим итератор для массива **objects**^^

~~~js
const iterator = someGenerator(objects)
~~~

^^Теперь можно использовать метод ~next()~ итератора **_iterator_**^^

______________________________________

^^![ico-20 pin] Изменим протокол итерирования массива^^

~~~js
objects[Symbol.iterator] = function * () {
  let currentItem = this[0]
  let nextItem = this[0]

  while (!!nextItem) {
    currentItem = nextItem
    nextItem = !!currentItem.nextItem && this.find(x => currentItem.nextItem === x.val) || null
    yield currentItem.val
  }
}
~~~

^^Теперь оператор ~for...of~ будет итерировать массив **objects** в нужном порядке^^

~~~js
for (const obj of objects) console.log(obj)
~~~

^^Кроме того, при деструктуризации массива **objects** значения будут возвращены в указанном протоколом порядке^^

~~~js
const [a, b, c, d] = objects
~~~

_________________________________________________________

## ![ico-25 icon] Потоки данных

Работа с большими объемамим данных может привести к снижению производительности кода
В этом случае лучше использовать потоки данных, которые можно читать небольшими фрагментами

Например, при работе с элементом ~canvas~ можно получить все пиксели изображения с помощью метода ~getImageData~, но это будет очень большой объем данных

Чтобы не считывать сразу весь контекст элемента ~canvas~ в память, можно организовать чтение, например, по строкам пикселей

Метод ~getImageData~ принимает 4 аргумента:

~~~js
const canvas = document.body
  .appendChild(document.createElement('canvas'))

const ctx = canvas.getContext('2d')

const imageData = ctx.getImageData(left, top, width, height)
~~~

Теперь мы можем получить данные о цвете пикселей:

~~~js
const data = imageData.data
~~~

Полученный итерабельный объект ~data~ состоит из квартетов байт
На описание цвета каждого пикселя требуется 4 байта:
3 байта на цветовые каналы red, green, blue
и еще один байт - на альфа-канал, управляющий прозрачностью

Таким образом, размер этого объекта будет в 4 раза больше, чем размер ~canvas~ в пикселях

Очевидно, что такой большой объем данных требует значительных ресурсов памяти
Поэтому "читать" и "писать" пиксели изображения лучше частями, например, построчно:


◘◘![ico-20 cap] ** 11**◘◘

~~~js
const canvas = document.body
  .appendChild(document.createElement('canvas'))

;[canvas.width, canvas.height] = [window.innerWidth, window.innerHeight]

canvas[Symbol.iterator] = function * () {
  const ctx = this.getContext('2d')

  let counter = 0

  do {
    const imageData = ctx.getImageData(0, counter, this.width, 1)
    const row = imageData.data
    for (let x = 0; x < row.length; x += 4) {
      for (let index = 0; index < 4; index++) row[x + index] += counter

      yield ctx.putImageData(imageData, 0, counter)

    }
  } while (counter++ < this.height)
}
~~~

Метод ~putImageData~ записывает новые данные в контекст элемента ~canvas~

Для более удачного результата лучше сначала настроить ~document.body~:

~~~js
document.body.style = `
  background: #000;
  padding: 0;
  margin: 0;
`
~~~

Теперь можно "проитерировать" canvas так:
~~~js
for (const point of canvas) {}
~~~
или так:
~~~js
console.log(...canvas)
~~~

правда, в этом случае консоль будет забита undefined ![ico-20 wink]

{{{generators-11.js}}}

Можно немного изменить пример так, чтобы значение цвета пикселей было случайным

~~~js
const canvas = Object.assign(document.body.appendChild(document.createElement('canvas')), {
  width: window.innerWidth,
  height: window.innerHeight,
  [Symbol.iterator]: function * () {
    const ctx = this.getContext('2d')
    let counter = 0

    do {
      const imageData = ctx.getImageData(0, counter, this.width, 1)
      const row = imageData.data
      for (let x = 0; x < row.length; x += 4) {
        for (let index = 0; index < 4; index++) row[x + index] = Math.round(Math.random() * 255)

        yield ctx.putImageData(imageData, 0, counter)
      }
    } while (counter++ < this.height)
  }
})

for (const x of canvas) {}
~~~

{{{generators-11-1.js}}}

Можно считывать и по одному пикселю:

~~~js
const canvas = document.body
  .appendChild(document.createElement('canvas'))

;[canvas.width, canvas.height] = [window.innerWidth, window.innerHeight]

const ctx = canvas.getContext('2d')

canvas[Symbol.iterator] = function * () {
  let counter = 0
  do {
    const [x, y] = [
      Math.round(Math.random() * this.width),
      Math.round(Math.random() * this.height)
    ]
    const imageData = ctx.getImageData(x, y, 1, 1)
    const point = imageData.data

    for (let index = 0; index < 4; index++) {
      point[index] += Math.round(Math.random() * 255)
    }

    yield ctx.putImageData(imageData, x, y)

  } while (counter++ < 1000)
}

for (const x of canvas) {}
~~~

_________________________________________________________

[![ico-30 hw] Quiz](quiz/gen)
