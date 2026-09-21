# ![ico-30 study] Browser Object Model (BOM)

{{p1}}

{{p2}}

{{p3}}

@@@@

![](slogans/users-see-pixels.svg)
{{p4}}

{{p5}}
![](slogans/adam-of-all.svg)

@@@@

_____________________________

## ![ico-25 icon] {{p6}}

{{p7}}
{{p8}}
{{p9}}
{{p10}}

~~~html
&lt;html>
  ...
&lt;/html>
~~~

{{p11}}

{{p12}}

@@@@

{{p13}}
![](slogans/reference-is-a-lockpick.svg)

@@@@

@@@@

![](illustrations/heap-1.jpg)
{{p14}}

@@@@

{{p15}}

{{p16}}

{{p17}}

{{p18}}

~~~html
&lt;body>
  <main id="main-page">
    <section id="commodities">
      <figure id="phone"></figure>
    </section>
  </main>
&lt;/body>
~~~

{{p19}}

~~~js
window['main-page']    //  ► &lt;main id="main-page>...&lt;/main>"
window['commodities']  //  ► &lt;section id="commodities">...&lt;/section>
window['phone']        //  ► &lt;figure id="phone">&lt;/figure>
~~~

________________________________________________

{{p20}}
{{p21}}

^^^[{{common.c3}} 1]

{{p22}}

{{p23}}
• **~window._innerWidth_~**
• **~window._innerHeight_~**

{{p24}}

^^^

{{p25}}

![ico-20 green-ok] console
![ico-20 green-ok] navigator
![ico-20 green-ok] screen
![ico-20 green-ok] location
![ico-20 green-ok] history
![ico-20 green-ok] document

{{p26}}

◘◘![ico-20 cap] ** 1**◘◘

~~~js
var props = [
  'console',
  'document',
  'location',
  'history',
  'screen',
  'navigator'
]

for (var prop of props) console.log(window[prop])
~~~

~~~console

► console {debug: ƒ, error: ƒ, info: ƒ, log: ƒ, warn: ƒ, …}
► #document
► Location {replace: ƒ, href: "about:blank", ancestorOrigins: DOMStringList, origin: "null", protocol: "about:", …}
► History {length: 2, scrollRestoration: "auto", state: null}
► Screen {availWidth: 1920, availHeight: 1040, width: 1920, height: 1080, colorDepth: 24, …}
► Navigator {vendorSub: "", productSub: "20030107", vendor: "Google Inc.", maxTouchPoints: 0, hardwareConcurrency: 8, …}
~~~

{{p27}}

_____________________________________

### ![ico-20 icon] navigator

#### navigator.geolocation

~~~console
▼ Geolocation {}
  ▼ [[Prototype]]: Geolocation
      ► clearWatch: ƒ clearWatch()
      ► getCurrentPosition: ƒ getCurrentPosition()
      ► watchPosition: ƒ watchPosition()
      ► constructor: ƒ Geolocation()
        Symbol(Symbol.toStringTag): "Geolocation"
      ► [[Prototype]]: Object
~~~

{{p28}}

{{p29}}
{{p30}}

~~~console
▼ Position {coords: Coordinates, timestamp: 1564355238231}
  ▼ coords: Coordinates
        accuracy: 30
        altitude: null
        altitudeAccuracy: null
        heading: null
        latitude: 50.0159007
        longitude: 36.2216816
        speed: null
      ► [[Prototype]]: Coordinates
    timestamp: 1564355238231
  ► [[Prototype]]: Position
~~~

{{p31}}

{{p32}}

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const status = document.body
  .appendChild(document.createElement('p'))

if (!navigator.geolocation) {
  status.textContent = 'Geolocation is not supported by your browser'
} else {
  status.textContent = 'Locating…'

  navigator.geolocation.getCurrentPosition(position => {
    const coord = [position.coords.latitude, position.coords.longitude]
    status.textContent = `https://www.openstreetmap.org/#map=40/${coord[0]}/${coord[1]}`
    window.open(`https://www.openstreetmap.org/#map=40/${coord[0]}/${coord[1]}`, '_blank')
  }, () => status.textContent = 'Unable to retrieve your location')
}
~~~

