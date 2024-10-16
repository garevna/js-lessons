# ![ico-30 study] Document Object Model (DOM)

## ![ico-25 icon] События элементов DOM

@@@@

<br><br>В цепочке прототипов любого элемента DOM есть объект (класс) **~EventTarget~**.<br>Благодаря этому все элементы DOM способны "реагировать" на события.<br><br><br>Выведем в консоль этот объект:
![](images/object-constructor.svg)

@@@@

~~~js
console.dir(EventTarget)
~~~

Более всего нас интересует, конечно, его свойство **_~prototype~_**

~~~~console

▼ ƒ EventTarget()
    arguments: null
    caller: null
    length: 0
    name: "EventTarget"
    ▼ prototype: EventTarget
        ► addEventListener: ƒ addEventListener()
        ► dispatchEvent: ƒ dispatchEvent()
        ► removeEventListener: ƒ removeEventListener()
        ► constructor: ƒ EventTarget()
          Symbol(Symbol.toStringTag): "EventTarget"
        ► __proto__: Object
    ► __proto__: ƒ ()
~~~~

Здесь мы видим три метода, которые унаследуют все объекты, имеющие в цепочке прототипов  **~EventTarget~**

• addEventListener
• removeEventListener
• dispatchEvent

^^Мы уже в курсе, что объект **~Node~** наследует от объекта **~EventTarget~**,^^
^^а объект **~Element~** наследует от **~Node~**,^^
^^потому что элементы DOM - это частный случай узла DOM^^

^^В свойстве **_~prototype~_** объекта **~Element~** мы обнаружим не слишком длинный перечень свойств, начинающихся на **_~on~_**^^

^^Однако объект **~Element~** является только прототипом объекта **~HTMLElement~**^^

^^А вот последний как раз и является непосредственным прототипом всех элементов DOM^^

^^Поэтому, очевидно, искать события, общие для всех элементов DOM, нужно именно в его свойстве **_~prototype~_**^^

~~~js
for (var prop in HTMLElement.prototype) {
  if (prop.indexOf('on') !== 0) continue
  console.info(`Event: ${prop.slice(2)}`)
}
~~~

^^Однако элементы DOM значительно отличаются друг от друга^^

^^У каждого html-элемента есть собственный конструктор, который "добавляет" специфические" для этого элемента события^^

^^(например, события **~input~** и **~change~** могут произойти только на элементах форм)^^

__________________________________________________________________

![ico-25 cap] **DOMNodeInserted**

~~~js
document.body.ondomnodeinserted = function (event) {
  console.log(event)
}

document.body.appendChild(document.createElement('div'))
~~~

**Результат:**

~~~~console

▼ MutationEvent {isTrusted: true, relatedNode: body, prevValue: "", newValue: "", attrName: "", …}
    attrChange: 0
    attrName: ""
    bubbles: true
    cancelBubble: false
    cancelable: false
    composed: false
    currentTarget: null
    defaultPrevented: false
    eventPhase: 0
    isTrusted: true
    newValue: ""
  ► path: (5) [div, body, html, document, Window]
    prevValue: ""
  ► relatedNode: body
    returnValue: true
  ► srcElement: div
  ► target: div
    timeStamp: 12720.100000005914
    type: "DOMNodeInserted"
  ► __proto__: MutationEvent
~~~~

______________________________________________________

![ico-20 warn] Событие - это объект ![ico-20 smile]

каждое событие создается конструктором **~Event~**

У каждого события есть свойство  **_~type~_** (строка):

^^^[event type]

^^![ico-20 green-ok] click^^
^^![ico-20 green-ok] mouseover^^
^^![ico-20 green-ok] mouseout^^
^^![ico-20 green-ok] mouseenter^^
^^![ico-20 green-ok] mouseleave^^
^^![ico-20 green-ok] mousedown^^
^^![ico-20 green-ok] mouseup^^
^^![ico-20 green-ok] keydown^^
^^![ico-20 green-ok] keyup^^
^^![ico-20 green-ok] scroll^^
^^![ico-20 green-ok] scroll^^
**...**

^^^

В примере выше тип события - ~DOMNodeInserted~

![](illustrations/event-1.png)
Кроме того, у каждого объекта события есть свойство ~target~, которое является ссылкой на элемент, на котором произошло событие

