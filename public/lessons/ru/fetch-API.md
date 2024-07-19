# ![ico-30 study] AJAX

_____________________________________________________

## ![ico-25 icon] CORS

^^^[Cross-Origin Resource Sharing]

^^По соображениям безопасности браузеры ограничивают кросс-доменные запросы, инициированные из скриптов.^^
^^XMLHttpRequest и Fetch API следуют политике одинакового происхождения (same-origin).^^
^^Это означает, что веб-приложение, использующее эти API, может запрашивать только ресурсы из того же источника, из которого было загружено приложение (если только ответ от другого источника не содержит правильные заголовки CORS)^^
______________________
**_Cross-Origin Resource Sharing_** (**CORS**) - это механизм, который использует дополнительные заголовки HTTP, чтобы сообщить браузеру, что веб-приложение, работающее в одном домене, имеет разрешение на доступ к выбранным ресурсам другого домена.

^^^
______________

# ![ico-30 icon] Fetch API

^^Fetch API является продвинутой альтернативой XMLHttpRequest.^^

Fetch API предоставляет глобальный метод **~fetch()~** для асинхронного доступа к ресурсам в сети.

Метод **~fetch~** отправляет объект запроса на сервер и возвращает **_промис_**.

Самый простой объект GET-запроса может включать только URI ресурса.

~~~js
fetch('message.txt')
  .then(response => { ... })
~~~

^^При возникновении ошибок HTTP (404, 500 и т.д.) возвращаемый методом fetch() промис разрешится нормально^^
^^(В таком случае он вернет значение ~false~ опции статуса **~ok~**)^^
^^![ico-20 warn] Он завершится с ошибкой только при сбое сети^^

Когда промис завершится, он вернет объект **~Response~**

_____________________________________________________________

## ![ico-25 icon] Request

**Конструктор**

С его помощью можно создать объект запроса

^^^[Request]

В свойстве **~prototype~** конструктора **~Request~** находятся все наследуемые экземплярами свойства и методы:

| ^^Свойства^^                | ^^Методы^^            |
| ^^**bodyUsed**^^            | ^^**arrayBuffer()**^^ |
| ^^cache^^                   | ^^**blob()**^^        |
| ^^**credentials**^^         | ^^clone()^^           |
| ^^destination^^             | ^^**formData()**^^    |
| ^^**headers**^^             | ^^**json()**^^        |
| ^^**integrity**^^           | ^^**text()**^^        |
| ^^isHistoryNavigation^^     |                       |
| ^^keepalive^^               |                       |
| ^^**method**^^              |                       |
| ^^**mode**^^                |                       |
| ^^redirect^^                |                       |
| ^^referrer^^                |                       |
| ^^referrerPolicy^^          |                       |
| ^^signal^^                  |                       |
| ^^**url**^^                 |                       |

^^^
________________________________________________

![ico-25 cap] ** 1**

Создадим с помощью конструктора **~Request~** простой объект запроса:

~~~js
const request = new Request('https://api.github.com/users')
~~~

и выведем его в консоль:

~~~~Request
▼ Request {method: "GET", url: "https://api.github.com/users", headers: Headers, destination: "", referrer: "about:client", …}
    bodyUsed: false
    cache: "default"
    credentials: "same-origin"
    destination: ""
  ► headers: Headers {}
    integrity: ""
    isHistoryNavigation: false
    keepalive: false
    method: "GET"
    mode: "cors"
    redirect: "follow"
    referrer: "about:client"
    referrerPolicy: ""
  ► signal: AbortSignal {aborted: false, onabort: null}
    url: "https://api.github.com/users"
  ► __proto__: Request
~~~~

Мы видим дефолтные значения опций запроса, которые мы не устанавливали.

Давайте установим некоторые опции:

~~~js
const request = new Request('https://api.github.com/users', {
  credentials: 'include',
  mode: 'same-origin',
  headers: new Headers({
    'Content-Type' : 'application/json'
  })
})

request.headers.get('Content-Type')
~~~

Посмотрим в консоли, что у нас получилось:

