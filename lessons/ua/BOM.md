# ![ico-30 study] Browser Object Model (BOM)⟪Browser_Object_Model_(BOM)⟫

На стороні клієнта ми працюємо в браузері, а браузер працює в операційній системі.

^^(Зауважимо, що ми можемо працювати не лише в браузері; наприклад, на стороні сервера ми можемо працювати в Node.js.)^^

Давайте поміркуємо, як браузер представляє себе нам.

@@@@

![](slogans/users-see-pixels.svg)
Коли користувач відкриває сторінку в браузері, він бачить пікселі.<br>Ці пікселі для нього рендерить браузер.<br><br>Коли верстальник створює сторінку, він бачить теги. <br>А браузер із цих тегів генерує пікселі для користувача.<br><br>Ми ж бачимо браузер як об’єкт **window**.<br>Тому що ми все бачимо як об’єкти.

<br>Але ж браузер — не об’єкт, а великий і складний додаток! <br><br>То що ж ми бачимо?<br><br>Ми бачимо **модель браузера**, яку він створює спеціально для нас.<br>**Об’єктну модель**.
![](slogans/adam-of-all.svg)

@@@@

_____________________________

## ![ico-25 icon] Об’єкт window⟪The_**window**_object⟫

Багато властивостей об’єкта **window** є посиланнями на інші об’єкти, які, у свою чергу, є об’єктними моделями.
Розглянемо, наприклад, об’єкт **document**.
В об’єкті **window** є однойменна властивість, що містить посилання на об’єкт **document**.
Верстальник бачить його як

~~~html
&lt;html>
  ...
&lt;/html>
~~~

Користувач побачить відрендерену браузером сторінку, тобто пікселі.

А ми з вами бачимо об’єкт.

@@@@

<br><br>І ми маємо доступ до властивостей та методів цього об’єкта за посиланням.
![](slogans/reference-is-a-lockpick.svg)

@@@@

@@@@

![](illustrations/heap-1.jpg)
Будь-яка змінна, оголошена за допомогою ~var~, стає властивістю об’єкта **window**. <br><br>Вона вразлива, тому що опинилася в «купі» (**heap**).

@@@@

Купа є купою саме тому, що всі додатки, запущені в браузері, скидають туди свої змінні.

^^Якщо виникне конфлікт імен, тобто два різні додатки, запущені в браузері, визначать змінні з однаковою назвою, то значення цієї змінної буде перевизначено, і один із додатків точно отримає неприємний «сюрприз».^^

Крім того, аналогічна ситуація трапляється з ідентифікаторами елементів. В об’єкті **window** автоматично з’являється змінна з такою назвою.

Якщо у вашій розмітці є елементи з атрибутом **id**

~~~html
&lt;body>
  <main id="main-page">
    <section id="commodities">
      <figure id="phone"></figure>
    </section>
  </main>
&lt;/body>
~~~

то за допомогою BOM отримати посилання на потрібний елемент дуже просто

~~~js
window['main-page']    //  ► &lt;main id="main-page>...&lt;/main>"
window['commodities']  //  ► &lt;section id="commodities">...&lt;/section>
window['phone']        //  ► &lt;figure id="phone">&lt;/figure>
~~~

________________________________________________

**_viewport_** — частина вікна браузера, де відображається веб-сторінка
^^( без панелей та елементів керування самого браузера )^^

^^^[Вправа 1]

Оголосіть функцію **_~winResize()~_**, яка виводить у консоль поточні розміри ~viewport~

Використовуйте властивості об’єкта ~window~:
• **~window._innerWidth_~**
• **~window._innerHeight_~**

Змінюйте розмір ~viewport~ і викликайте функцію **_~winResize()~_**

^^^

До числа властивостей об’єкта  **window** належать такі об’єкти:

![ico-20 green-ok] console
![ico-20 green-ok] navigator
![ico-20 green-ok] screen
![ico-20 green-ok] location
![ico-20 green-ok] history
![ico-20 green-ok] document

^^Перевіримо це:^^

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

Кожен із цих об’єктів має свої властивості та методи

_____________________________________

### ![ico-20 icon] navigator⟪navigator⟫

#### navigator.geolocation⟪navigator.geolocation⟫

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

Метод **getCurrentPosition** має три формальні параметри

