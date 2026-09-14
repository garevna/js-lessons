# ![ico-30 study] Browser Object Model (BOM)


On the client side, we operate within a browser, and the browser runs on the operating system.

^^(Note that we can operate not only within a browser; for example, on the server side, we can run in Node.js.)^^

Let’s consider how the browser presents itself to us.

@@@@

![](images/users-see-pixels-ukr.svg)
When a user opens a page in a browser, they see pixels.<br>These pixels are rendered for them by the browser.<br><br>When a front-end developer creates a page, they see tags. <br>And the browser generates pixels for the user from these tags.<br><br>We, however, see the browser as a **window** object.<br>Because we see everything as objects.

<br>But wait—the browser isn’t an object, it’s a large and complex application! <br><br>So what do we actually see?<br><br>We see the **browser model**, which it creates specifically for us.<br>The **object model**.
![](images/users-see-pixels.svg)

@@@@

_____________________________

## ![ico-25 icon] The **window** object

Many properties of the **window** object are references to other objects, which, in turn, are object models.
Let’s consider, for example, the **document** object.
The **window** object has a property of the same name, containing a reference to the **document** object.
The front-end developer sees it as

~~~html
&lt;html>
  ...
&lt;/html>
~~~

The user will see the page rendered by the browser, i.e. pixels.

Whereas you and I see the object.

@@@@

<br><br>And we have access to this object’s properties and methods via the reference.
![](images/reference-is-a-lockpick.svg)

@@@@

@@@@

![](illustrations/heap-1.jpg)
Any variable declared using ~var~ becomes a property of the **window** object. <br><br>It is vulnerable because it ends up on the **heap**.

@@@@

The heap is called the heap precisely because all apps running in the browser dump their variables there.

^^If a name conflict occurs – that is, if two different apps running in the browser define variables with the same name – the value of that variable will be overwritten and one of the apps is bound to be in for an unpleasant ‘surprise’.^^

Furthermore, the same thing happens with element identifiers. A variable with this name automatically appears in the **window** object.

If you have elements in your markup with the **id** attribute

~~~html
&lt;body>
  <main id="main-page">
    <section id="commodities">
      <figure id="phone"></figure>
    </section>
  </main>
&lt;/body>
~~~

then using the BOM makes it very easy to get a reference to the required element

~~~js
window['main-page']    //  ► &lt;main id="main-page>...&lt;/main>"
window['commodities']  //  ► &lt;section id="commodities">...&lt;/section>
window['phone']        //  ► &lt;figure id="phone">&lt;/figure>
~~~

________________________________________________

**_viewport_** – the part of the browser window where the web page is displayed
^^(excluding the browser’s own toolbars and controls)^^

^^^[Exercise 1]

Declare a function **_~winResize()~_** that outputs the current dimensions to the console ~viewport~

Use the properties of the ~window~ object:
• **~window._innerWidth_~**
• **~window._innerHeight_~**

Resize ~viewport~ and call the function **_~winResize()~_**

^^^

The following objects are among the properties of the **window** object:

![ico-20 green-ok] console
![ico-20 green-ok] navigator
![ico-20 green-ok] screen
![ico-20 green-ok] location
![ico-20 green-ok] history
![ico-20 green-ok] document

^^Let’s check this:^^

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

^^**Result in the console:**^^

~~~console

► console {debug: ƒ, error: ƒ, info: ƒ, log: ƒ, warn: ƒ, …}
► #document
► Location {replace: ƒ, href: "about:blank", ancestorOrigins: DOMStringList, origin: "null", protocol: "about:", …}
► History {length: 2, scrollRestoration: "auto", state: null}
► Screen {availWidth: 1920, availHeight: 1040, width: 1920, height: 1080, colorDepth: 24, …}
► Navigator {vendorSub: "", productSub: "20030107", vendor: "Google Inc.", maxTouchPoints: 0, hardwareConcurrency: 8, …}
~~~


Each of these objects has its own properties and methods

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

The **getCurrentPosition** method has three formal parameters

The first formal parameter (required) is a function that will be called if the operation completes successfully
It will receive an object with the following structure as an argument:

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

The second formal parameter (optional) is also a function that will be called if the geolocation fails

The third (optional) formal parameter is the request options object

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

We have already used the methods of the **~console~** object

![](illustrations/console-methods.png)

^^^[Exercise 2]

^^Run the code in the console:^^
~~~js
console.time('while')

var x = 10000
while (x-- > 0) {}

console.timeEnd('while')

console.time('for')

for (var x = 0; x < 10000; x++) {}

console.timeEnd('for')
~~~

What happened?

^^^

______________________________________

### ![ico-20 icon] screen

![](illustrations/screen-properties.png)
______________________________________

### ![ico-20 icon] location

![](illustrations/location-properties.png)

^^^[Properties of the `location` object]

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

^^^[Exercise 3]

^^Run the code in the console:^^
~~~js
var win = window.open('https://css-tricks.com')
~~~

^^Open the console in a new tab^^
^^Run the code in the console:^^
~~~js
console.clear()
~~~

^^Add the following to the end of the address in the browser’s address bar: #777^^
^^Press _Enter_^^
^^Run the code in the console:^^
~~~js
location.hash
~~~

^^What can you see in the console?^^

^^Return to the original tab^^
^^Run the code in the console:^^
~~~js
win.close()
~~~

What happened?

^^^

^^^[Exercise 4]

^^Run the code in the console:^^
~~~js
var win = window.open()
~~~

^^Open the console in a new tab^^
^^Run the code in the console:^^
~~~js
location.href = 'https://translate.google.com'
~~~

What happened?

^^^
______________________________________

### ![ico-20 icon] history

Let’s look at the object **~history~** in the console:

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

![ico-20 green-ok] The property **history._state_** (string) contains the address of the current page

![ico-20 green-ok] The **history._length_** property (integer) contains the number of navigation steps in the current page’s history ^^(one more than the maximum possible value for the **_go()_** method)^^

![ico-20 green-ok] The **history._back()_** and **history._forward()_** methods can be used to navigate backwards and forwards through the history

![ico-20 green-ok] Using the **history._go()_** method (^^if the method’s argument is an integer^^), you can navigate a specified number of pages forwards (^^a positive argument value^^) or backwards (^^a negative argument value^^)

~~~js
window.history.go(-2)
~~~

^^HTML5 introduced the **history._pushState()_** and **history._replaceState()_** methods, which allow you to add and modify history entries^^
[MDN](external/mdi-history-api)

Note that the **~history.&#95;&#95;proto&#95;&#95;~** property is a link to **~History()~**, and the **~history.&#95;&#95;proto&#95;&#95;.&#95;&#95;proto&#95;&#95;~** property is a link to **~Object~**

___________________________________________

### ![ico-20 icon] document

^^^[Exercise 5]

^^Run the code in the console:^^

~~~js
var newWin = window.open()
newWin.document.write('<h1>Я  - программист</h1>')
newWin.document.write('<script>document.write(\'<h3>Hello!</h3>\')</script>')
console.log(newWin.document.body)
~~~

What happened?

^^^

^^^[Exercise 6]

^^Run the code in the console:^^

~~~js
var newWin = window.open()
newWin.document.write('<h1>Я  - программист</h1>')
newWin.document.write('<script>document.write(\'<h3>Hello!</h3>\')</script>')
console.log(newWin.document.body)
newWin.close()
~~~

What happened?

^^^

^^^[Exercise 7]

^^Run the code in the console:^^

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

What happened?

^^^

_________________________________________________________

[![ico-30 hw] Exercises](test/bom)