~~~~Request
▼ Request {method: "GET", url: "https://api.github.com/users", headers: Headers, destination: "", referrer: "about:client", …}
    bodyUsed: false
    cache: "default"
    credentials: "include"
    destination: ""
  ► headers: Headers {}
    integrity: ""
    isHistoryNavigation: false
    keepalive: false
    method: "GET"
    mode: "same-origin"
    redirect: "follow"
    referrer: "about:client"
    referrerPolicy: ""
  ► signal: AbortSignal {aborted: false, onabort: null}
    url: "https://api.github.com/users"
  ► __proto__: Request
~~~~

Обратите внимание, что в консоли мы видим как бы "пустой" объект заголовков:

~~~console
► headers: Headers {}
~~~

Однако это объект, данные которого "спрятаны" в приватных свойствах, и для доступа к ним у этого объекта есть ряд интефейсных методов:

~~~~Headers
▼ Headers {}
  ▼ __proto__: Headers
      ► append: ƒ append()
      ► delete: ƒ delete()
      ► entries: ƒ entries()
      ► forEach: ƒ forEach()
      ► get: ƒ ()
      ► has: ƒ has()
      ► keys: ƒ keys()
      ► set: ƒ ()
      ► values: ƒ values()
      ► constructor: ƒ Headers()
      ► Symbol(Symbol.iterator): ƒ entries()
        Symbol(Symbol.toStringTag): "Headers"
      ► __proto__: Object
~~~~

Воспользуемся методом ~get()~ для получения значения заголовка _Content-Type_:

~~~js
request.headers.get('Content-Type') // "application/json"
~~~

Для создания заголовков запроса мы воспользовались конструктором **Headers**, хотя точно такой же результат мы получим в результате:

~~~js
const request = new Request('https://api.github.com/users', {
  credentials: 'include',
  mode: 'same-origin',
  headers: {
    'Content-Type' : 'application/json'
  }
})
~~~

Давайте разберемся, что означают некоторые опции объекта запроса.

| ^^Опция^^ | ^^Описание^^ |
| **~method~** | ^^**GET** - получить данные<br>**POST** - создание нового ресурса<br>**PUT** - обновление существующего ресурса<br>**DELETE** - удаление ресурса<br>**HEAD** - получение информации о ресурсе^^ |
| **~mode~** | ^^**cors**<br>**no-cors**<br>**same-origin**^^ |
|  **~credentials~**  | ^^**omit** - Никогда не использовать куки<br>**same-origin** - Значение по умолчанию<br>Учетные данные пользователя ( файлы cookie, данные http-аутентификации и т.д. ) отправляются с запросом только в том случае, если домен вызывающего скрипта и запрашиваемого ресурса совпадают<br>**include** - Учетные данные пользователя ( файлы cookie, данные http-аутентификации и т.д. ) отправляются в любом случае, даже в случае кросс-доменного запроса^^ |
| **~integrity~** | ^^дайджест ( цифровая подпись ) ресурса<br>( Подробнее: SHA )^^ |
| **~cache~** | ^^режим кэширования<br>default / reload / no-cache^^ |

_______________________________________________

### ![ico-20 icon] Опция method

**Метод доступа к ресурсу** (CRUD)

^^Ресурс - это любые данные на стороне сервера, имеющие **URI** (идентификатор ресурса)^^
^^**URI** (_Uniform Resource Identifier_)^^
^^Ресурсом может быть файл, база данных, запись в базе данных и т.д.^^

~~~js
const request = new Request('https://httpbin.org/post', {
  method: 'GET'
})
~~~

_______________________________________________

### ![ico-20 icon] Опция mode

Режим запроса

^^^[same-origin]

Запросы из других источников будут приводить к генерации исключения

![ico-25 cap] ** 2**

^^Например, такой запрос из консоли пустой страницы (_about:blank_)^^

~~~js
const request = new Request('https://avatars2.githubusercontent.com/u/46?v=4', {
  mode: 'same-origin'
})

fetch(request)
  .then(response => console.log(response))
~~~

