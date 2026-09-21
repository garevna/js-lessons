## ![ico-25 icon] {{p1}}

{{p2}}
{{p3}}
{{p4}}
{{p5}}
{{p6}}
{{p7}}
{{p8}}
{{p9}}
{{p10}}

### ![ico-20 icon] offsetHeight

{{{offset-height.js}}}

### ![ico-20 icon] offsetWidth

{{{offset-left.js}}}

_____________________________________

{{p18}}

_____________________________________

### ![ico-30 hw] {{common.c3}}

{{p19}}

~~~~js
const section = document.body

section.style = `
  background: #000;
  margin: 0;
  padding: 0;
  overflow: hidden;
`

let rect = null
let aside = section
  .appendChild(document.createElement('aside'))

aside.style = `
  position: absolute;
  left: 16px;
  bottom: 16px;
  height: max-content;
  width: max-content;
  font-family: monospace, sans-serif, Arial;
  font-size: 18px;
  color: #abc;
`

const figure = document.body
  .appendChild(document.createElement('figure'))

figure.style = `
  position: absolute;
  top: 48px;
  left: 48px;
  bottom: 48px;
  right: 48px;
  transition: all 0.5s ease;
  background: #ffffff50;
  border: solid 1px #fff;
  z-index: 1;
`

function addRect (figure) {
  rect = section
    .appendChild(document.createElement('div'))
    
  rect.style = `
    position: absolute;
    top: ${figure.offsetTop}px;
    left: ${figure.offsetLeft}px;
    width: ${figure.offsetWidth}px;
    height: ${figure.offsetHeight}px;
    border: dotted 1px #789;
    z-index: 0;
  `
  return rect
}

const metrics = [
  'offsetTop',
  'offsetLeft',
  'offsetHeight',
  'offsetWidth',
  'scrollHeight',
  'scrollWidth'
]

function getRandom (val) {
  return Math.max(section.offsetHeight / 16, Math.round(Math.random() * val))
}
const changeSize = () => {
  figure.style.top = figure.style.bottom = getRandom(section.offsetHeight / 3) + 'px'
  figure.style.left = getRandom(section.offsetWidth / 3) + 100 + 'px'
  figure.style.right = getRandom(section.offsetWidth / 3) + 'px'
}
function getHTML (metric) {
  return aside.innerHTML += `<p>${metric}: ${figure[metric]}</p>`
}

const movie = () => requestAnimationFrame(function () {
  changeSize ()
  aside.innerHTML = ''
  rect ? rect.remove() : null
  rect = addRect(figure)
  requestAnimationFrame(() => metrics.forEach(getHTML))
})

section.onclick = movie
~~~~

{{{scroll-1.js}}}

__________________________________________________

## ![ico-20 icon] getBoundingClientRect()

{{p20}}

{{p21}}

{{p22}}

{{p23}}
{{p24}}

~~~js
document.querySelector('p')
  .getBoundingClientRect()
~~~

~~~console
▼ DOMRect {x: 166.5, y: -2905, width: 520, height: 100, top: -2905, …}
    bottom: -2805
    height: 100
    left: 166.5
    right: 686.5
    top: -2905
    width: 520
    x: 166.5
    y: -2905
  ► [[Prototype]]: DOMRect
~~~

{{p25}}
