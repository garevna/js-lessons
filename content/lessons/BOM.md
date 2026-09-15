# ![ico-30 study] Browser Object Model (BOM)


{{s0.p1}}

{{s0.p2}}

{{s0.p3}}

@@@@

![](images/users-see-pixels-ukr.svg)
{{s0.p4}}

{{s0.p5}}
![](images/users-see-pixels.svg)

@@@@

_____________________________

## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}
{{s1.p4}}

~~~html
&lt;html>
  ...
&lt;/html>
~~~

{{s1.p5}}

{{s1.p6}}

@@@@

{{s1.p7}}
![](images/reference-is-a-lockpick.svg)

@@@@

@@@@

![](illustrations/heap-1.jpg)
{{s1.p8}}

@@@@

{{s1.p9}}

{{s1.p10}}

{{s1.p11}}

{{s1.p12}}

~~~html
&lt;body>
  <main id="main-page">
    <section id="commodities">
      <figure id="phone"></figure>
    </section>
  </main>
&lt;/body>
~~~

{{s1.p13}}

~~~js
window['main-page']    //  ► &lt;main id="main-page>...&lt;/main>"
window['commodities']  //  ► &lt;section id="commodities">...&lt;/section>
window['phone']        //  ► &lt;figure id="phone">&lt;/figure>
~~~

________________________________________________

{{s1.p14}}
{{s1.p15}}

^^^[{{common.c3}} 1]

{{s1.p16}}

{{s1.p17}}
• **~window._innerWidth_~**
• **~window._innerHeight_~**

{{s1.p18}}

^^^

{{s1.p19}}

![ico-20 green-ok] console
![ico-20 green-ok] navigator
![ico-20 green-ok] screen
![ico-20 green-ok] location
![ico-20 green-ok] history
![ico-20 green-ok] document

{{s1.p20}}

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

^^**{{common.c2}}**^^

~~~console

► console {debug: ƒ, error: ƒ, info: ƒ, log: ƒ, warn: ƒ, …}
► #document
► Location {replace: ƒ, href: "about:blank", ancestorOrigins: DOMStringList, origin: "null", protocol: "about:", …}
► History {length: 2, scrollRestoration: "auto", state: null}
► Screen {availWidth: 1920, availHeight: 1040, width: 1920, height: 1080, colorDepth: 24, …}
► Navigator {vendorSub: "", productSub: "20030107", vendor: "Google Inc.", maxTouchPoints: 0, hardwareConcurrency: 8, …}
~~~


{{s1.p22}}

_____________________________________

### ![ico-20 icon] navigator

#### navigator.geolocation

◘◘geolocation◘◘

~~~console
▼ Geolocation {}
  ▼ __proto__: Geolocation
      ► clearWatch: ƒ clearWatch()
      ► getCurrentPosition: ƒ getCurrentPosition()
      ► watchPosition: ƒ watchPosition()
      ► constructor: ƒ Geolocation()
        Symbol(Symbol.toStringTag): "Geolocation"
      ► __proto__: Object
~~~

{{s1.p23}}

{{s1.p24}}
{{s1.p25}}

◘◘Position◘◘

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
      ► __proto__: Coordinates
    timestamp: 1564355238231
  ► __proto__: Position
~~~

{{s1.p26}}

{{s1.p27}}

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

{{s1.p28}}

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

^^^[{{s1.spoiler3}}]

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

{{s1.p32}}
^^{{topic.t1}}^^
~~~js
console.clear()
~~~

{{s1.p34}}
{{s1.p35}}
^^{{topic.t1}}^^
~~~js
location.hash
~~~

{{s1.p37}}

{{s1.p38}}
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

{{s1.p42}}
^^{{topic.t1}}^^
~~~js
location.href = 'https://translate.google.com'
~~~

{{s1.p44}}

^^^
______________________________________

### ![ico-20 icon] history

{{s1.p45}}

~~~~console
▼ history: History
      length: 2
      scrollRestoration: "auto"
      state: null
    ▼__proto__: History
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
        ► __proto__: Object
~~~~

{{s1.p46}}

{{s1.p47}}

{{s1.p48}}

{{s1.p49}}

~~~js
window.history.go(-2)
~~~

{{s1.p50}}
[MDN](external/mdi-history-api)

{{s1.p51}}

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

{{s1.p57}}

^^^

_________________________________________________________

{{s1.p58}}
