# ![ico-30 study] Генераторы и итераторы

**ES6**

_____________________________________________________________________________

## ![ico-25 icon] for await ... of

**2018**

Обычные итерабельные объекты мы итерируем с помощью обычного оператора ~for...of~
Если мы имеем дело с итерабельным объектом промисов, мы можем его итерировать с помощью ~for await ...of~:

~~~js
async function sample() {
  function sigma (resolve, message, index) {
    let counter = 60 * index
    requestAnimationFrame(function alpha () {
      if (counter-- > 0) requestAnimationFrame(alpha)
      else resolve(message)
    })
  }

  const promises = ['first', 'second', 'third']
    .map((item, index) => new Promise(resolve => sigma(resolve, item, index + 1)))

  for await (const item of promises) console.log(item)
}

sample()
~~~

Уже знакомый нам пример:

~~~js
const promise = val => new Promise(resolve => setTimeout(() => resolve(val), 1000))

const browsers = {
  [Symbol.iterator]: function * () {
    yield promise('Chrome')
    yield promise('Mozilla')
    yield promise('Safari')
    yield promise('IE')
  }
}

async function showBrowsers () {
  for await (const browser of browsers) console.log(browser)
}

showBrowsers()
~~~

Здесь мы создаем итерабельный объект **browsers**
функция-генератор ([Symbol.iterator]) с каждым ~yield~ возвращает промис
При итерировании объекта **browsers** нужно дождаться, когда разрезолвится предыдущий промис
Для этого нам нужна асинхронная функция, внутри которой мы сможем использовать ~for await...of~

_____________________________________________________

Теперь рассмотрим пример с генератором случайных чисел
Воспользуемся сервисом **_https://www.random.org/decimal-fractions/_**

Создадим асинхронный генератор **randomNum ()**

~~~js
async function * randomNum () {
  const url = 'https://www.random.org/decimal-fractions/?num=1&dec=10&col=1&format=plain&rnd=new'

  while (true) {
    yield Number(await (await fetch(url)).text())
  }
}

async function sample() {
  for await (const number of randomNum()) {
    console.log(number)
    if (number > 0.95) break
  }
}

sample()
~~~

_____________________________________________________________________________

## ![ico-25 icon] Symbol.asyncIterator

**2018**

Для того, чтобы сделать объект асинхронно итерабельным, нужно использовать **~Symbol.asyncIterator~** вместо **~Symbol.iterator~**
![ico-20 warn] Однако в обычном смысле этот объект не будет итерабельным

Давайте начнем с того, что объявим функцию promise:

◘◘promise◘◘

~~~js
const promise = val => new Promise(resolve => setTimeout(() => resolve(val), 1000))
~~~

Теперь создадим асинхронно-итерабельный объект:

◘◘browsers◘◘

~~~js
const browsers = {
  [Symbol.asyncIterator]: async function * () {
    yield promise('Chrome')
    yield promise('Mozilla')
    yield promise('Safari')
    yield promise('IE')
  },
  async show () {
    for await (const browser of browsers) console.log(browser)
  }
}
~~~

Мы создали ему свойство [ Symbol.asyncIterator ], которое является асинхронным генератором
Каждый ~yield~ этого генератора возвращает промис

Как видите, мы добавили ему метод **~show~**, с помощью которого можно асинхронно итерировать этот объект:

~~~js
browsers.show()
~~~

Значения будут выведены последовательно, с интервалом 1 сек.

Асинхронный генератор, объявленный как асинхронная функция, сам организовывает очередь и резолвит промисы

^^Движок JavaScript "под капотом" ставит в очередь вызовы next() и передает их асинхронному генератору, когда он будет готов^^
^^То есть после вызова метода ~next()~ можно сразу же вызывать следующий ~next()~, не дожидаясь ответа на предыдущий^^


Если мы уберем ключевое свово ~async~ в объявлении объекта, то асинхронный генератор будет возвращать промисы, которые нам прийдется резолвить в методе **~show~**:

◘◘browsers◘◘

~~~js
const browsers = {
  [Symbol.asyncIterator]: function * () {
    yield promise('Chrome')
    yield promise('Mozilla')
    yield promise('Safari')
    yield promise('IE')
  },
  async show () {
    for await (const browser of browsers) console.log(await browser)
  }
}
~~~

