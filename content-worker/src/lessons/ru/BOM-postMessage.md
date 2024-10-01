# ![ico-30 study] Browser Object Model

## ![ico-25 icon] window.postMessage()

^^![ico-20 warn] Для понимания этого раздела нужно познакомиться с событийной моделью браузера^^
___________________________________________________

^^Все свойства объекта window, начинающиеся на "on", позволяют привязать функции к событиям окна^^

~~~js
for (var key in window) {
  key.indexOf('on') === 0 && console.log(key)
}
~~~

^^После "on" в имени свойства следует название типа события^^

#### ![ico-20 icon]  onmessage

^^Событие **~message~** возникает при получении окном сообщения из другого открытого окна браузера^^
^^Если на свойство **~onmessage~** "повесить" функцию ( callback ), то эта функция будет вызвана при наступлении события **~message~**^^

~~~js
window.onmessage = function (event) {
  console.log(event)
}
~~~

^^Предположим, текущее окно получило сообщение "_Hello, I'm listening to you_"^^
^^Теперь будет вызван обработчик события и в консоли мы увидим примерно следующее:^^

~~~console

▼ MessageEvent {isTrusted: true, data: "Hello, I'm listening to you", origin: "null", lastEventId: "", source: Window, …}
    bubbles: false
    cancelBubble: false
    cancelable: false
    composed: false
  ► currentTarget: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
    data: "Hello, I'm listening to you"
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
  ► __proto__: MessageEvent
~~~

^^Как мы видим, переданный обработчику объект события несет в себе много полезной информации^^
^^В частности, мы можем узнать, из какого окна пришло сообщение ( свойство **_~source~_** объекта **~event~** )^^
^^Текст сообщения мы получим в свойстве **_~data~_** объекта **~event~**^^
^^В свойстве **_~target~_** объекта **~event~** будет ссылка на окно ( вкладку ), которое получило сообщение^^

^^Пришло время разобраться, как отправить сообщение из одной открытой вкладки бразера в другую^^
_____________________________________

**postMessage()** - метод, позволяющий послать сообщение из одного открытого окна в другое открытое окно браузера

![ico-25 cap] **Пример**

^^Откройте пустую вкладку ( в адресной строке браузера наберите **~about:blank~** )^^
^^Установим значение "parentWin" для свойства **~name~** активного окна ( вкладки )^^
^^Для этого в консоли активного окна ( вкладки ) выполним код:^^

~~~js
window.name = "parentWin"
~~~

^^Теперь установливаем обработчика события **~message~** активной вкладки (анонимную функцию связываем со свойством **~onmessage~** объекта ~window~):^^

~~~js
window.onmessage = function (event) {
  this.document.write(`<h3>${this.name}</h3><p>Message received</p><b><em>${event.data}</em></b>`)
}
~~~

^^![ico-20 warn] Обработчик события должен всегда получать объект события^^
^^( для этого нужно устанавливать формальный параметр обработчика )^^
^^В нашем примере формальный параметр имеет идентификатор **~event~**, и внутри анонимной функции-обработчика в этой переменной будет ссылка на объект события, которое привело к вызову этой функции^^

^^Теперь откроем новое (дочернее) окно (вкладку):^^

~~~js
var childWin = window.open('about:blank', 'childWin')
~~~

^^Как видите, ссылку на новую открытую вкладку мы поместили в переменную **childWin**^^
^^Установим обработчика события **~onmessage~** новой вкладки:^^

~~~js
childWin.onmessage = function (event) {
  childWin.document.write(`<h3>${this.name}</h3><p>I've received the message from ${event.source.name}</p><b><em>${event.data}</em></b>`)
  event.source.postMessage('Wecome any time, my dear!', '*')
}
~~~

^^При получении сообщения вкладка выведет его на страницу, указав при этом свое имя ( ~this.name~ ) имя окна, отправившего сообщение ( ~event.source.name~ )^^
^^Кроме того, вкладка отправит сообщение в ответ с текстом "_Wecome any time, my dear!_"^^

^^Нам осталось только отправить сообщение новой открытой нами вкладке:^^

~~~js
childWin.postMessage('Hello, I\'m listening to you', '*')
~~~

____________________________________________

**Полный код примера**

~~~js
window.name = 'parentWin'

window.onmessage = function (event) {
  this.document.write(`<h3>${this.name}</h3><p>Message received</p><b><em>${event.data}</em></b>`)
}

let childWin = window.open('about:blank', 'childWin')

childWin.onmessage = function (event) {
  event.target.document.write(`<h3>${this.name}</h3><p>I've received the message from ${event.source.name}</p><b><em>${event.data}</em></b>`)
  event.source.postMessage('Wecome any time, my dear!'', '*')
}

childWin.postMessage('Hello, I\'m listening to you', '*')
~~~
________________________________________________