# ![ico-35 study] {{s1.h1}}

## ![ico-30 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

### ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

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

{{s3.p3}}

~~~html
&ltbody>
  &ltdiv id="demo">
    &ltsection>Hello&lt/section>
  &lt/div>
&lt/body>
~~~

_______________________

{{s3.p4}}

~~~js
var style = document.createElement('style')
document.head.appendChild(style)
style.textContent = `p { color: red; }`

style.sheet.cssRules[0]          // объект
style.sheet.cssRules[0].cssText  // "p { color: red; }"

style
  .appendChild(document.createTextNode(`div { color: blue; }`))
~~~

{{s3.p5}}

~~~html
&lthead>
  &ltstyle>
    p { color: red; }
    div { color: blue; }
  &lt/style>
&lt/head>
~~~

_______________________________________

{{s3.p6}}

~~~js
var script = document.createElement('script')
script.appendChild(document.createTextNode(`alert('Hello')`))
document.body.appendChild(script)
~~~

_________________________________________

### ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

____________________________

{{s4.p4}}

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

{{s4.p5}}

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

### ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

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

{{s5.p2}}

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

### ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

~~~html
&ltbody>
  &ltmain>
    &ltsection>&lt/section>
    &ltfigure>&lt/figure>
  &lt/main>
&lt/body>
~~~

{{s6.p3}}

~~~js
var section = document.body.querySelector('section')
section.insertAdjacentHTML('beforeBegin', '<p>beforeBegin</p>')
section.insertAdjacentHTML('afterBegin', '<p>afterBegin</p>')
section.insertAdjacentHTML('beforeEnd', '<p>beforeEnd</p>')
section.insertAdjacentHTML('afterEnd', '<p>afterEnd</p>')
~~~

{{s6.p4}}

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

### ![ico-25 icon] {{s7.h1}}

{{s7.p1}}

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

{{s7.p2}}

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

## ![ico-30 icon] {{s8.h1}}

____________________________

### ![ico-25 icon] {{s9.h1}}

{{s9.p1}}

{{s9.p2}}

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

{{s9.p3}}

~~~js
document.body.childNodes
~~~

{{s9.p4}}

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
  ► __proto__: NodeList
~~~

{{s9.p5}}

{{s9.p6}}

~~~js
document.querySelector('[title]').childNodes
~~~

{{s9.p7}}

~~~console
▼ NodeList(5) [text, a.paragraph, text, img#picture.galleryPicture, text]
    0: text
  ► 1: a.paragraph
  ► 2: text
  ► 3: img#picture.galleryPicture
  ► 4: text
    length: 5
  ► __proto__: NodeList
~~~
___________________

{{s9.p8}}

_________________________________

### ![ico-25 icon] {{s10.h1}}

{{s10.p1}}

{{s10.p2}}

~~~js
document.body.children
~~~

{{s10.p3}}

~~~console
▼ HTMLCollection(3) [div.container, h1.header, p.paragraph]
  ► 0: div.container
  ► 1: h1.header
  ► 2: p.paragraph
    length: 3
  ► __proto__: HTMLCollection
~~~

___________________________________

### ![ico-25 icon] {{s11.h1}}

{{s11.p1}}

{{s11.p2}}

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

### ![ico-25 icon] {{s12.h1}}

{{s12.p1}}

{{s12.p2}}

{{s12.p3}}

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

### ![ico-25 icon] {{s13.h1}}

{{s13.p1}}
{{s13.p2}}
{{s13.p3}}
{{s13.p4}}
{{s13.p5}}
{{s13.p6}}

_______________________________________

### ![ico-25 icon] {{s14.h1}}

{{s14.p1}}
{{s14.p2}}
{{s14.p3}}
{{s14.p4}}

{{s14.p5}}

{{s14.p6}}
{{s14.p7}}

{{s14.p8}}

~~~js
document.body.setAttribute('title', 'Hello')

console.info(document.body.getAttribute('title'))
~~~

______________________

{{s14.p9}}

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

{{s14.p10}}

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
  ► __proto__: DOMRect
~~~
___________________________

{{s14.p11}}

~~~js
var btn = document.createElement('button')
btn.innerText = 'OK'
btn.style = `
  background-image: url(https://cdn2.iconfinder.com/data/icons/user-23/512/User_Yuppie_2.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  padding: 5px 10px 5px 30px;
`
document.body.appendChild(btn)
~~~

_________________________________________

## ![ico-30 hw] {{s15.h1}}

◘◘** 1**◘◘
~~~js
var elem = document.body
  .appendChild(document.createElement('p'))

elem.tagName = 'div'
~~~

→→→ {{s15.quiz1}} | {{s15.quizVariants1}} | {{s15.quizAnswer1}}→→→


◘◘** 2**◘◘
~~~js
document.title = 'DOM'
~~~

→→→ {{s15.quiz2}} | {{s15.quizVariants2}} | {{s15.quizAnswer2}}→→→

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

→→→ {{s15.quiz3}} | {{s15.quizVariants3}} | {{s15.quizAnswer3}}→→→


◘◘** 4**◘◘

→→→ {{s15.quiz4}} | {{s15.quizVariants4}} | {{s15.quizAnswer4}}→→→


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

→→→ {{s15.quiz5}} | {{s15.quizVariants5}} | {{s15.quizAnswer5}}→→→

_________________________________

{{s15.p1}}