В большинстве случаев это тот элемент, на который был "повешен" обработчик

![ico-20 warn] Однако в примере выше обработчик был повешен на элемент ~body~, а свойство ~target~ указывает на добавленный в DOM элемент

________________________

В следующем примере свойство ~target~ будет ссылкой на тот элемент, на котором произошел клик
Клик на пустом контейнере ( элементе div ) добавляет в контейнер картинку
при этом свойство **target** объекта события показывает на элемент-контейнер
При клике на картинке свойство **target** объекта события показывает на элемент img
а элемент-контейнер получит это событие уже на всплытии, когда свойство **eventPhase** объекта события будет иметь значение 3

Обратите внимание, что мы назначаем всего 1 колбэк - обработчик события **click** элемента-контейнера
Нам не нужно устанавливать дополнительно обработчика события **click** элемента img

◘◘![ico-25 cap] target & eventPhase◘◘

~~~js
var pictures = [
  'https://www.insidescience.org/sites/default/files/5_heic1808a_crop.jpg',
  'https://gobelmont.ca/Portals/0/xBlog/uploads/2017/9/6/dancing-156041_960_720.png',
  'https://i2-prod.mirror.co.uk/incoming/article11840943.ece/ALTERNATES/s615/PAY-MATING-BUGS.jpg',
  'https://i.redd.it/otqqqga0ip211.jpg'
]

var divs = pictures.map(picture => {
  var div = document.body
    .appendChild(document.createElement('div'))
    div.style = `
      width: 200px;
      height: 100px;
      border: solid 1px gray;
    `
    div.onclick = function (event) {
      if (event.eventPhase === 3) this.firstChild.remove()
      else {
        var img = event.target
          .appendChild(document.createElement('img'))
        img.src = picture
        img.width = 200
      }
    }
    return div
})

~~~

{{{DOM-events-1.js}}}

_________________________________

Полный перечень событий DOM можно найти в спецификации:

[HTML DOM Events](external/mdn-dom-events)
[JavaScript Events](external/w3-dom-events)

_________________________________________

## ![ico-25 icon] host-объект Event

Конструктор, с помощью которого создаются все события DOM

Свойство  **_~prototype~_**  конструктора **~Event~** содержит свойства, которые будут унаследованы всеми событиями

~~~js
var userEvent = new Event('user')
~~~

___________________________________

## ![ico-25 icon] dispatchEvent

Метод **dispatchEvent** вызывает событие на элементе

◘◘![ico-25 cap] **dispatchEvent**◘◘

~~~js
document.body.onclick = function (event) {
  this.style.backgroundColor = '#fa0'
}
document.body.dispatchEvent(new Event('click'))
~~~

_________________________________

## ![ico-25 icon] CustomEvent

Конструктор **CustomEvent** создает кастомное событие c дополнительными параметрами

◘◘![ico-25 cap] **CustomEvent**◘◘

~~~js
function addElement (tagName, container) {
  var _container = container && container.nodeType === 1
    ? container
    : document.body
  return _container.appendChild(document.createElement(tagName))
}

var obj = addElement('h1')

obj.innerText = 'Hi'

obj.addEventListener('listen', listenHandler)

function listenHandler (event) {
  this.innerText = event.detail
}

var btn = addElement('button')
btn.innerText = 'Change'

btn.onclick = function (event) {
  var inp = addElement('input')
  inp.onchange = function (event) {
    obj.dispatchEvent(new CustomEvent('listen', {
      detail: this.value
    }))

    this.parentNode.removeChild(this)
  }
}
~~~

______________________________________

## ![ico-25 icon] event handler

У всех элементов есть свойства с именами, начинающимися с  "**_on_**"

Значения этих свойств должны быть ссылкой на callback-функцию, которая будет вызвана при возникновении события ( _event handler_ )

Обработчик события - это функция, которая вызывается тогда, когда событие произошло

Если определить значение свойства  **_~onclick~_**  элемента как функцию **_clickCallback_**, то в момент, когда пользователь кликнет левой кнопкой мышки на этом элементе, будет вызвана функция **_clickCallback_**

Функция  **_clickCallback_** станет обработчиком события  **~click~**  элемента