Перший формальний параметр (обов’язковий) — це функція, яка буде викликана у разі успішного завершення операції
Вона отримає як аргумент об’єкт такої структури:

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

Другий формальний параметр (опціональний) — теж функція, яка буде викликана у разі невдалого завершення геолокації

Третій (опціональний) формальний параметр — це об’єкт опцій запиту

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

### ![ico-20 icon] console⟪console⟫

Ми вже користувалися методами об’єкта  **~console~**

![](illustrations/console-methods.png)

^^^[Вправа 2]

^^Виконайте код у консолі:^^
~~~js
console.time('while')

var x = 10000
while (x-- > 0) {}

console.timeEnd('while')

console.time('for')

for (var x = 0; x < 10000; x++) {}

console.timeEnd('for')
~~~

Що сталося?

^^^

______________________________________

### ![ico-20 icon] screen⟪screen⟫

![](illustrations/screen-properties.png)
______________________________________

### ![ico-20 icon] location⟪location⟫

![](illustrations/location-properties.png)

^^^[Властивості об’єкта location]

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

^^^[Вправа 3]

^^Виконайте код у консолі:^^
~~~js
var win = window.open('https://css-tricks.com')
~~~

^^Відкрийте консоль у новій вкладці^^
^^Виконайте код у консолі:^^
~~~js
console.clear()
~~~

^^Додайте в кінець адреси в адресному рядку браузера: #777^^
^^Натисніть _Enter_^^
^^Виконайте код у консолі:^^
~~~js
location.hash
~~~

^^Що ви бачите в консолі?^^

^^Поверніться до початкової вкладки^^
^^Виконайте код у консолі:^^
~~~js
win.close()
~~~

Що сталося?

^^^

^^^[Вправа 4]

^^Виконайте код у консолі:^^
~~~js
var win = window.open()
~~~

^^Відкрийте консоль у новій вкладці^^
^^Виконайте код у консолі:^^
~~~js
location.href = 'https://translate.google.com'
~~~

Що сталося?

^^^
______________________________________

### ![ico-20 icon] history⟪history⟫

Подивимося на об’єкт **~history~** у консолі:

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

![ico-20 green-ok] Властивість **history._state_** (рядок) містить адресу поточної сторінки

![ico-20 green-ok] Властивість **history._length_** (ціле число) містить кількість переходів в історії поточної сторінки ^^(на одиницю більше, ніж максимально можливе значення для методу **_go()_**)^^

![ico-20 green-ok] За допомогою методів **history._back()_** та **history._forward()_** можна керувати переходами назад / вперед по історії

![ico-20 green-ok] За допомогою методу **history._go()_** (^^якщо аргумент методу — ціле число^^) можна перейти на задану кількість сторінок вперед (^^додатне значення аргументу^^) або назад (^^від’ємне значення аргументу^^)

~~~js
window.history.go(-2)
~~~

^^У HTML5 були введені методи **history._pushState()_** та **history._replaceState()_**, які дозволяють додавати та змінювати записи історії^^
[MDN](external/mdi-history-api)

Зверніть увагу, що властивість **~history.&#95;&#95;proto&#95;&#95;~** є посиланням на **~History()~**, а властивість **~history.&#95;&#95;proto&#95;&#95;.&#95;&#95;proto&#95;&#95;~** є посиланням на **~Object~**

___________________________________________

### ![ico-20 icon] document⟪document⟫

^^^[Вправа 5]

^^Виконайте код у консолі:^^

~~~js
var newWin = window.open()
newWin.document.write('<h1>Я  - программист</h1>')
newWin.document.write('<script>document.write(\'<h3>Hello!</h3>\')</script>')
console.log(newWin.document.body)
~~~

Що сталося?

^^^

^^^[Вправа 6]

^^Виконайте код у консолі:^^

~~~js
var newWin = window.open()
newWin.document.write('<h1>Я  - программист</h1>')
newWin.document.write('<script>document.write(\'<h3>Hello!</h3>\')</script>')
console.log(newWin.document.body)
newWin.close()
~~~

Що сталося?

^^^

^^^[Вправа 7]

^^Виконайте код у консолі:^^

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

Що сталося?

^^^

_________________________________________________________

※※※exercises test/bom※※※
