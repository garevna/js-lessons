# ![ico-70 webpack] Именованный экспорт

________________________________

## ![ico-25 hw] Упражнение 7

Создадим новый файл ![ico-20 file] **_~PictureSlider.js~_**
в папке ![ico-20 folder] **~js~**

^^Обратите внимание, что в этом файле мы используем **_именованный экспорт_**^^
^^(два объекта экспортируются из одного файла)^^

![ico-20 green-ok] export class PictureSlider
![ico-20 green-ok] export const Slide

В файле ![ico-20 file] **_~PictureSlider.js~_** определим веб-компонент,
который получает массив входных параметров (ссылки на изображения)
через атрибут **~src~**

◘◘![ico-20 file] PictureSlider.js◘◘

~~~js
class PictureSlider extends HTMLElement {
  constructor () {
    super()

    Object.assign(this, {
      pictures: [],
      container: this.createElem('figure'),
      currentIndex: 0,
      currentSlide: 0
    })

    Object.assign(this, {
      btnLeft: Object.assign(this.createElem('button', this.container), {
        id: 'left',
        innerHTML: '<',
        onclick: () => this.changePicture('left')
      }),
      btnRight: Object.assign(this.createElem('button', this.container), {
        id: 'right',
        innerHTML: '>',
        onclick: () => this.changePicture('right')
      })
    })

    this.getData()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.appendChild(this.container)

    const style = Object.assign(document.createElement('style'), {
      textContent: this.styles
    })

    shadow.appendChild(style)
  }

  createElem (tagName, container) {
    return (!container ? document.body : container)
      .appendChild(document.createElement(tagName))
  }

  async getData () {
    this.pictures = await new Promise(function (resolve) {
      setTimeout(() => resolve(this.src), 100)
    }.bind(this))

    this.slides = [
      new Slide(this.pictures[0], this.container),
      new Slide(this.pictures[1], this.container)
    ]

    this.slides[0].mcFromTo(100, 10)
    this.slides[1].init(100)
  }
  
  changePicture (direction) {
    const to = direction === 'left' ? 100 : -100

    const [nextSlide, nextIndex] = [
      this.currentSlide === 0 ? 1 : 0,
      this.getNextIndex(direction)
    ]

    this.slides[nextSlide]
      .setPicture(this.pictures[nextIndex])
      .init(-to)
      .mcFromTo(-to, 10, 1)

    this.slides[this.currentSlide]
      .mcFromTo(10, to, 0)

    setTimeout(function () {
      this.currentSlide = nextSlide
      this.currentIndex = nextIndex
    }, 1000)
  }

  getNextIndex (dir) {
    return dir === 'left'
      ? this.currentIndex === 0
        ? this.pictures.length - 1
        : this.currentIndex - 1
      : this.currentIndex === this.pictures.length - 1
        ? 0
        : this.currentIndex + 1
    }
}

const Slide = function (imageURL, container) {
  this.imageURL = imageURL
  const elem = container.appendChild(document.createElement('div'))
  elem.style = `
    background-image: url(${imageURL});
  `
  this.init = function (left) {
    Object.assign(elem.style, {
      left: left + '%',
      width: container.style.width * 0.8
    })
    return this
  }
  
  this.setPicture = pictureURL => {
    elem.style.backgroundImage = `url(${pictureURL})`
    return this
  }

  this.mcFromTo = function (from, to, finalOpacity) {
    Object.assign(elem.style, {
      transition: 'none',
      left: from + '%',
      width: container.offsetWidth * 0.8 + 'px',
      opacity: 1 - finalOpacity
    })

    setTimeout(() => Object.assign(elem.style, {
      transition: 'all 0.8s',
      left: to + '%',
      opacity: finalOpacity
    }), 50)

    return this
  }
}

Object.assign(PictureSlider.prototype, {
  styles: `
      figure {
        position: fixed;
        top: 10%;
        left: -10%;
        bottom: 10%;
        right: -10%;
        overflow: hidden;
      }
      button {
        position: absolute;
        top: 50%;
        font-size: 30px;
        z-index: 100;
        background: transparent;
        border: 0;
        color: white;
        text-shadow: 3px 3px 5px #00000090;
        outline: none;
        font-family: monospace;
      }
      button:hover {
        font-size: 32px;
        text-shadow: 2px 2px 4px #000000b0;
      }
      #left { left: 10%; }
      #right { right: 10%; }
      div {
        position: absolute;
        top: 10%;
        bottom: 10%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        transition: all 0.8s;
      }
    `
})
~~~

Импортируем ~Slide~ и ~PictureSlider~ в файл **script.js** из файла **PictureSlider.js**

◘◘![ico-20 file] script.js◘◘

~~~js
'use strict'

import promise from './promise.js'
import { Slide, PictureSlider } from './PictureSlider.js';
import css from '../css/main.css';

promise
  .then(response => Object.assign(document.querySelector('.sampleClass'), { innerText: innerText + response}))

['git-bush','git']
  .forEach(item => document.body.appendChild(document.createElement('span')).className = item)

customElements.define('picture-slider', PictureSlider)

const slider = document.body.appendChild(document.createElement('picture-slider'))

slider.src = [
  'https://www.sunhome.ru/i/cards/113/otkritki-valentine-s-day-kartinki.orig.jpg',
  'http://img.over-blog-kiwi.com/0/98/03/83/20160127/ob_d8f5c9_12163786387fxcdr3.jpg',
  'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
  'http://papers.co/wallpaper/papers.co-nx17-sunset-river-lake-beautiful-nature-28-wallpaper.jpg'
]
~~~