![ico-20 warn] Обработчики события в момент их вызова получают в качестве первого аргумента **объект события**

^^Поэтому при объявлении функции-обработчика настоятельно рекомендуется в качестве первого параметра указывать имя переменной, в которую будет помещена ссылка на объект события:^^

~~~js
elem.onclick = function (event) { ... }
elem.onmouseover = function (ev) { ... }
~~~

Таким образом объект события становится доступным внутри обработчика

_________________________________________

### ![ico-20 icon] event.screenX &#124; event.screenY

Координаты указателя мышки относительно левого верхнего угла физического экрана

_________________________________________________

### ![ico-20 icon] event.clientX &#124; event.clientY

Координаты указателя мышки относительно верхнего левого края видимой части окна браузера (**~viewport~**)

[:::clientX | clientY:::](external/clientX-clientY)

Эти координаты не зависят от положения полосы прокрутки окна браузера

_______________________________

### ![ico-20 icon] event.pageX &#124; event.pageY

Координаты указателя мышки относительно верхнего левого края страницы

Эти координаты зависят от положения полосы прокрутки окна браузера

_________________________

### ![ico-20 icon] eventPhase

[:::eventPhase:::](external/event-phase)

____________________________

## ![ico-25 icon] eventListener

Этот сервис браузерного API позволяет повесить на одно и то же событие одного и того же элемента несколько коллбеков.
Для этой цели создается "посредник" между событием элемента и коллбеком.
Каждый "посредник" как бы "прослушивает" событие элемента.
Число посредников не ограничено.

![](illustrations/event-2.png)

Методы добавления и удаления прослушивателей событий:

![ico-20 green-ok] addEventListener
![ico-20 green-ok] removeEventListener

Свойства "on..." позволяют "повесить" только одного обработчика данного события на данный элемент.

eventListener-ов может быть сколько угодно для одного и того же элемента и одного и того же события.

Предположим, мы вешаем обработчика события mousemove на все элементы **div**.

Затем вешаем "персонального" обработчика события **_~mousemove~_** на  **~div#sample~**.

На элементе **~div#sample~** "сработают" оба обработчика при наведении указателя мышки.

_________________________________________________________________

## ![ico-25 icon] addEventListener

Первый аргумент метода addEventListener - это тип события ( строка ), например:
^^• mouseover<br>• mouseout<br>• input<br>• change<br>**...**^^

Второй аргумент - ссылка на функцию (обработчика события)

_______________________

◘◘![ico-25 cap] ** 1**◘◘

~~~js
document.getElementById('sample')
  .addEventListener('click', function (event) {
    console.log('sample click event:\n', event)
  })
~~~

______________________________

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var circle = document.body
  .appendChild(document.createElement('div'))
circle.style = `
  position: absolute;
  top: 64px;
  left: 64px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #09b;
  transition: all .5s;
`
circle.addEventListener('click', function (event) {
  event.target
    .style
    .background = Math.random() < 0.5 ? '#09b' : '#fa0'
})

circle.addEventListener('click', function (event) {
  event.target.style.top = Math.max(Math.random() * window.innerWidth - 200, 0)
  event.target.style.left = Math.max(Math.random() * window.innerHeight - 200, 0)
})
~~~

В этом примере с помощью метода **~addEventListener~** мы назначаем два обрабочика события ~click~ элемента.

{{{DOM-events-2.js}}}

_______________________

Третий (опциональный) формальный параметр метода **~addEventListener~** (логическое значение), по умолчанию имеет значение ~false~; будучи установленным в ~true~, позволяет перехватить событие на фазу погружения (**_capturing_**).

_____________________________

◘◘![ico-25 cap] ** 3**◘◘

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

var callback = event => console.log(`target: ${event.currentTarget.tagName} eventPhase: ${event.eventPhase}`)

btn.addEventListener('click', callback, true)

document.body.addEventListener('click', callback, true)
~~~

{{{DOM-events-3.js}}}

_________________________________________________

### ![ico-20 icon] preventDefault()

Иногда мы не хотим, чтобы при наступлении события элемент HTML вел себя так, как он должен себя вести по умолчанию

В таком случае мы можем использовать метод **~preventDefault()~**