Обратите внимание, что объект **browsers** можно итерировать исключительно циклом ~for await...of~
Этот объект не является итерабельным в обычном смысле ( т.е. синхронно ),
т.е. к нему нельзя применять оператор ~spread~, обычный оператор цикла ~for...of~ и т.д.

Добавим объекту **browsers** синхронный генератор:

~~~js
const promise = val => new Promise(resolve => setTimeout(() => resolve(val), 1000))

const browsers = {
  [Symbol.asyncIterator] : async function * () {
    yield promise('Chrome')
    yield promise('FireFox')
    yield promise('Safari')
    yield promise('Edge')
  },
    
  [Symbol.iterator] : function * () {
    yield 'Google',
    yield 'Mozilla',
    yield 'Mac',
    yield 'Microsoft'
  },
    
  async show () {
    for await (const browser of browsers) console.log(browser)
  }
}

browsers.show()

console.log(...browsers)

Array.from(browsers).forEach(browser => console.log(browser))
~~~

Обратите внимание, что вызов асинхронного генератора (метода browsers.show()) стоит раньше, чем обращения к синхронному генератору, 
однако синхронный код будет выполнен раньше
_____________________________________________________________________________

## ![ico-25 icon] Асинхронный генератор

Создадим генератор, который выдает по одному символу в секунду из массива, переданного ему в качестве аргумента

◘◘![ico-20 cap] Пример 12◘◘

~~~js
async function* messageGenerator (arr) {
  while (arr.length > 0) {
    const result = await new Promise(resolve => setTimeout(() => resolve(arr.shift()), 1000))
    yield result
  }
}
~~~

Поскольку протокол итерирования, заложенный в генераторе, возвращает промис на каждой итерации, для работы с ним объявим асинхронную функцию **showMessage**

**showMessage** создаст итератор с помощью генератора **messageGenerator**, передав ему строку, которая будет выводиться на страницу по одному символу в секунду

**showMessage** будет ждать ( ~await~ ), когда асинхронный итератор вернет очередное значение, и после этого выведет его на страницу

~~~js
async function showMessage (message) {
  const iterator = messageGenerator([...message])
  let finish = false

  while (!finish) {
    const { value, done } = await iterator.next()
    document.body.textContent += !done ? value : ''
    finish = done
  }
}
~~~

Вызовем асинхронную функцию **showMessage**:

~~~js
showMessage('Привет, студент!')
~~~

{{{generators-12.js}}}

Примечание:
Гораздо логичнее будет использовать вместо таймера **requestAnimationFrame**:

◘◘![ico-20 cap] Пример 12.1◘◘

~~~js
async function * messageGenerator (arr) {
  while (arr.length > 0) {
    let counter = 60
    const result = await new Promise(resolve => requestAnimationFrame(function sigma () {
      if (counter-- > 0) requestAnimationFrame(sigma)
      else {
        counter = 60
        resolve(arr.shift())
      }
    }))

    yield result
  }
}
~~~

Объясните, почему ![ico-20 wink]

_______________________________________________________

◘◘![ico-20 cap] Пример 13◘◘

~~~js
const circle = Object.assign(document.createElement('div'), {
  style: `
    border: solid 2px blue;
    width: 50px;
    height: 50px;
    position: absolute;
    border-radius: 50%;
    transition: all 0.2s;
    opacity: 1;
  `
})

circle.bubblesGenerator = (async function * () {
  const bubble = () => new Promise(resolve => setTimeout(() => resolve('next'), 100))
  while (true) {
    const radius = this.offsetWidth > 200 ? 50 : this.offsetWidth + 5
    await bubble()
    Object.assign(this.style, {
      width: `${radius}px`,
      height: `${radius}px`,
      opacity: radius === 50 ? 1 : Math.max(this.style.opacity - 0.02, 0)
    })

    yield radius
  }
}).call(circle)


document.body.appendChild(circle)

async function show () {
  let step = 200
  while (step --> 0) await circle.bubblesGenerator.next()
}

show()
~~~

{{{generators-13.js}}}

______________________________________________________

### ![ico-25 cap] Примеры асинхронного генератора

