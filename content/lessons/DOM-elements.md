# ![ico-35 study] Document Object Model (DOM)

## ![ico-30 icon] {{p1}}

{{p2}}

{{p3}}

{{p4}}

{{p5}}

### ![ico-25 icon] appendChild()

{{p6}}

◘◘![ico-25 cap] ** 1**◘◘

~~~html
&ltbody>
  &ltdiv id="demo">&lt/div>
&lt/body>
~~~

~~~js
var section = document.createElement('section')
section.innerHTML = 'Hello'
document
  .querySelector('#demo')
  .appendChild (section)
~~~

◘◘{{common.c1}}◘◘

~~~html
&ltbody>
  &ltdiv id="demo">
    &ltsection>Hello&lt/section>
  &lt/div>
&lt/body>
~~~

_______________________

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var style = document.createElement('style')
document.head.appendChild(style)
style.textContent = `p { color: red; }`

style.sheet.cssRules[0]          // объект
style.sheet.cssRules[0].cssText  // "p { color: red; }"

style
  .appendChild(document.createTextNode(`div { color: blue; }`))
~~~

◘◘{{common.c1}}◘◘

~~~html
&lthead>
  &ltstyle>
    p { color: red; }
    div { color: blue; }
  &lt/style>
&lt/head>
~~~

_______________________________________

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var script = document.createElement('script')
script.appendChild(document.createTextNode(`alert('Hello')`))
document.body.appendChild(script)
~~~

_________________________________________

### ![ico-25 icon] removeChild()

{{p7}}

{{p8}}

{{p9}}

____________________________

◘◘![ico-25 cap] ** 4**◘◘

~~~html
&ltbody>
  &ltdiv id="demo">
    &ltsection id="section">&lt/section>
    &ltfigure class="figure">&lt/figure>
  &lt/div>
&lt/body>
~~~

~~~js
var section = document.querySelector('#section')
var removed = section.parentNode.removeChild(section)
console.dir(removed)  // ► section#section

var figure = document.querySelector('.figure')
figure.appendChild(removed)
~~~

◘◘{{common.c1}}◘◘

~~~html
&ltbody>
  &ltdiv id="demo">
    &ltfigure class="figure">
      &ltsection id="section">&lt/section>
    &lt/figure>
  &lt/div>
&lt/body>
~~~

_______________________________

### ![ico-25 icon] insertBefore()

◘◘![ico-25 cap] ** 5**◘◘

~~~js
function addElement (tagName, container = document.body) {
  return (container.nodeType === 1 ? container : document.body)
    .appendChild(document.createElement(tagName))
}

var main = addElement('main')
var section = addElement('section', main)
var figure = addElement ('figure', main)

main.insertBefore(document.createElement('p'), section)
~~~

◘◘{{common.c1}}◘◘

~~~html
&ltbody>
  &ltmain>
    &ltp>&lt/p>
    &ltsection>&lt/section>
    &ltfigure>&lt/figure>
  &lt/main>
&lt/body>
~~~

_____________________________________________

### ![ico-25 icon] insertAdjacentHTML()

{{p10}}

◘◘![ico-25 cap] ** 6**◘◘

~~~html
&ltbody>
  &ltmain>
    &ltsection>&lt/section>
    &ltfigure>&lt/figure>
  &lt/main>
&lt/body>
~~~

{{p11}}

~~~js
var section = document.body.querySelector('section')
section.insertAdjacentHTML('beforeBegin', '<p>beforeBegin</p>')
section.insertAdjacentHTML('afterBegin', '<p>afterBegin</p>')
section.insertAdjacentHTML('beforeEnd', '<p>beforeEnd</p>')
section.insertAdjacentHTML('afterEnd', '<p>afterEnd</p>')
~~~

◘◘{{common.c1}}◘◘

~~~html
&ltbody>
  &lt;main>
    &lt;p>beforeBegin&lt;/p>
    &lt;section>
      &lt;p>afterBegin&lt/p>
      &ltp>beforeEnd&lt/p>
    &lt/section>
    &ltp>afterEnd&lt/p>
    &ltfigure>&lt/figure>
  &lt/main>
&lt/body>
~~~

______________________________________________

### ![ico-25 icon] insertAdjacentElement()

◘◘![ico-25 cap] ** 7**◘◘

~~~html
&ltbody>
  &ltmain>
    &ltsection id="demo">&lt/section>
    &ltfigure>&lt/figure>
  &lt/main>
&lt/body>
~~~

~~~js
document.getElementById('demo')
  .insertAdjacentElement('beforeend', document.createElement('p'))

document.querySelector('figure')
  .insertAdjacentElement('afterend', document.createElement('h3'))

document.querySelector('#demo')
  .insertAdjacentElement('beforebegin', document.createElement('img'))

document.getElementsByTagName('figure')[0]
  .insertAdjacentElement('afterbegin', document.createElement('li'))
~~~

◘◘{{common.c1}}◘◘

~~~html
&ltbody>
  &ltmain>
    &ltimg>
    &ltsection id="demo">
      &ltp>&lt/p>
    &lt/section>
    &ltfigure>
      &ltli>&lt/li>
    &lt/figure>
    &lth3>&lt/h3>
  &lt/main>
&lt/body>
~~~

________________________________________

## ![ico-30 icon] {{p12}}

____________________________

### ![ico-25 icon] childNodes

{{p13}}

◘◘![ico-25 cap] ** 8**◘◘