{{{BOM-geolocation.js}}}

_____________________________________

### ![ico-20 icon] console

{{p33}}

![](illustrations/console-methods.png)

^^^[{{common.c3}} 2]

^^{{topic.t1}}^^
~~~js
console.time('while')

var x = 10000
while (x-- > 0) {}

console.timeEnd('while')

console.time('for')

for (var x = 0; x < 10000; x++) {}

console.timeEnd('for')
~~~

{{topic.t5}}

^^^

______________________________________

### ![ico-20 icon] screen

![](illustrations/screen-properties.png)
______________________________________

### ![ico-20 icon] location

![](illustrations/location-properties.png)

^^^[{{p34}}]

![ico-20 green-ok] hash
![ico-20 green-ok] host
![ico-20 green-ok] hostname
![ico-20 green-ok] href
![ico-20 green-ok] origin
![ico-20 green-ok] pathname
![ico-20 green-ok] port
![ico-20 green-ok] protocol
![ico-20 green-ok] search

^^^

^^^[{{common.c3}} 3]

^^{{topic.t1}}^^
~~~js
var win = window.open('https://css-tricks.com')
~~~

{{p35}}
^^{{topic.t1}}^^
~~~js
console.clear()
~~~

{{p36}}
{{p37}}
^^{{topic.t1}}^^
~~~js
location.hash
~~~

{{p38}}

{{p39}}
^^{{topic.t1}}^^
~~~js
win.close()
~~~

{{topic.t5}}

^^^

^^^[{{common.c3}} 4]

^^{{topic.t1}}^^
~~~js
var win = window.open()
~~~

{{p40}}
^^{{topic.t1}}^^
~~~js
location.href = 'https://translate.google.com'
~~~

{{p41}}

^^^
______________________________________

### ![ico-20 icon] history

{{p42}}

~~~~console
▼ history: History
      length: 2
      scrollRestoration: "auto"
      state: null
    ▼[[Prototype]]: History
        ► back: ƒ back()
        ► forward: ƒ forward()
        ► go: ƒ go()
          length: (...)
        ► pushState: ƒ pushState()
        ► replaceState: ƒ replaceState()
          scrollRestoration: (...)
          state: (...)
        ► constructor: ƒ History()
          Symbol(Symbol.toStringTag): "History"
        ► get length: ƒ ()
        ► get scrollRestoration: ƒ ()
        ► set scrollRestoration: ƒ ()
        ► get state: ƒ ()
        ► [[Prototype]]: Object
~~~~

{{p43}}

{{p44}}

{{p45}}

{{p46}}

~~~js
window.history.go(-2)
~~~

{{p47}}
[MDN](external/mdi-history-api)

{{p48}}

___________________________________________

### ![ico-20 icon] document

^^^[{{common.c3}} 5]

^^{{topic.t1}}^^

~~~js
var newWin = window.open()
newWin.document.write('<h1>Я  - программист</h1>')
newWin.document.write('<script>document.write(\'<h3>Hello!</h3>\')</script>')
console.log(newWin.document.body)
~~~

{{topic.t5}}

^^^

^^^[{{common.c3}} 6]

^^{{topic.t1}}^^

~~~js
var newWin = window.open()
newWin.document.write('<h1>Я  - программист</h1>')
newWin.document.write('<script>document.write(\'<h3>Hello!</h3>\')</script>')
console.log(newWin.document.body)
newWin.close()
~~~

{{topic.t5}}

^^^

^^^[{{common.c3}} 7]

^^{{topic.t1}}^^

~~~js
var html = `
  <style>
    h3 {
      font-family: Arial;
      color: #f50;
    }
  </style>
  <script>
    document.write('<h3>Hello!</h3>')
  </script>
`

var newWin = window.open('https://www.w3schools.com/')
newWin.document.write(html)
~~~

{{p49}}

^^^

_________________________________________________________

※※※exercises ⟦f10⟧※※※
