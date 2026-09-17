# ![ico-30 study] {{common.c20}}

**ES 2015**

_____________________________________________________________________________

## ![ico-25 icon] for await ... of

**2018**

{{p1}}
{{p2}}

◘◘![ico-25 cap] ** 1**◘◘
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

{{p3}}

◘◘![ico-25 cap] ** 2**◘◘
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

{{p4}}
{{p5}}
{{p6}}
{{p7}}

_____________________________________________________

{{p8}}
{{p9}}

{{p10}}

◘◘![ico-25 cap] ** 3**◘◘
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

{{p11}}
{{p12}}

{{p13}}

◘◘promise◘◘
~~~js
const promise = val => new Promise(resolve => setTimeout(() => resolve(val), 1000))
~~~

{{p14}}

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

{{p15}}
{{p16}}

{{p17}}

~~~js
browsers.show()
~~~

{{p18}}

{{p19}}

{{p20}}
{{p21}}


{{p22}}

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

{{p23}}
{{p24}}
{{p25}}

{{p26}}

~~~js
const promise = val => new Promise(resolve => setTimeout(() => resolve(val), 1000))

const browsers = {
  [Symbol.asyncIterator]: async function * () {
    yield promise('Chrome')
    yield promise('FireFox')
    yield promise('Safari')
    yield promise('Edge')
  },

  [Symbol.iterator]: function * () {
    yield 'Google',
    yield 'Mozilla',
    yield 'Apple',
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

{{p27}}
{{p28}}
_____________________________________________________________________________

## ![ico-25 icon] {{p29}}

{{p30}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
async function * messageGenerator (arr) {
  while (arr.length > 0) {
    const result = await new Promise(resolve => setTimeout(() => resolve(arr.shift()), 1000))
    yield result
  }
}
~~~

{{p31}}

{{p32}}

{{p33}}

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

{{p34}}

~~~js
showMessage('Привет, студент!')
~~~

{{{generators-12.js}}}

{{common.c16}}
{{p35}}

◘◘![ico-25 cap] ** 5**◘◘

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

{{p36}}

_______________________________________________________

◘◘![ico-20 cap] ** 6**◘◘

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

### ![ico-25 cap] {{p37}}

@@@@ 4

[:::7:::](samples/22)
[:::8:::](samples/23)
[:::9:::](samples/24)
[:::10:::](samples/21)

@@@@


^^^[{{p38}}]

{{p39}}

{{p40}}

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

{{p41}}

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

{{p42}}

{{p43}}

{{p44}}

{{p45}}

{{p46}}

~~~js
pictures.iterator = (function * () { ... }).call(pictures)
~~~

{{p47}}

{{p48}}

{{p49}}

_________________________

{{p50}}

{{p51}}

{{p52}}

{{p53}}

{{p54}}

~~~js
function moveSlide (slide, active) {
  slide.style.left = `${ active ? 10 : -100 }%`
  slide.style.right = `${ active ? 10 : 100 }%`
  slide.style.opacity = active ? 1 : 0
}
~~~

__________________________

{{p55}}

{{p56}}

~~~js
const getNextPictureNum = function () {
  return this.currentPicture < this.length - 1 ? this.currentPicture + 1 : 0
}.bind(this)
~~~

____________________________

{{p57}}

~~~js
const slides = [
  this.createSlide(),
  this.createSlide()
]
~~~

{{p58}}

___________________________________

{{p59}}

{{p60}}
{{p61}}

~~~js
let currentSlide = 0
this.currentPicture = 0
~~~

_________________________________

{{p62}}

{{p63}}
{{p64}}
{{p65}}

~~~js
Math.abs(currentSlide - 1)
~~~

{{p66}}

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

{{p67}}

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

◘◘![ico-25 cap] ** 11**◘◘

~~~js
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
~~~

{{{generators-18.js}}}

_________________________________________________________

[![ico-30 hw] Quiz](quiz/gen)