^^![ico-20 error] приведет к генерации следующего исключения:^^

~~~console
Fetch API cannot load https://avatars2.githubusercontent.com/u/46?v=4
Request mode is "same-origin"
but the URL's origin is not same as the request origin null
~~~

^^Режим запроса **same-origin** (одного происхождения), а домен, которого сделан запрос (~null~) не совпадает с доменом, на который был отправлен запрос^^
^^в результате чего промис завершится неудачей:^^

![ico-20 error] ~Promise {<rejected>: TypeError: Failed to fetch~

^^^

^^^[no-cors]

В таком режиме при кросс-доменном запросе исключение не будет сгенерировано, но ответ будет пустым.

_________________________________________________________

![ico-25 cap] ** 3**

~~~js
const request = new Request('https://avatars2.githubusercontent.com/u/46?v=4', {
  mode: 'no-cors'
})

fetch(request)
  .then(response => response.blob())
  .then(response => console.log(response))
~~~

^^На такой запрос ответ будет: ~Blob(0) { size: 0, type: "" }~^^
^^Если тот же запрос сделать без ~mode: 'no-cors'~^^
^^то ответ будет: ~Blob(35635) { size: 35635, type: "image/jpeg" }~^^

^^^

^^^[cors]

Разрешает кросс-доменные запросы
(![ico-20 warn] если домен, куда направляется запрос, поддерживает CORS)

________________________________________________

![ico-25 cap] ** 4**

^^Например, запрос:^^

~~~js
const request = new Request('http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg', {
  mode: 'cors'
})
fetch(request)
  .then(response => console.log(response))
~~~

^^![ico-20 error] приведет к генерации исключения:^^

~~~console
Failed to load http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg:
No 'Access-Control-Allow-Origin' header is present on the requested resource
Origin 'null' is therefore not allowed access
If an opaque response serves your needs,
set the request's mode to 'no-cors' to fetch the resource with CORS disabled
~~~

^^![ico-20 error] и соответствующему "провалу" запроса:^^

~~~console
Uncaught (in promise) TypeError: Failed to fetch
~~~

^^Это происходит потому, что в режиме **~cors~** требуется, чтобы сервер запрошенного ресурса вернул заголовок **~Access-Control-Allow-Origin~** ^^
^^со значением, совпадающим со значением **~Origin~** запроса (а заголовок **~Origin~** нельзя подделать, он устанавливается браузером при отправке запроса на сервер).^^

^^Если сервер запрошенного ресурса вернет заголовок **~Access-Control-Allow-Origin~** со значением **~ *~**, то запрос будет выполнен нормально.^^

^^^

![ico-25 cap] ** 5**

~~~js
var request = new Request('https://httpbin.org/get', {
  mode: 'cors'
})

fetch(request)
  .then(response => response.text())
  .then(response => console.log(response))
~~~

~~~~console
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,ru;q=0.8",
    "Connection": "close",
    "Host": "httpbin.org",
    "Origin": "null",
    "Save-Data": "on",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
  },
  "origin": "185.38.217.69",
  "url": "https://httpbin.org/get"
}
~~~~

______________________________________

Когда объект запроса создается с помощью конструктора **~Request~**, значение свойства ~mode~ для этого запроса устанавливается в _~cors~_

~~~js
const request = new Request('http://bm.img.com.ua/img/prikol/images/large/0/0/307600.jpg')
console.log(request.mode) // cors
~~~

В противном случае в качестве режима обычно используется **~no-cors~**
^^( например, когда запрос инициируется из разметки, и атрибут ~crossorigin~ отсутствует )^^
^^для элементов ~&lt;link>~, ~&lt;script>~, ~&lt;img>~, ~&lt;audio>~, ~&lt;video>~, ~&lt;object>~, ~&lt;embed>~ или ~&lt;iframe>~ запрос выполняется в режиме **~no-cors~**^^

_____________________________________________________

## ![ico-25 icon] Response