Например, по умолчанию в результате клика на гиперссылке происходит переход по адресу, указанному атрибутом *href*

Мы можем внутри обработчика события **_~click~_** элемента **~ a~** вызвать метод **_~preventDefault()~_**, что предотвратит поведение по умолчанию, и перехода не будет

_______________________

◘◘![ico-25 cap] ** 4**◘◘

~~~js
var elem = document.body
  .appendChild(document.createElement('a'))

elem.innerText = 'click me'

elem.href = 'https://www.w3schools.com/charsets/ref_utf_punctuation.asp'

elem.addEventListener('click', function (event) {
  event.preventDefault()
  alert(`href: ${this.href}`)
})
~~~

___________________________________

### ![ico-20 icon] stopPropagation()

Предотвращает "всплытие" события, т.е. срабатывание обработчиков этого события на элементах, внутри которых находится целевой элемент

Почти все события "всплывают" ( но не все, например, событие **_focus_** не всплывает )

__________________

Запустите код в консоли, кликните на самом маленьком кружке и посмотрите, что будет выведено в консоль

◘◘![ico-25 cap] ** 5**◘◘
~~~js
var elemData = {
   name: 'div',
   attrs: {
     className: 'container',
     title: 'Контейнер',
     style: `
       position: absolute;
       top: 20px;
       left: 20px;
       border-radius: 50%;
       border: dotted 2px #789;
       background-color: #70ff9090;
     `
   }
}

function clickHandler (event) {
  // event.stopPropagation()
  console.info(this.num)
}

function insertElement (elemNum, parentElem = document.body) {
   var elem = parentElem
     .appendChild(document.createElement(elemData.name))
   elem.num = elemNum

   for (var attr in elemData.attrs) {
     elem[attr] = elemData.attrs[attr]
   }

   elem.style.width = `${400 - elemNum * 50}px`
   elem.style.height = `${400 - elemNum * 50}px`

   elem.addEventListener('click', clickHandler)

   return elem
}

var elems = []
elems [0] = insertElement(0)
for ( var x = 1; x < 5; x++ ) {
  elems [x] = insertElement(x, elems[x - 1])
}
~~~

Теперь перезагрузите страницу, опять вставьте код, но раскомментируйте строку

~~~js
event.stopPropagation()
~~~

кликните на самом маленьком кружке и посмотрите, что будет выведено в консоль


____________________________________

### ![ico-20 icon] stopImmediatePropagation()

Если у элемента есть несколько прослушивателей одного и того же события, они будут вызваны в том порядке, в котором они были добавлены

Если один из обработчиков, установленных одним из этих listener-ов, вызовет метод **~event.stopImmediatePropagation()~**, то остальные listener-ы, следующие за ним, уже не сработают

_______________________

Если выполнить следующий код в консоли:

◘◘![ico-25 cap] ** 6**◘◘

~~~js
var elem = document.body
  .appendChild(document.createElement('p'))

elem.innerHTML = 'Click me, please'

var text = [
  'I\'m the first here, don\'t pay attention for the rest!',
  'Hello',
  'are you happy?',
  'what is your favorite language?',
  'Bye'
]

for (var txt of text) {
  elem.addEventListener('click', (function (message) {
    return function () {
      // event.stopImmediatePropagation()
      elem.innerHTML += `<br />${message}`
    }
  })(txt))
}
~~~

то при клике на элементе сработают все прослушиватели собятия ~click~ элемента в той последовательности, в какой мы их определили

Однако если убрать слеши перед строчкой

~~~js
event.stopImmediatePropagation()
~~~

то сработает только один прослушиватель, и выведена в консоль будет только одна строчка

____________________________________________

## ![ico-25 icon] removeEventListener

Прослушивателей событий желательно удалять перед удалением элемента

^^Раньше прослушиватели удаленных элементов были причиной утечек памяти ( memory leaks ), поскольку Internet Explorer не умел обнаруживать такие ссылки^^
^^каждый раз, когда наблюдатель добавлялся к элементу в IE, это приводило к утечке памяти^^
^^По этой причине стало нормальной практикой явно удалять обработчиков перед удалением элементов или обнулять ссылки внутри наблюдателей^^

При удалении прослушивателя нужно передавать точно такие же аргументы, какие были переданы методу addEventListener при его создании

