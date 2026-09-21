# ![ico-30 study] Browser Object Model⟪Browser_Object_Model⟫

## ![ico-25 icon] window.postMessage()⟪window.postMessage⟫

^^![ico-20 warn] Щоб зрозуміти цей розділ, потрібно ознайомитися з подієвою моделлю браузера^^
___________________________________________________

^^Усі властивості об’єкта ~window~, що починаються з **~on~**, дають змогу прив’язати функції до подій вікна^^

~~~js
for (var key in window) {
  key.indexOf('on') === 0 && console.log(key)
}
~~~

^^Після **~on~** в імені властивості йде назва типу події^^

#### ![ico-20 icon]  onmessage⟪onmessage⟫

^^Подія **~message~** виникає, коли вікно отримує повідомлення з іншого відкритого вікна браузера^^
^^Якщо до властивості **~onmessage~** «прив’язати» функцію (callback), то ця функція буде викликана при настанні події **~message~**^^

~~~js
window.onmessage = function (event) {
  console.log(event)
}
window.postMessage('Hello!')
~~~

^^Поточне вікно надсилає собі повідомлення '_Hello!_'^^
^^Тепер буде викликано обробник події, і в консолі ми побачимо приблизно таке:^^

~~~console

▼ MessageEvent {isTrusted: true, data: "Hello, I'm listening to you", origin: "null", lastEventId: "", source: Window, …}
    isTrusted: true
    bubbles: false
    cancelBubble: false
    cancelable: false
    composed: false
  ► currentTarget: null
    data: "Hello!"
    defaultPrevented: false
    eventPhase: 0
    isTrusted: true
    lastEventId: ""
    origin: "null"
  ► path: [Window]
  ► ports: []
    returnValue: true
  ► source: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
  ► srcElement: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
  ► target: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
    timeStamp: 5.620000010821968
    type: "message"
    userActivation: null
  ► [[Prototype]]: MessageEvent
~~~

^^Як бачимо, переданий обробнику об’єкт події містить багато корисної інформації^^
^^Зокрема, ми можемо дізнатися, з якого вікна надійшло повідомлення (властивість **_~source~_** об’єкта **~event~**)^^
^^Текст повідомлення ми отримаємо у властивості **_~data~_** об’єкта **~event~**^^
^^У властивості **_~target~_** об’єкта **~event~** буде посилання на вікно (вкладку), яке отримало повідомлення^^

^^Настав час розібратися, як надіслати повідомлення з однієї відкритої вкладки браузера в іншу^^
_____________________________________

**~postMessage()~** — метод, що дозволяє надіслати повідомлення з одного відкритого вікна в інше відкрите вікно браузера

![ico-25 cap] **Приклад**

^^Відкрийте порожню вкладку (у адресному рядку браузера введіть **~about:blank~**)^^
^^Встановимо значення '_parentWin_' для властивості **~name~** активного вікна (вкладки)^^
^^Для цього в консолі активного вікна (вкладки) виконаємо код:^^

~~~js
window.name = "parentWin"
~~~

^^Тепер встановлюємо обробник події **~message~** активної вкладки (анонімну функцію пов’язуємо з властивістю **~onmessage~** об’єкта ~window~):^^

~~~js
window.onmessage = function (event) {
  this.document.write(`<h3>${this.name}</h3><p>Message received</p><b><em>${event.data}</em></b>`)
}
~~~

^^![ico-20 warn] Обробник події повинен завжди отримувати об’єкт події^^
^^(для цього потрібно встановлювати формальний параметр обробника)^^
^^У нашому прикладі формальний параметр має ідентифікатор **~event~**, і всередині анонімної функції-обробника в цій змінній буде посилання на об’єкт події, яка призвела до виклику цієї функції^^

^^Тепер відкриємо нове (дочірнє) вікно (вкладку):^^

~~~js
var childWin = window.open('about:blank', 'childWin')
~~~

^^Як бачите, посилання на нову відкриту вкладку ми помістили у змінну **~childWin~**^^
^^Встановимо обробник події **~onmessage~** для нової вкладки:^^

~~~js
childWin.onmessage = function (event) {
  childWin.document.write(`<h3>${this.name}</h3><p>I've received the message from ${event.source.name}</p><b><em>${event.data}</em></b>`)
  event.source.postMessage('Wecome any time, my dear!', '*')
}
~~~

^^При отриманні повідомлення вкладка виведе його на сторінку, вказавши при цьому своє ім’я (~this.name~) та ім’я вікна, яке надіслало повідомлення (~event.source.name~)^^
^^Крім того, вкладка надішле повідомлення у відповідь із текстом '_Wecome any time, my dear!_'^^

^^Нам залишилося лише надіслати повідомлення новій відкритій нами вкладці:^^

~~~js
childWin.postMessage('Hello, I\'m listening to you', '*')
~~~

____________________________________________

**Повний код прикладу**

~~~js
window.name = 'parentWin'

window.onmessage = function (event) {
  this.document.write(`<h3>${this.name}</h3><p>Message received</p><b><em>${event.data}</em></b>`)
}

let childWin = window.open('about:blank', 'childWin')

childWin.onmessage = function (event) {
  event.target.document.write(`<h3>${this.name}</h3><p>I've received the message from ${event.source.name}</p><b><em>${event.data}</em></b>`)
  event.source.postMessage('Wecome any time, my dear!', '*')
}

childWin.postMessage('Hello, I\'m listening to you', '*')
~~~
________________________________________________