| Свойства | объекта Response |
| **~type~** | ^^строка, информирующая о том, откуда пришел ресурс<br>**basic** - запрос с того же домена<br>**cors** - данные получены с другого домена с использованием CORS-заголовков<br>**opaque** - непрозрачный ответ на запрос другого происхождения, который не возвращает заголовки CORS<br>не позволяет прочитать возвращенные данные или просмотреть статус запроса ( нет возможности проверить успешность запроса )^^ |
| **~url~** | ^^URL адрес ответа сервера^^ |
| **~status~** | ^^код статуса ответа сервера^^ |
| **~statusText~** | ^^текст статуса ответа сервера^^ |
| **~ok~** | ^^логическое выражение; принимает значение `true`, если получение данных произошло без ошибок ( status от 200 до 299 )^^ |
| **~bodyUsed~** | ^^логическое выражение; принимает значение `true`, если `body` загружено^^ |

____________________________________________________

### ![ico-20 icon] Заголовки ответа

Объект **~headers~** ответа сервера имеет ряд унаследованных методов

~~~~Headers
▼ Headers
  ▼ __proto__: Headers
      ► append: ƒ append()
      ► delete: ƒ delete()
      ► entries: ƒ entries()
      ► forEach: ƒ forEach()
      ► get: ƒ ()
      ► has: ƒ has()
      ► keys: ƒ keys()
      ► set: ƒ ()
      ► values: ƒ values()
      ► constructor: ƒ Headers()
      ► Symbol(Symbol.iterator): ƒ entries()
        Symbol(Symbol.toStringTag): "Headers"
      ► __proto__: Object
~~~~

Воспользуемся методом ~forEach~ для получения значений всех возвращаемых сервером заголовков ответа

___________________________________________

![ico-25 cap] ** 6**

Отправим запрос с методом **HEAD**:

~~~js
fetch('https://api.github.com/users/5', { method: 'HEAD'})
  .then(response => response.headers.forEach(key => console.log(key)))
~~~

~~~~console
public, max-age=60, s-maxage=60
application/json; charset=utf-8
W/"7870416c9818dd4ba65ab505535c7b79"
Fri, 28 Dec 2018 06:04:01 GMT
github.v3; format=json
60
53
1560761075
~~~~

^^Пока мы не можем посмотреть, как работают методы keys и entries, поскольку оба эти метода возвращают объект итератора, что мы будем изучать позже^^
______________________________________________________________________

### ![ico-20 icon] Тип ответа

Ответ (Response) имеет свойство **~type~**, которое может иметь значения _~basic~_, _~cors~_ или _~opaque~_

Если запрос выполняется в пределах одного домена, то свойство **~type~** ответа будет _~basic~_ (запрос без ограничений)

В случае кросс-доменного запроса все зависит от ответа

Если ответ содержит CORS заголовки, то свойство **~type~** ответа будет _~cors~_

Такой ответ ограничивает доступ к заголовкам - доступны будут только заголовки ^^**_Cache-Control_**^^, ^^**_Content-Language_**^^, ^^**_Content-Type_**^^, ^^**_Expires_**^^, ^^**_Last-Modified_**^^, и ^^**_Pragma_**^^

Если значением опции **~mode~** запроса было _~cors~_, но удаленный ресурс не вернул CORS-заголовки, то свойство **~type~** ответа будет _~opaque~_

_____________________________________

### ![ico-20 icon] body

Это объект _~ReadableStream~_, доступ к которому обеспечивают следующие методы объекта **_~Response~_**:

| ^^Методы^^          | ^^возвращают **_промис_**, результатом которого будет^^ |
| **~arrayBuffer()~** | ^^объект ArrayBuffer ( строка из нулей и единиц )^^ |
| **~blob()~**        | ^^объект Blob ( данные в двоичном формате )^^ |
| **~clone()~**       | ^^копия объекта Response^^ |
| **~formData()~**    | ^^объект FormData^^> |
| **~json()~**        | ^^объект, полученный в результате парсинга JSON-строки^^ |
| **~text()~**        | ^^текст^^ |

________________________________________

#### ![ico-20icon] json()