^^В настоящее время современные браузеры ( включая IE и Microsoft Edge ) используют современные алгоритмы сбора мусора,^^
^^которые могут обнаруживать таких прослушивателей событий для удаленных элементов^^
^^Так что теперь не обязательно вызывать removeEventListener перед удалением элемента^^

___________________

Такой вариант удаления не сработает:

◘◘![ico-25 cap] ** 7**◘◘

~~~js
document.getElementById('sample')
  .addEventListener('click', function (event) {
    console.log('sample click event:\n', event)
  })

document.getElementById('sample')
  .removeEventListener('click', function (event) {
    console.log('sample click event: ', event)
  })
~~~

___________________________________

А такой - да:

◘◘![ico-25 cap] ** 8**◘◘

~~~js
function clickHandler (event) {
  this.innerHTML = '<small>My content was changed!</small>'
}
elem.addEventListener('click', clickHandler)
elem.removeEventListener('click', clickHandler)
~~~

_________________________

![ico-25 cap] ** 9**

^^^[Разметка]

~~~html
<div id="main-frame" class="wrapper">
  <div id="main-content">
    <div id="main-message">
      <h1>Event Listener</h1>
      <p>Тестируем работу eventListener</p>
      <div id="list">
         <p>Что нужно помнить:</p>
         <ul class="single">
            <li>eventListener-ов нужно удалять</li>
            <li>Для этого есть метод removeEventListener</li>
         </ul>
      </div>
      <div class="error">Error was detected</div>
      <div id="diagnose">Печалька</div>
    </div>
  </div>
</div>

<div id="error">
  <p id="details">____________________</p>
</div>
~~~

^^^

^^^[Скрипт]

~~~js
var collection = document.querySelectorAll('p &#126; *')

collection.forEach(x => {
  if (x.nodeType === 1) {
    x.addEventListener('mouseover', function (event) {
      var message = event.target.tagName + event.target.id
        ? '#' + event.target.id
        : event.target.className
          ? '.' + event.target.className
          : ' content: ' + event.target.innerHTML

      console.warn(message)
    })
  }
})

var elem = document.querySelector('#list')
elem.addEventListener('mouseover', function (event) {
  event.target.innerHTML = `event: ${new Date().toLocaleString()}`
})

function clickHandler (event) {
  this.innerHTML = '<small>My content was changed!</small>'
}

elem.addEventListener('click', clickHandler)
~~~

^^^

_______________________________________________________

Обратите внимание, что элемент в следущем примере создается только один раз
При удалении элемента ссылка на него сохраняется в переменной **elem**
вместе со свойствами **onclick**, **onmouseover** и **onmouseout**,
а при повторной вставке элемента в DOM все обработчики событий продолжают работать так же, как и до удаления

◘◘![ico-25 cap] ** 9**◘◘

~~~js
var elem = null

function bodyClickHandler (event) {
  if (elem) document.body.appendChild(elem)
  else {
    elem = document.body
      .appendChild(document.createElement('div'))

    elem.style = `
      padding: 20px;
      border: 2px solid #09b;
    `
    elem.onclick = function (event) {
      event.stopPropagation()
      elem = event.target.parentNode.removeChild(event.target)
      document.body.onclick = bodyClickHandler
    }

    elem.onmouseover = function (event) {
      event.target.style.borderColor = '#f50'
      event.target.innerText = 'Welcome!'
    }
    elem.onmouseout = function ( event ) {
      event.target.style.borderColor = '#09b'
      event.target.innerText = 'Bye!'
    }
  }
  document.body.onclick = null
}

document.body.onclick = bodyClickHandler
~~~

{{{DOM-events.js}}}

____________________________________________________________

Примеры в песочнице:

[:::mouseover & mouseout:::](external/mouseover-mouseout)

[:::mouseenter & mouseleave:::](external/mouseenter-mouseleave)

[:::onscroll &#124; onwheel:::](external/onscroll-onwheel)

[:::keypress vs keydown:::](external/keypress-keydown)

[:::dispatchEvent:::](external/dispatch-event)

_____________________________________________

[![ico-30 hw] Упражнения](external/dom-events)

___________________________

[![ico-30 link] eventListener](external/w3-event-listener)
