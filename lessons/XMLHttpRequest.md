# ![ico-30 study] AJAX
__________________

# ![ico-30 icon] XMLHttpRequest

^^^[Спецификация]

**XMLHttpRequest** - это API, предоставляющий функциональность на стороне клиента для передачи данных между клиентом и сервером с помощью скриптов

^^^

![ico-25 warn] **Same Origin Policy**

Запрос можно делать только на адреса с тем же протоколом, доменом, портом, что и текущая страница

_______________________

## ![ico-25 icon] Последовательность действий

^^^[Последовательность действий]

1. Создаем объект для обмена данными с сервером ( экземпляр ~XMLHttpRequest~ )

~~~js
var request = new XMLHttpRequest
~~~

2. Используя метод ~open()~ экземпляра, открываем соединение с сервером

~~~js
request.open(method, url)
~~~

3. Устанавливаем обработчиков событий экземпляра

~~~js
request.onreadystatechange = function (event) { ... }
~~~

или более современный вариант:

~~~js
request.onload = function (event) { ... }
request.onerror = function (event) { ... }
...
~~~

4. Если надо, устанавливаем заголовки запроса с помощью метода ~setRequestHeader()~ экземпляра

~~~js
request.setRequestHeader(headerName, headerValue)
~~~

5. Используя метод ~send()~ экземпляра, отправляем запрос серверу

~~~js
request.send(request.body)
~~~

Итого:

~~~js
var request = new XMLHttpRequest

request.open(method, url)

request.onload = function (event) { ... }
request.onerror = function (event) { ... }
...

request.setRequestHeader(headerName, headerValue)

request.send(request.body)
~~~

^^^

_________________________________________

## ![ico-25 icon] Конструктор XMLHttpRequest ()

Создает экземпляр объекта для обмена данными с сервером:

~~~js
var request = new XMLHttpRequest()
~~~

Прототипом является **~XMLHttpRequestEventTarget~**, который наследует от **~EventTarget~**

Экземпляры ~XMLHttpRequest~ имеют ряд унаследованных событий, свойств и методов

^^^[XMLHttpRequest prototype]

| ^^Методы^^ | ^^События^^ | ^^Свойства^^ |
| **~open()~** | **~readystatechange~** | **~onreadystatechange~** |
| **~send()~** | | **~readyState~** |
|  | | **~status~** |
|  | | ~statusText~ |
|  | ~loadstart~ | ~onloadstart~ |
|  | ~progress~ | ~onprogress~ |
|  | ~loadend~ | ~loadend~ |
|  | ~load~ | ~onload~ |
|  | ~error~  | ~onerror~ |
|  | ~timeout~ | ~ontimeout~ |
| ~abort()~ | ~abort~ | ~onabort~ |
|  |  | ~withCredentials~ |
| **~setRequestHeader()~** |  | **~responseType~** |
| ~getAllResponseHeaders()~ | | **~responseText~** |
| ~getResponseHeader()~ | | ~responseURL~ |

^^^

Ответ сервера имеет заголовок ответа ( **~header~** ) и тело ответа ( **~response~** )

__________________________

### ![ico-25 icon] Методы экземпляра XMLHttpRequest

#### Метод open()

Метод ~open~ экземпляра **~XMLHttpRequest~** устанавливает соединение с сервером

![ico-20 green-ok] Первый аргумент - метод доступа (~string~)
![ico-20 green-ok] Второй аргумент - URI ресурса (~string~)
![ico-20 green-ok] Третий аргумент (опциональный, по умолчанию **~true~**) позволяет сделать запрос синхронным, если установить его значение в ~false~ (![ico-20 warn] чего делать категорически не рекомендуется)

^^![ico-20 pin] **Ресурс** - это любые данные на стороне сервера, имеющие **~URI~** (идентификатор ресурса)^^
^^![ico-20 pin] **~URI~** (_~Uniform Resource Identifier~_)^^
^^![ico-20 pin]Ресурсом может быть файл, база данных, запись в базе данных и т.д.^^

________________________

^^^[CRUD]

**CRUD** (_create_, _read_, _update_, _delete_) — четыре базовых типа запроса к серверу

Для идентификации типа запроса первым аргументом метода open() передается строка - метод доступа, или глагол

Метод доступа к ресурсу идентифицирует операцию с ресурсом

| **GET** | **POST** | **PUT** | **PATCH** | **DELETE** | **HEAD** |

![ico-20 green-ok] **GET** - получить данные
![ico-20 green-ok] **POST** - создание нового ресурса (новой записи)
![ico-20 green-ok] **PUT** - обновление существующего ресурса (записи)
![ico-20 green-ok] **PATCH** - частичное обновление существующего ресурса (записи)
![ico-20 green-ok] **DELETE** - удаление ресурса
![ico-20 green-ok] **HEAD** - получение информации о ресурсе