Воспользуемся [**сервисом**](https://api.2ip.ua) для получения полной информации о пользователе
^^( в данном случае - о самом себе )^^

^^^[Пример 7]

^^Для получения такой инфо методу  **~fetch~**  нужно передать в качестве аргумента строку^^

~https://api.2ip.ua/geo.json?ip=~

^^Метод  **~fetch~**  вернет промис, поэтому "повесим" обработчика успешного завершения  **~then~**^^
^^Как мы знаем, метод  **~then~**  принимает один аргумент - функцию, которая будет вызвана в случае успешного завершения асинхронной операции:^^

~~~js
fetch('https://api.2ip.ua/geo.json?ip=')
  .then(response => { ... })
~~~

^^Эта функция получит в качестве аргумента ответ сервера  **_response_** ( так мы назвали эту переменную )^^
^^Нам не нужен весь объект  **_response_**, который вернет нам метод  **~fetch~**^^
^^Нам нужен результат ( данные ) в формате  _json_^^
^^Используем метод   **~json()~** объекта  **~Response~**^^
^^Мы знаем, что этот метод также вернет промис, т.е. нам нужно еще одного обработчика **~then~**:^^

~~~js
fetch('https://api.2ip.ua/geo.json?ip=')
  .then(response => response.json())
  .then(response => ...)
~~~

^^Осталось добавить код, который будет выполнен при успешном завершении второго промиса^^
^^Функция, которую мы передали в качестве аргумента второму **~then~**, получит на входе объект данных, являющийся результатом парсинга json-строки^^

^^^

^^^[Пример 8]

^^Сначала мы получим данные юзера гитхаба, а потом запишем эти данные на _https://httpbin.org_^^

~~~js
fetch('https://api.github.com/users?since=135')
  .then(response => response.json())
  .then(response => fetch('https://httpbin.org/post', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(response[5])
  }))
  .then(response => response.json())
  .then(response => console.log(response))
~~~

^^^

_____________________________________

#### ![ico-20 icon] blob()

^^Давайте посмотрим, что такое объект Blob^^

![ico-25 cap] ** 9**

^^Создадим элемент ~img~ на странице:^^

~~~js
const picture = document.body
  .appendChild(document.createElement('img'))
~~~

^^Теперь загрузим с помощью ~fetch~ изображение из сети (например, аватар пользователя github) и итерпретируем ответ сервера как объект Blob:^^

~~~js
fetch('https://avatars2.githubusercontent.com/u/46?v=4')
  .then(response => response.blob())
  .then(blob => Object.assign(picture, {
    src: URL.createObjectURL(blob),
    width: 120
  }))
~~~

^^Если вывести полученный объект в консоль, то мы увидим:^^

~~~console
► Blob(35635) { size: 35635, type: "image/jpeg" }
~~~

^^Изображение получено нами в виде объекта **~Blob~**, и теперь оно является локальным объектом, который нам нужно отобразить на странице в нашем элементе  **_img_**^^

^^Поскольку на странице могут отображаться только объекты (ресурсы), размещенные в сети и имеющие URL, основная задача - создать такой URL для объекта, уже находящегося в нашем распоряжении и являющимся локальным объектом текущей страницы^^

^^Для этого существует метод **URL.createObjectURL**^^

______________________________________________________

#### ![ico-20 icon] arrayBuffer()

Этот формат ответа сервера представляет собой строку из нулей и единиц

Объект **ArrayBuffer** не фрагментирует данные, не выделяет отдельные байты или другие кластеры

Для этого у объекта  ArrayBuffer  есть конструкторы:

| ![ico-20 green-ok] Int8Array  | ^^Для представления данных в виде последовательности восьмибитных знаковых целых чисел^^ |
| ![ico-20 green-ok] Uint8Array | ^^Для представления данных в виде последовательности восьмибитных беззнаковых целых чисел^^ |

^^Результатом работы конструкторов будет **_итерабельный объект_**^^

![ico-25 cap] **10**

~~~js
fetch('https://avatars2.githubusercontent.com/u/46?v=4')
  .then(response => response.arrayBuffer())
  .then(buffer => {
    console.log(buffer)
    console.log(new Int8Array(buffer))
    console.log(new Uint8Array(buffer))
  })
