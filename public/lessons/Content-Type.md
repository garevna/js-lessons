# ![ico-30 study] Content-Type

Этот заголовок определяет тип пересылаемого контента

**~"Content-Type"  :  "тип  /  подтип  [ ; параметр ]"~**

^^Тип используется для объявления общего типа данных, а подтип определяет специальный формат для данных этого типа^^

^^^[Типы контента]

![ico-20 green-ok] application
![ico-20 green-ok] audio
![ico-20 green-ok] image
![ico-20 green-ok] message
![ico-20 green-ok] multipart
![ico-20 green-ok] text
![ico-20 green-ok] video

_______________________

^^**~multipart~**  - содержимое состоит из нескольких частей, включающих данные различных типов^^

^^^

![ico-20 warn] ^^Для незарегестрированного типа содежимого имя должно начинаться с "X-"^^

^^^[Примеры значений Content-Type]

^^• **application/msword**^^
^^• **application/pdf**^^
^^• **application/json**^^
^^• **image/gif**^^
^^• **image/jpeg**^^
^^• **image/png**^^
^^• **video/mpeg**^^
^^• **text/plain**^^
^^• **text/html**^^
^^• **text/html**; _charset=utf-8_^^
^^• **multipart/form-data**^^
^^• **multipart/mixed;** boundary="&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;"^^

___________________

^^( в последнем примере строка "&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;" указывается как разделитель для различных фрагментов контента^^
^^В начале каждого фрагмента может быть задана своя строка с полем "Content-Type" )^^
^^**_boundary_** ( граница ) — это последовательность байтов, которая не должна встречаться внутри пересылаемого контента^^

^^^

________________________________________

## ![ico-25 icon] Примеры POST-запросов

Далее мы будем использовать фейковый сервер для апробирования методов  **~XMLHttpRequest()~**

[![ico-25 link] https://httpbin.org](https://httpbin.org)

^^Этот ресурс не требует аутентификации, он предназначен исключительно для целей тестирования^^

Объявим функцию **~postData~**:

~~~js
function postData (data, contentType = 'application/json') {
  var request = new XMLHttpRequest()
  request.open('POST', 'https://httpbin.org/post', true)

  request.setRequestHeader('Content-Type', contentType)

  request.onreadystatechange = function () {
    this.readyState === 4
      ? this.status === 200
        ? console.log(this.responseText)
        : console.error('Request failed')
      : null
  }
  request.send(data)
}
~~~

и будем вызывать ее с различными значениями аргументов.

___________________

### ![ico-25 cap] application/x-www-form-urlencoded

~~~js
postData('name=garevna&speciality=frontEnd', 'application/x-www-form-urlencoded')
~~~

Результат в консоли:

~~~console
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "name": "garevna",
    "speciality": "frontEnd"
  },
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en,uk;q=0.9,en-US;q=0.8,ru;q=0.7",
    "Content-Length": "32",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "Origin": "null",
    ...
  },
  "json": null,
  "origin": "109.86.227.94",
  "url": "https://httpbin.org/post"
}
~~~

___________________

### ![ico-25 cap] application/json

~~~js
postData(JSON.stringify({
  name: 'Gregory',
  age: 48,
  speciality: 'dev'
}))
~~~

Результат в консоли:

~~~console
{
  "args": {},
  "data": "{\"name\":\"Gregory\",\"age\":48,\"speciality\":\"dev\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en,uk;q=0.9,en-US;q=0.8,ru;q=0.7",
    "Content-Length": "46",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "Origin": "null",
    ...
  },
  "json": {
    "age": 48,
    "name": "Gregory",
    "speciality": "dev"
  },
  "origin": "109.86.227.94",
  "url": "https://httpbin.org/post"
}
~~~
_______________________________


### ![ico-25 cap] text/plain

~~~js
var text = `The weird text generator enables you to convert your normal text into weird text by using different unusual Unicode symbols.
It generates weird text that resembles the normal characters or numbers of the alphabet in real time.`

postData(text, 'text/plain')
~~~

Результат в консоли:

~~~console
{
  "args": {},
  "data": "The weird text generator enables you to convert your normal text into weird text by using different unusual Unicode symbols.\nIt generates weird text that resembles the normal characters or numbers of the alphabet in real time.",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en,uk;q=0.9,en-US;q=0.8,ru;q=0.7",
    "Content-Length": "226",
    "Content-Type": "text/plain",
    "Host": "httpbin.org",
    "Origin": "null",
    ...
  },
  "json": null,
  "origin": "109.86.227.94",
  "url": "https://httpbin.org/post"
}
~~~