^^^

^^^[URI ресурса]

откуда предполагается получить (**~GET~**) или куда предполагается записать (**~POST~**, **~PUT~**, **~DELETE~**) данные

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var request = new XMLHttpRequest()
request
  .open('GET', 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js')
~~~

^^^
__________________________________________

#### Метод send()

^^^[send()]

Метод ~send()~ отправляет **_тело запроса_** на сервер

**_тело запроса_** - это данные, которые отсылаются на сервер

![ico-20 warn] При передаче данных на сервер важно корректно указать тип данных (заголовок **_Content-Type_**)

При запросе на получение данных (**~GET~**) тело запроса отсутствует

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var request = new XMLHttpRequest()
request
  .open('GET', 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js')
request.send()
~~~

^^^

__________________________________________

#### Метод setRequestHeader()

^^^[setRequestHeader()]

Метод устанавливает заголовок запроса

• первый аргумент - имя заголовка
• второй аргумент - значение

![ico-20 warn] вызывается после **~open ()~**, но перед **~send ()~**

[![ico-20 link] **Заголовки запроса**](https://flaviocopes.com/http-request-headers/)

^^^

__________________________

#### Метод getAllResponseHeaders()

^^^[getAllResponseHeaders()]

~~~js
var transport = new XMLHttpRequest()

transport.onload = function (event) {
  console.dir(this.getAllResponseHeaders())
}
transport
  .open('GET', 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js')
transport.send()
~~~

◘◘**^^Заголовки ответа сервера^^**◘◘

~~~console
last-modified: Tue, 20 Dec 2016 18:17:03 GMT
content-type: text/javascript; charset=UTF-8
cache-control: public, max-age=31536000, stale-while-revalidate=2592000
expires: Wed, 09 Oct 2019 00:23:02 GMT
~~~

^^^

__________________________

### ![ico-25 icon] Свойства экземпляра XMLHttpRequest

^^^[readyState]

![ico-20 warn] Только для чтения

Содержит инфо о стадии прохождения запроса

| | Стадии запроса: |
| 0 | ^^запрос создан, но метод **~open()~** еще не был вызван^^ |
| 1 | ^^метод **~open()~** был вызван; можно формировать заголовки запроса^^ |
| 2 | ^^метод **~send()~** был вызван, и заголовки ответа сервера получены ( можно читать **~status~** )^^ |
| 3 | ^^идет процесс загрузки тела ответа сервера^^ |
| 4 | ^^процесс загрузки ответа завершен^^ |

^^^

^^^[status]

![ico-20 warn] Только для чтения

Содержит код завершения операции

Если запрошенные данные благополучно загружены, то значением будет  **~200~**

В противном случае значением будет код ошибки (например, **~404~**)

^^^

^^^[statusText]

![ico-20 warn] Только для чтения

Текст статуса ответа сервера, соответствующий коду

если ~status === 200~,  то  ~statusText~ будет ~"OK"~
если ~status === 404~,  то  ~statusText~ будет ~"Not Found"~

^^^

^^^[responseText]

![ico-20 warn] Только для чтения

"Тело" ответа сервера

При получении от сервера текстового файла содержимое файла будет значением этого свойства

При обработке асинхронного запроса данные могут быть загружены не полностью, но значение ~responseText~ всегда содержит тот текст, который уже получен от сервера

Свойство ~responseText~ допустимо только для текстового содержимого

^^^

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var transport = new XMLHttpRequest()

transport.open('GET', 'https://www.random.org/strings/?num=1&len=10&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new')

transport.onreadystatechange = function (event) {
  if (this.readyState === 4 && this.status === 200) console.log(this.responseText)
}

transport.send()
~~~

______________________________________

◘◘![ico-25 cap] ** 4**◘◘

~~~js
var transport = new XMLHttpRequest()

transport
  .open('GET', 'https://www.random.org/strings/?num=10&len=20&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new')

transport.onload = function (event) {
  this.status === 200 && console.log(this.responseText)
}

transport.send()
~~~

__________________________

#### ![ico-20 icon] responseType

Свойство **~responseType~** объекта ~XMLHttpRequest~ определяет тип данных ответа сервера

^^^[Возможные значения]

![ico-20 green-ok] пустая строка (по умолчанию)
![ico-20 green-ok] arraybuffer
![ico-20 green-ok] blob
![ico-20 green-ok] document
![ico-20 green-ok] json
![ico-20 green-ok] text

^^^

Свойство **~response~** будет содержать тело объекта в соответствии с ~responseType~

![ico-20 green-ok] ArrayBuffer
![ico-20 green-ok] Blob
![ico-20 green-ok] Document
![ico-20 green-ok] JSON
![ico-20 green-ok] string

Если запрос завершился неудачей, то значением **~response~** будет ~null~

____________________

Получение двоичных данных

◘◘![ico-25 cap] ** 5**◘◘

~~~js
var request = new XMLHttpRequest()
request.open('get', 'https://httpbin.org/get')
request.responseType = 'arraybuffer'

request.onreadystatechange = function () {
  this.readyState === 4
    ? this.status === 200
      ? console.log(this.response)
      : console.error('Request Error')
    : null
}
request.send ()
~~~

^^^[ArrayBuffer]
~~~console
▼ ArrayBuffer(425) {}
  ► [[Int8Array]]: Int8Array(425)
     ► [0 … 99]
     ► [100 … 199]
     ► [200 … 299]
     ► [300 … 399]
     ► [400 … 424]
     ► __proto__: TypedArray
  ► [[Uint8Array]]: Uint8Array(425)
     ► [0 … 99]
     ► [100 … 199]
     ► [200 … 299]
     ► [300 … 399]
     ► [400 … 424]
     ► __proto__: TypedArray
    byteLength: (...)
  ► __proto__: ArrayBuffer
~~~
^^^
___________________________________

#### ![ico-20 icon] withCredentials

**_boolean_**

![ico-20 warn] Используется при кросс-доменных запросах

Значение ~true~ означает:

• разрешение на отправку аутентификационных данных клиента вместе с запросом ( содержимого ~cookie~ )
• разрешение ~third-party cookies~ ( сохранение на клиенте ~cookie~ домена, с которого пришел ответ на наш запрос )

___________________

Посмотрим на примере

![ico-25 cap] ** 6**

Перейдем на **_ptsv2.com_**

Откроем инструменты разработчика => вкладку **~Application~**

в панели навигации ( слева ) откроем раздел **~Cookies~**


^^^[Cookies]

Вручную вставим в куки любые данные

![](http://icecream.me/uploads/6c1f4e083053d065535dcae47a0100f4.png)

Теперь у нас есть куки с домена **_ptsv2.com_**

^^^

Отправим из консоли запрос на сервер с опцией **_~withCredentials~_**

~~~~js
var obj = {
  provider: 'Google',
  type: 'service',
  eco: 'git'
}

var request = new XMLHttpRequest()
request.open('POST', 'http://ptsv2.com/t/garevna/post')

request.withCredentials = true
request.setRequestHeader('Content-Type', 'application/json')

request.onload = function () {
  this.status === 200
    ? console.log(this.response)
    : console.error('Fuck!'')
}
request.send(JSON.stringify(obj))
~~~~


^^^[ptsv2.com]

**Заголовки дампа на сервере ~ptsv2.com~**

![](http://icecream.me/uploads/030a928d8525e6c9738f0e35f744673b.png)

Как видите, вместе с данными на сервер были отправлены куки

Сервер эти куки получил

^^^

Если открыть вкладку **~Network~** инструментов разработчика, то мы увидим, что кроме **Headers**, **Preview**, **Response** и **Timing** для нашего запроса появилась вкладка **Cookies**

^^^[Network]

![](http://icecream.me/uploads/c39e024f7afd6d962457a8ca1435585d.png)

В этой вкладке мы видим и те куки, которые "поехали" с запросом на сервер, и те куки, которые пришли назад

^^(ничего не пришло, потому что **_ptsv2.com_** не пишет куки, и ему наплевать на наше разрешение писать свои куки на клиенте)^^

^^^

_____________________________

#### ![ico-25 icon] Обработка событий

^^Значения свойств, начинающиеся на **~on~**, могут быть ссылкой на колбэк-функцию, которая будет вызвана в момент возникновения события^^
^^Тип обрабатываемого события - текст, следующий за **~on~** в имени свойства^^

____________________________________

##### ![ico-20 icon] onreadystatechange

Свойство, значение которого является ссылкой на колбэк-функцию, которая будет обрабатывать событие изменения значения  ~readyState~

Назначить обработчика:

~~~js
var transport = new XMLHttpRequest()

transport.onreadystatechange = function (event) {
  this.readyState === 4
    ? this.status === 200
      ? console.log(event)
      : null
    : null
}
~~~

При вызове колбэк-функции ей будет передан объект события:

^^^[readystatechange]

~~~console
▼ Event {isTrusted: true, type: "readystatechange", target: XMLHttpRequest, currentTarget: XMLHttpRequest, eventPhase: 2, …}
    bubbles: false
    cancelBubble: false
    cancelable: false
    composed: false
  ► currentTarget: XMLHttpRequest { onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, … }
    defaultPrevented: false
    eventPhase: 0
    isTrusted: true
  ► path: []
    returnValue: true
  ► srcElement: XMLHttpRequest { onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, … }
  ► target: XMLHttpRequest { onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, … }
    timeStamp: 87810968.4
    type: "readystatechange"
  ► __proto__: Event
~~~

^^^

___________________________________________

[:::Пример 7:::](https://plnkr.co/edit/b5gXN9q5FdturHenpo3b?p=preview)

[%%%HTTP Status Messages%%%](https://www.w3schools.com/tags/ref_httpmessages.asp)

_________________________________

##### ![ico-20 icon] ProgressEvent

Остальные события ( ~loadstart~, ~loadend~, ~progress~, ~load~, ~error~, ~timeout~ ) отличаются от события ~readystatechange~ - они относятся к категории **_~ProgressEvent~_**:

~~~console
▼ ƒ ProgressEvent()
    arguments: null
    caller: null
    length: 1
    name: "ProgressEvent"
  ► prototype: ProgressEvent {constructor: ƒ, Symbol(Symbol.toStringTag): "ProgressEvent"}
  ► __proto__: ƒ Event()
~~~

_______________________________

^^^[onload]

Это свойство содержит ссылку колбэк-функцию, которая будет обрабатывать событие благополучного завершения загрузки данных с сервера

◘◘![ico-25 cap] ** 8**◘◘

~~~js
var request = new XMLHttpRequest()
request.open('get', 'https://www.random.org/integers/?num=10&min=0&max=255&col=1&base=16&format=plain&rnd=new')

request.onload = function () {
  this.status === 200 && console.log(this.response)
}
request.send ()
~~~

^^^

_______________________________

^^^[onloadstart &#10072; onprogress &#10072; onloadend]

![ico-25 cap] ** 9**

~~~js
var request = new XMLHttpRequest()
request.open('get', 'https://httpbin.org/get', true)
request.responseType = 'arraybuffer'

request.onloadstart = function (event) {
  console.log('START')
}
request.onloadend = function (event) {
  console.log('END')
}
request.onprogress = function (event) {
  console.log(`progress: ${event.loaded} / ${event.total}`)
}
request.onload = function (event) {
  console.log(this.response)
}
request.send ()
~~~

^^^

____________________

^^^[ontimeout]

Это свойство содержит ссылку колбэк-функцию, которая будет вызвана, когда истечет установленный временной интервал

Временной интервал устанавливается путем определения значения свойства **_timeout_**

◘◘![ico-25 cap] **10**◘◘

~~~js
var request = new XMLHttpRequest()
request.open('POST', 'https://httpbin.org/post')

request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

request.timeout = 100

request.ontimeout = function (event) {
  console.log(event)
}
~~~

^^^

___________________________

^^^[onerror]

Это свойство содержит ссылку колбэк-функцию, которая будет обрабатывать ошибки, возникающие при загрузке данных с сервера

~~~js
var transport = new XMLHttpRequest()

transport.onerror = function (err) {
  console.log(this.responseText)
}
~~~

^^^

_______________________________



◘◘![ico-25 cap] **11**◘◘

var methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
var api = 'https://json-server-with-router.glitch.me'

~~~js
var request = Object.assign(new XMLHttpRequest, {
  onreadystatechange: function (event) {
    event.target.readyState === 4
      ? event.target.status >= 200 && event.target.status < 300
        ? console.log(event.target.status, '\n', JSON.parse(event.target.response))
        : console.warn('Request error: '', event.target.status, event.target.statusText)
      : null
  },
  make: function (endpoint, method, data) {
    method = !methods.includes(method) ? 'GET' : method
    this.open(method, `${api}/${endpoint}`)
    this.setRequestHeader('Content-Type', 'application/json')
    method !== 'GET' && data ? this.send(JSON.stringify(data)) : this.send()
  }
})

~~~

~~~js
request.make('users')
~~~

{{{XMLHttpRequest.js}}}

~~~js
request.make('user/hero', 'POST', { name: 'Jeck', age: 31, speciality: 'pilot' })
request.make('users')
~~~

~~~js
request.make('user/hero', 'PUT', { name: 'Filimon', age: 38, speciality: 'advocate' })
request.make('users')
~~~

~~~js
request.make('user/hero', 'PATCH', { speciality: 'prosecutor', children: 2 })
request.make('users')
~~~

~~~js
request.make('user/hero', 'DELETE')
request.make('users')
~~~


_______________________________

[:::**12**:::](https://plnkr.co/edit/BqbCvoAnbikBtTFTRBHp?p=preview)
[:::**13**:::](https://plnkr.co/edit/DLH49iWObtxqcijNT9oY?p=preview)

__________________________

[![ico-30 hw] **Упражнения**](https://docs.google.com/forms/d/e/1FAIpQLSdA3JwhlOTXdZxCO3y1MdLe-pe-cynNVGeboy7IV0aWHliGHA/viewform)

[%%%Протокол TCP%%%](https://xakep.ru/2002/04/11/14943/)

[%%%RFC793%%%](https://www.lissyara.su/doc/rfc/rfc793/)
