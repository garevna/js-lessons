# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

_____________________________________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}

{{s2.p4}}
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

{{s2.p5}}

{{s2.p6}}
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

{{s2.p7}}
{{s2.p8}}
{{s2.p9}}
{{s2.p10}}

_____________________________________________________

{{s2.p11}}
{{s2.p12}}

{{s2.p13}}

{{s2.p14}}
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

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}
{{s3.p3}}

{{s3.p4}}

{{s3.p5}}
~~~js
const promise = val => new Promise(resolve => setTimeout(() => resolve(val), 1000))
~~~

{{s3.p6}}

{{s3.p7}}
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

{{s3.p8}}
{{s3.p9}}

{{s3.p10}}

~~~js
browsers.show()
~~~

{{s3.p11}}

{{s3.p12}}

{{s3.p13}}
{{s3.p14}}


{{s3.p15}}

{{s3.p16}}
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

{{s3.p17}}
{{s3.p18}}
{{s3.p19}}

{{s3.p20}}

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

{{s3.p21}}
{{s3.p22}}
_____________________________________________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

~~~js
async function * messageGenerator (arr) {
  while (arr.length > 0) {
    const result = await new Promise(resolve => setTimeout(() => resolve(arr.shift()), 1000))
    yield result
  }
}
~~~

{{s4.p3}}

{{s4.p4}}

{{s4.p5}}

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

{{s4.p6}}

~~~js
showMessage('Привет, студент!')
~~~

{{{generators-12.js}}}

{{s4.p7}}
{{s4.p8}}

{{s4.p9}}

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

{{s4.p10}}

_______________________________________________________

{{s4.p11}}

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

### ![ico-25 cap] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}
{{s5.p3}}
{{s5.p4}}
{{s5.p5}}

{{s5.p6}}


^^^[{{s5.spoiler1}}]

{{s5.p7}}

{{s5.p8}}

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

{{s5.p9}}

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

{{s5.p10}}

{{s5.p11}}

{{s5.p12}}

{{s5.p13}}

{{s5.p14}}

~~~js
pictures.iterator = (function * () { ... }).call(pictures)
~~~

{{s5.p15}}

{{s5.p16}}

{{s5.p17}}

_________________________

{{s5.p18}}

{{s5.p19}}

{{s5.p20}}

{{s5.p21}}

{{s5.p22}}

~~~js
function moveSlide (slide, active) {
  slide.style.left = `${ active ? 10 : -100 }%`
  slide.style.right = `${ active ? 10 : 100 }%`
  slide.style.opacity = active ? 1 : 0
}
~~~

__________________________

{{s5.p23}}

{{s5.p24}}

~~~js
const getNextPictureNum = function () {
  return this.currentPicture < this.length - 1 ? this.currentPicture + 1 : 0
}.bind(this)
~~~

____________________________

{{s5.p25}}

~~~js
const slides = [
  this.createSlide(),
  this.createSlide()
]
~~~

{{s5.p26}}

___________________________________

{{s5.p27}}

{{s5.p28}}
{{s5.p29}}

~~~js
let currentSlide = 0
this.currentPicture = 0
~~~

_________________________________

{{s5.p30}}

{{s5.p31}}
{{s5.p32}}
{{s5.p33}}

~~~js
Math.abs(currentSlide - 1)
~~~

{{s5.p34}}

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

{{s5.p35}}

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

{{s5.p36}}

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

{{s5.p37}}