~~~html
&lt;body>
  Hi, students!
  &ltdiv
    class="container"
    title="Container"
  >
    &lta
      class="paragraph"
      href="https://translate.google.com/"
      title="Google translate"
    >
      Google translate
    &lt/a>
    &ltimg
      src="http://www.abc.net.au/news/image/9154542-1x1-940x940.jpg"
      width="200"
      id="picture"
      class="galleryPicture"
    />
  &lt/div>
  &lth1 class="header">Welcome!&lt/h1>
  &ltp class="paragraph">You study JS&lt/p>
&lt/body>
~~~

{{p14}}

~~~js
document.body.childNodes
~~~

~~~console
▼ NodeList(7) [text, div.container, text, h1.header, text, p.paragraph, text]
    0: text
  ► 1: div.container
  ► 2: text
  ► 3: h1.header
  ► 4: text
  ► 5: p.paragraph
  ► 6: text
    length: 7
  ► [[Prototype]]: NodeList
~~~

{{p15}}

{{p16}}

~~~js
document.querySelector('[title]').childNodes
~~~

~~~console
▼ NodeList(5) [text, a.paragraph, text, img#picture.galleryPicture, text]
    0: text
  ► 1: a.paragraph
  ► 2: text
  ► 3: img#picture.galleryPicture
  ► 4: text
    length: 5
  ► [[Prototype]]: NodeList
~~~
___________________

[![ico-20 link] **w3schools**](external/w3-child-nodes)

_________________________________

### ![ico-25 icon] children

{{p17}}

{{p18}}

~~~js
document.body.children
~~~

~~~console
▼ HTMLCollection(3) [div.container, h1.header, p.paragraph]
  ► 0: div.container
  ► 1: h1.header
  ► 2: p.paragraph
    length: 3
  ► [[Prototype]]: HTMLCollection
~~~

___________________________________

### ![ico-25 icon] parentNode

{{p19}}

◘◘![ico-25 cap] ** 9**◘◘

~~~html
&ltbody>
  &ltdiv id="demo">
    &ltsection id="section">&lt/section>
    &ltfigure>&lt/figure>
  &lt/div>
&lt/body>
~~~

~~~js
var section = document.querySelector('#section')
console.dir(section.parentNode)  // ► div#demo
~~~

_____________________________________________

### ![ico-25 icon] {{p20}}

{{p21}}

{{p22}}

◘◘![ico-25 cap] **10**◘◘

~~~js
var section = document.body
  .appendChild(document.createElement('section'))

section.innerHTML = '<h3>Hello</h3>'

for (var prop in section) {
  if (prop.indexOf('on') !== 0) continue
  console.info(`Event: ${prop.slice(2)}`)
}
~~~

_____________________________________

### ![ico-25 icon] Memory leaks

{{p23}}
{{p24}}
{{p25}}
{{p26}}
{{p27}}
{{p28}}

_______________________________________

### ![ico-25 icon] {{p29}}

{{p30}}
{{p31}}
{{p32}}
{{p33}}

{{p34}}

{{p35}}
{{p36}}

◘◘![ico-25 cap] **setAttribute** | **getAttribute**◘◘

~~~js
document.body.setAttribute('title', 'Hello')

console.info(document.body.getAttribute('title'))
~~~

______________________

◘◘![ico-25 cap] **getBoundingClientRect**◘◘

~~~js
var div = document.body
  .appendChild(document.createElement('div'))

div.setAttribute('style', `
  width: 200px;
  height: 200px;
  border: solid 1px blue;
`)

console.info(div.getBoundingClientRect())
~~~

~~~console
▼ DOMRect {x: 8, y: 8, width: 202, height: 202, top: 8, …}
    bottom: 210
    height: 202
    left: 8
    right: 210
    top: 8
    width: 202
    x: 8
    y: 8
  ► [[Prototype]]: DOMRect
~~~
___________________________

◘◘![ico-25 cap] **backgroundImage**◘◘

~~~js
var btn = document.createElement('button')
btn.innerText = 'OK'
btn.style = `
  background-image: url(images/User_Yuppie_2.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  padding: 5px 10px 5px 30px;
`
document.body.appendChild(btn)
~~~

_________________________________________

## ![ico-30 hw] Tests

◘◘** 1**◘◘
~~~js
var elem = document.body
  .appendChild(document.createElement('p'))

elem.tagName = 'div'
~~~

→→→ {{p37}} | {{p38}} | {{p39}}→→→

◘◘** 2**◘◘
~~~js
document.title = 'DOM'
~~~

→→→ {{p40}} | {{p41}} | {{p42}}→→→

◘◘** 3**◘◘
~~~js
var paragraph = [
  'BOM',
  'DOM',
  'HTMLElement',
  'Browser Object Model'
]

for (var text of paragraph) {
  document.body
    .appendChild(document.createElement('p'))
    .innerHTML = text
}
~~~

→→→ {{p43}} | {{p44}} | {{p45}}→→→

◘◘** 4**◘◘

→→→ {{p46}} | {{p47}} | {{p48}}→→→

◘◘** 5**◘◘
~~~js
function showProto (elem) {
  var proto = elem.__proto__
  var result = []
  while (proto) {
    result.push(proto.constructor.name)
    proto = proto.__proto__
  }
  return { [elem.tagName]: result }
}

var elems = ['p', 'img', 'a', 'div', 'input', 'style', 'script']

elems.forEach(function (elem) {
  console.log(showProto(document.createElement(elem)))
})
~~~

→→→ {{p49}} | {{p50}} | {{p51}}→→→

_________________________________

[![ico-20 link] w3schools](external/w3-dom-elements)
