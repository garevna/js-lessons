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

Далее мы будем использовать фейковые серверы для апробирования методов  **~XMLHttpRequest()~**

[![ico-25 link] https://httpbin.org](https://httpbin.org)
[![ico-25 toilet] http://ptsv2.com](http://ptsv2.com)

^^Эти ресурсы не требуют аутентификации, они предназначены исключительно для целей тестирования^^

### ![ico-25 cap] application/x-www-form-urlencoded

~~~~js
var request = new XMLHttpRequest()
request.open('POST', 'https://httpbin.org/post', true)

request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

request.onreadystatechange = function () {
  this.readyState === 4
    ? this.status === 200
      ? console.log(this.responseText)
      : console.error('Request failed')
    : null
   }
}
request.send('name=garevna&speciality=frontEnd')
~~~~

Результат в консоли:

~~~~console
success
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
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,ru;q=0.8",
    "Connection": "close",
    "Content-Length": "32",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "Origin": "null",
    "Save-Data": "on",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
  },
  "json": null,
  "origin": "185.38.217.69",
  "url": "https://httpbin.org/post"
}
~~~~

_______________________________


![ico-50 toilet]
Прежде, чем приступить к выполнению следующих упражнений, создайте свой [![ico-20 toilet]](http://ptsv2.com)
^^![ico-20 warn] Вместо **_garevna_** в своих запросах вставляйте название своего ![ico-20 toilet]^^
^^![ico-20 warn] Дальнейший код  нужно выполнять в консоли того же окна, где будет открыт ![ico-20 toilet]^^

____________________________________

![ico-25 error] При несоответствии протокола  ваш запрос будет отклонен:

~~~console
Mixed Content:
The page at ... was loaded over HTTPS,
but requested an insecure XMLHttpRequest endpoint
'http://ptsv2.com/t/.../post'
This request has been blocked;
the content must be served over HTTPS
~~~

![ico-25 error] Запрос из консоли любого другого ресурса с протоколом ~http~ будет кросс-доменным, поэтому тоже будет заблокирован браузером ( политика безопасности )

~~~console
Failed to load http://ptsv2.com/t/.../post:
No 'Access-Control-Allow-Origin' header
is present on the requested resource
Origin ... is therefore not allowed access
~~~

___________________________________________

### ![ico-25 cap] application/x-www-form-urlencoded

~~~~js
var transport = new XMLHttpRequest()
transport.open('POST', 'http://ptsv2.com/t/garevna/post', true)

transport.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

transport.onreadystatechange = function () {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    console.log('success')
    console.log(this.responseText)
  }
}
transport.send('name=garevna&speciality=frontEnd')
~~~~

_____________________________

### ![ico-25 cap] application/json

~~~~js
var transport = new XMLHttpRequest()
transport.open('POST', 'http://ptsv2.com/t/garevna/post', true)

transport.setRequestHeader('Content-Type', 'application/json')

transport.onreadystatechange = function () {
  this.readyState === XMLHttpRequest.DONE && this.status === 200
    ? console.log('success')
    : null
}
transport.send(JSON.stringify({
  title: 'Show',
  text: 'must go on'
}))
~~~~

__________________________________________

### ![ico-25 cap] text/plain

~~~~js
var transport = new XMLHttpRequest()
transport.open('POST', 'http://ptsv2.com/t/garevna/post', true)

transport.setRequestHeader('Content-Type', 'text/plain')

transport.onreadystatechange = function () {
    this.readyState === XMLHttpRequest.DONE && this.status === 200
      ? console.log('success')
      : null
  }
}
transport.send('Show must go on')
~~~~