| [:::14:::](https://garevna.github.io/js-samples/#22) | [:::15:::](https://garevna.github.io/js-samples/#23) | [:::16:::](https://garevna.github.io/js-samples/#24) | [:::17:::](https://garevna.github.io/js-samples/#21) |


^^^[Описание примера 17]

^^Создадим слайдер с помощью итератора^^

^^Для начала определим массив картинок **pictures**^^

~~~js
const pictures = [
  'https://cdn.pixabay.com/photo/2023/10/06/07/14/plant-8297610_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/10/12/14/41/town-8310950_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/01/18/16/46/hong-kong-1990268__340.jpg',
  'https://cdn.pixabay.com/photo/2013/03/02/02/41/city-89197__340.jpg',
  'https://cdn.pixabay.com/photo/2017/12/10/17/40/prague-3010407__340.jpg',
  'https://cdn.pixabay.com/photo/2018/01/31/12/16/architecture-3121009__340.jpg',
  'https://cdn.pixabay.com/photo/2015/02/24/13/23/city-647400__340.jpg',
  'https://cdn.pixabay.com/photo/2018/11/29/21/19/hamburg-3846525__340.jpg'
]
~~~

^^Добавим массиву **pictures** метод **_createSlide_**^^

~~~js
pictures.createSlide = function () {
  const slide = document.body
    .appendChild(document.createElement('figure'))

  slide.style = `
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 10%;
    right: 10%;
    transition: all 0.5s;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  `

  slide.onclick = function () {
    this.iterator.next()
  }.bind(this)

  return slide
}
~~~

^^Этот метод создает и возвращает html-элемент с заданными стилевыми атрибутами и обработчиком события ~click~^^

^^Обратите внимание, что обработчик события ~click~ вызывает метод **_~next()~_** итератора^^

^^Определим этот итератор^^

^^Для этого нужно объявить и вызвать функцию-генератор^^

^^Мы объединим два этих действия в одно с помощью **IIFE**^^

~~~js
pictures.iterator = (function * () { ... }).call(pictures)
~~~

^^Обратите внимание, что мы вызываем анонимную функцию-генератор в контексте объекта **pictures**^^

^^Теперь ~this~ внутри генератора будет показывать в правильном направлении ![ico-20 ok]^^

^^Внутри анонимной функции-генератора:^^

_________________________

^^![ico-20 pin] объявим вспомогательную функцию **_moveSlide_**, которая будет сдвигать слайд в нужном направлении в зависимости от значения второго аргумента **active**^^

^^Этот аргумент принимает логическое значение^^

^^Если ~true~, то слайд сдвигается в видимую часть страницы, т.е. становится активным^^

^^В противном случае слайд "уходит" из видимой зоны^^

^^Первым аргументом передается ссылка на сдвигаемый слайд^^

~~~js
function moveSlide (slide, active) {
  slide.style.left = `${ active ? 10 : -100 }%`
  slide.style.right = `${ active ? 10 : 100 }%`
  slide.style.opacity = active ? 1 : 0
}
~~~

__________________________

^^![ico-20 pin] Создадим приватный метод **_getNextPictureNum_**, который будет возвращать индекс следующего элемента массива **pictures**^^

^^Обратите внимание, что этой функции мы заранее "закрепляем" контекст вызова с помощью метода ~bind()~, поскольку в противном случае это будет глобальный контекст^^

~~~js
const getNextPictureNum = function () {
  return this.currentPicture < this.length - 1 ? this.currentPicture + 1 : 0
}.bind(this)
~~~

____________________________

^^![ico-20 pin] Теперь создадим массив их двух слайдов^^

~~~js
const slides = [
  this.createSlide(),
  this.createSlide()
]
~~~

^^Для этого, как видите, мы воспользовались публичным методом **_createSlide_** массива **pictures**^^

___________________________________

^^![ico-20 pin] Объявим еще пару переменных^^

^^• приватное свойство **_currentSlide_** будет индексом активного слайда^^
^^• публичное свойство **_currentPicture_** будет содержать индекс текущего элемента массива **pictures**^^

~~~js
let currentSlide = 0
this.currentPicture = 0
~~~

_________________________________

^^![ico-20 pin] Осталось совсем немного - написать сам протокол итерирования^^

^^В процессе итерирования слайды ~slides[0]~ и ~slides[1]~ будут постоянно меняться местами^^
^^т.е. активным текущим слайдом по очереди будет то ~slides[0]~, то ~slides[1]~^^
^^вычислять индекс неактивного слайда для смены слайдов мы будем так:^^

~~~js
Math.abs(currentSlide - 1)
~~~

Итак, протокол итерирования:

~~~js
while (true) {
  this.nextPicture = getNextPictureNum()
  slides[Math.abs(currentSlide - 1)].style.backgroundImage = `url(${this[this.nextPicture]})`
  moveSlide(slides[currentSlide], false)
  await waitFor(500)
  moveSlide(slides[Math.abs(currentSlide - 1)], true)
  await waitFor(500)
  this.currentPicture = this.nextPicture
  this.nextPicture = getNextPictureNum()
  currentSlide = Math.abs(currentSlide - 1)

  yield slides[currentSlide]

}
~~~

^^^

**Полный код слайдера**

~~~~js
const pictures = [
  'https://cdn.pixabay.com/photo/2023/10/06/07/14/plant-8297610_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/10/12/14/41/town-8310950_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/01/18/16/46/hong-kong-1990268__340.jpg',
  'https://cdn.pixabay.com/photo/2013/03/02/02/41/city-89197__340.jpg',
  'https://cdn.pixabay.com/photo/2017/12/10/17/40/prague-3010407__340.jpg',
  'https://cdn.pixabay.com/photo/2018/01/31/12/16/architecture-3121009__340.jpg',
  'https://cdn.pixabay.com/photo/2015/02/24/13/23/city-647400__340.jpg',
  'https://cdn.pixabay.com/photo/2018/11/29/21/19/hamburg-3846525__340.jpg'
]

class PictureSlider {
  constructor (pictures, container = document.body) {
    this.container = container
    this.pictures = pictures

    this.currentSlide = 0
    this.currentPicture = 0
    this.slides = [0, 1].map(() => this.createSlide())
    this.setPicture()

    this.iterator = (function * () {
      while (true) {
        this.currentPicture = this.getNextPictureNum()

        ;[this.currentSlide, Math.abs(this.currentSlide - 1)]
          .forEach((num, index) => this.moveSlide(num, !!index))
        this.currentSlide = Math.abs(this.currentSlide - 1)
        this.setPicture()
        
        yield this.slides[this.currentSlide]
      }
    }).call(this)
  }

  createSlide () {
    const slide = this.container.appendChild(document.createElement('figure'))
    return Object.assign(slide, {
      style: `
        position: absolute;
        top: 10%;
        bottom: 10%;
        left: 10%;
        right: 10%;
        transition: all 0.5s;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
      `,
      onclick: function () { this.iterator.next() }.bind(this)
    })
  }

  moveSlide (slideNum, isActive) {
    Object.assign(this.slides[slideNum].style, {
      left: `${ isActive ? 10 : -100 }%`,
      right: `${ isActive ? 10 : 100 }%`,
      opacity: isActive ? 1 : 0
    })
  }

  getNextPictureNum () {
    return this.currentPicture < this.pictures.length - 1
      ? this.currentPicture + 1
      : 0
  }

  setPicture () {
    this.slides[this.currentSlide]
      .style
      .backgroundImage = `url(${this.pictures[this.currentPicture]})`
  }
}

const pictureSlider = new PictureSlider(pictures)
~~~~

{{{generators-17.js}}}

_______________________________________________________

◘◘![ico-25 cap] Пример 18◘◘

~~~~js
Object.assign(document.body.appendChild(document.createElement('button')), {
  innerText: 'new',
  onclick: function (event) {
    const { value, done } = getAvatar.next()
    if (!done) document.body.appendChild(value)
  }
})

function* avaGenerator () {
  let num = 9
  while (++num < 99) {
    yield Object.assign(document.createElement('img'), {
      src: `https://www.shareicon.net/data/2015/12/14/2078${num}_face_300x300.png`,
      width: 80
    })
  }
}

const getAvatar = avaGenerator ()
~~~~

{{{generators-18.js}}}

_________________________________________________________

[![ico-30 hw] **Тесты**](https://garevna.github.io/js-quiz/#gen)
