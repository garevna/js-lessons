# ![ico-30 study] {{s1.h1}}


{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

![](images/users-see-pixels-ukr.svg)
{{s1.p5}}

{{s1.p6}}
![](images/users-see-pixels.svg)

{{s1.p7}}

_____________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}
{{s2.p4}}

~~~html
&lt;html>
  ...
&lt;/html>
~~~

{{s2.p5}}

{{s2.p6}}

{{s2.p7}}

{{s2.p8}}
![](images/reference-is-a-lockpick.svg)

{{s2.p9}}

{{s2.p10}}

![](illustrations/heap-1.jpg)
{{s2.p11}}

{{s2.p12}}

{{s2.p13}}

{{s2.p14}}

{{s2.p15}}

{{s2.p16}}

~~~html
&lt;body>
  <main id="main-page">
    <section id="commodities">
      <figure id="phone"></figure>
    </section>
  </main>
&lt;/body>
~~~

{{s2.p17}}

~~~js
window['main-page']    //  ► &lt;main id="main-page>...&lt;/main>"
window['commodities']  //  ► &lt;section id="commodities">...&lt;/section>
window['phone']        //  ► &lt;figure id="phone">&lt;/figure>
~~~

________________________________________________

{{s2.p18}}
{{s2.p19}}

{{s2.p20}}

{{s2.p21}}

{{s2.p22}}
{{s2.p23}}
{{s2.p24}}

{{s2.p25}}

{{s2.p26}}

{{s2.p27}}

{{s2.p28}}
{{s2.p29}}
{{s2.p30}}
{{s2.p31}}
{{s2.p32}}
{{s2.p33}}

{{s2.p34}}

{{s2.p35}}

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

{{s2.p36}}

~~~console

► console {debug: ƒ, error: ƒ, info: ƒ, log: ƒ, warn: ƒ, …}
► #document
► Location {replace: ƒ, href: "about:blank", ancestorOrigins: DOMStringList, origin: "null", protocol: "about:", …}
► History {length: 2, scrollRestoration: "auto", state: null}
► Screen {availWidth: 1920, availHeight: 1040, width: 1920, height: 1080, colorDepth: 24, …}
► Navigator {vendorSub: "", productSub: "20030107", vendor: "Google Inc.", maxTouchPoints: 0, hardwareConcurrency: 8, …}
~~~


{{s2.p37}}

_____________________________________

### ![ico-20 icon] {{s3.h1}}

#### {{s4.h1}}

{{s4.p1}}

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

{{s4.p2}}

{{s4.p3}}
{{s4.p4}}

{{s4.p5}}

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

{{s4.p6}}

{{s4.p7}}

{{s4.p8}}

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

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

![](illustrations/console-methods.png)

{{s5.p2}}

{{s5.p3}}
~~~js
console.time('while')

var x = 10000
while (x-- > 0) {}

console.timeEnd('while')

console.time('for')

for (var x = 0; x < 10000; x++) {}

console.timeEnd('for')
~~~

{{s5.p4}}

{{s5.p5}}

______________________________________

### ![ico-20 icon] {{s6.h1}}

![](illustrations/screen-properties.png)
______________________________________

### ![ico-20 icon] {{s7.h1}}

![](illustrations/location-properties.png)

{{s7.p1}}

{{s7.p2}}
{{s7.p3}}
{{s7.p4}}
{{s7.p5}}
{{s7.p6}}
{{s7.p7}}
{{s7.p8}}
{{s7.p9}}
{{s7.p10}}

{{s7.p11}}

{{s7.p12}}

{{s7.p13}}
~~~js
var win = window.open('https://css-tricks.com')
~~~

{{s7.p14}}
{{s7.p15}}
~~~js
console.clear()
~~~

{{s7.p16}}
{{s7.p17}}
{{s7.p18}}
~~~js
location.hash
~~~

{{s7.p19}}

{{s7.p20}}
{{s7.p21}}
~~~js
win.close()
~~~

{{s7.p22}}

{{s7.p23}}

{{s7.p24}}

{{s7.p25}}
~~~js
var win = window.open()
~~~

{{s7.p26}}
{{s7.p27}}
~~~js
location.href = 'https://translate.google.com'
~~~

{{s7.p28}}

{{s7.p29}}
______________________________________

### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}

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

{{s8.p2}}

{{s8.p3}}

{{s8.p4}}

{{s8.p5}}

~~~js
window.history.go(-2)
~~~

{{s8.p6}}
{{s8.p7}}

{{s8.p8}}

___________________________________________

### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}

{{s9.p2}}

~~~js
var newWin = window.open()
newWin.document.write('<h1>Я  - программист</h1>')
newWin.document.write('<script>document.write(\'<h3>Hello!</h3>\')</script>')
console.log(newWin.document.body)
~~~

{{s9.p3}}

{{s9.p4}}

{{s9.p5}}

{{s9.p6}}

~~~js
var newWin = window.open()
newWin.document.write('<h1>Я  - программист</h1>')
newWin.document.write('<script>document.write(\'<h3>Hello!</h3>\')</script>')
console.log(newWin.document.body)
newWin.close()
~~~

{{s9.p7}}

{{s9.p8}}

{{s9.p9}}

{{s9.p10}}

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

{{s9.p11}}

{{s9.p12}}

_________________________________________________________

{{s9.p13}}