~~~

_________________________________________________________

#### ![ico-20 icon] arrayBuffer → blob

Можно получить  объект **~Blob~**  из объекта **~arrayBuffer~** с помощью конструктора  **~Blob~**, которому нужно передать объект **~arrayBuffer~**, "завернутый" в массив

![ico-25 cap] **11**

Закиньте в консоль следующий код, и посмотрите результат:

~~~~js
console.log(new Blob([
  '01101000110000100000011101011010010001000100011101011'
]))

console.log(new Blob([
  '01101000110000100000011101011010010001000100011101011',
  '01101000110000100000011101011010010001000100011101011'
]))
~~~~

![ico-25 cap] **12**

Закиньте в консоль следующий код:

~~~~js
fetch('https://avatars2.githubusercontent.com/u/46?v=4')
  .then(response => response.arrayBuffer())
  .then(buffer => console.log(new Blob([buffer])))
~~~~

![ico-25 cap] **13**

Закиньте в консоль следующий код:

~~~~js
fetch('https://api.github.com/users?since=135')
  .then(response => response.json())
  .then(users => users.map(user => fetch(user.avatar_url)))
  .then(promises => Promise.all(promises))
  .then(responses => responses.map(response => response.status === 200 && response.blob()))
  .then(promises => Promise.all(promises))
  .then(blobs => blobs.map(blob => URL.createObjectURL(blob)))
  .then(avatars => avatars.map(avatar => Object.assign(new Image(), { src: avatar })))
  .then(images => images.forEach(image => document.body.appendChild(image).width = 120))
~~~~

Объясните пошагово, что делает этот код.

________________________________________________________________________


![ico-25 cap] **14**

~~~js
fetch('https://httpbin.org/get')
  .then(response => response.json())
  .then(response => console.log(response.headers))
~~~

~~~~headers
▼ {Accept: "*/*", Accept-Encoding: "gzip, deflate, br", Accept-Language: "en-US,en;q=0.9,ru;q=0.8", Connection: "close", Host: "httpbin.org", …}
   Accept: "*/*"
   Accept-Encoding: "gzip, deflate, br"
   Accept-Language: "en-US,en;q=0.9,ru;q=0.8"
   Connection: "close"
   Host: "httpbin.org"
   Origin: "null"
   Save-Data: "on"
   User-Agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
 ► __proto__: Object
~~~~

_________________________________________________________

![ico-25 cap] **15**

Сделаем кросс-доменный запрос:

~~~~js
const request = new Request('https://httpbin.org/post', {
  method: 'POST',
  mode: 'cors',
  redirect: 'follow',
  headers: new Headers({
    'Content-Type': 'text/plain'
  }),
  body: 'Hello, students!'
})

fetch(request)
  .then(response => response.json())
  .then(response => console.log(response))
~~~~

**Ответ сервера:**

^^^[Объект Response]

~~~console
▼ Response {type: "cors", url: "https://httpbin.org/post", redirected: false, status: 200, ok: true, …}
    body: (...)
    bodyUsed: true
  ► headers: Headers {}
    ok: true
    redirected: false
    status: 200
    statusText: "OK"
    type: "cors"
    url: "https://httpbin.org/post"
  ► __proto__: Response
~~~

^^^

^^^[распарсенный как json]

~~~console
▼ {args: {…}, data: "Hello, students!", files: {…}, form: {…}, headers: {…}, …}
  ► args: {}
    data: "Hello, students!"
  ► files: {}
  ► form: {}
  ► headers: {Accept: "*/*", Accept-Encoding: "gzip, deflate, br", Accept-Language: "en-US,en;q=0.9,ru;q=0.8", Connection: "close", Content-Length: "16", …}
    json: null
    origin: "185.38.217.69"
    url: "https://httpbin.org/post"
  ► __proto__: Object
~~~

^^^

_____________________________________________________________________________________

[![ico-30 hw] **Quiz**](quiz/fetch)
