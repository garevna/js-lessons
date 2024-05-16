# ![ico-30 study] AJAX

_______________________

## ![ico-25 icon] CORS

**Cross-origin resource sharing**

^^Кросс-доменное использование ресурсов ( **CORS** ) - это рабочий проект _W3C_, который определяет, как браузер и сервер должны взаимодействовать при доступе к внешним ресурсам ( с других доменов )^^

^^Суть CORS заключается в использовании дополнительных заголовков, позволяющих браузеру и серверу "опознать" друг друга, чтобы определить, может ли запрос быть удовлетворен^^

^^**~XMLHttpRequest~** и **~Fetch API~** следуют политике одного источника^^
^^( **_same-origin policy_** )^^
^^т.е. если приложения не используют CORS-заголовки, они могут запрашивать ресурсы только с того домена, с которого были загружены^^

____________________________________

### ![ico-20 icon] Preflight request

[**_Предварительный запрос_**](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request) автоматически отправляется браузером

Этот запрос использует три заголовка:

| ![ico-20 green-ok] ^^Access-Control-Request-Method^^<br>![ico-20 green-ok] ^^Access-Control-Request-Headers^^<br>![ico-20 green-ok] ^^Origin^^ |

 ^^^[Access-Control-Request-Method]

![ico-20 pin]сообщает серверу, какой метод HTTP будет использоваться при выполнении фактического запроса
![ico-20 pin]В ответ сервер должен прислать в заголовке **~Access-Control-Allow-Methods~** список методов ( GET, POST, PUT, DELETE... ), которые он поддерживает

^^^

^^^[Access-Control-Request-Headers]

![ico-20 pin] Заголовок **~Access-Control-Allow-Headers~**, возвращаемый сервером в ответ на ~preflight request~, содержит перечень заголовков, которые можно использовать при отправке реального запроса
![ico-20 pin] При использовании пользовательского заголовка в запросе ( например, _x-authentication-token_ ) сервер должен вернуть его в заголовке **~Access-Control-Allow-Headers~**, иначе запрос будет заблокирован

^^^

^^^[Origin]

![ico-20 warn] Валидный CORS-запрос всегда содержит заголовок **Origin**
![ico-20 warn] Заголовок **Origin** добавляется браузером ( его нельзя подделать )

Значение этого заголовка описывает происхождение запроса:

| ![ico-20 pin] | ^^протокол ( http, ftp, file, about...  )^^ |
| ![ico-20 pin] | ^^домен ( например, tweet.com )^^ |
| ![ico-20 pin] | ^^порт ( включается в заголовок только в том случае, если это не порт по умолчанию, например 81 )^^ |

^^^

_______________________________________________

### ![ico-20 icon] CORS-заголовки ответа

Все CORS-заголовки **_ответа_** сервера имеют префикс «**Access-Control-**»

^^^[Access-Control-Allow-Origin]

![ico-20 warn] **required** обязательный

__________________

![ico-20 pin] этот заголовок должен быть включен во все валидные ответы CORS
![ico-20 pin] отсутствие этого заголовка приведет к сбою запроса CORS
![ico-20 pin] Значение заголовка может либо таким же, как и заголовок запроса **Origin**, либо ~ *~, что означает, что запросы разрешены из любого источника

^^^

^^^[Access-Control-Expose-Headers]

optional (необязательный)
________________________

![ico-20 pin] Во время запроса CORS можно получить доступ только к простым заголовкам ответов
![ico-20 pin] Все остальные заголовки будут недоступны
![ico-20 pin] По умолчанию клиенту открыты только 6 "простых" заголовков

| **Простые заголовки ответов:** |
| ![ico-20 green-ok] Cache-Control |
| ![ico-20 green-ok] Content-Language |
| ![ico-20 green-ok] Content-Type |
| ![ico-20 green-ok] Expires |
| ![ico-20 green-ok] Last-Modified |
| ![ico-20 green-ok] Pragma |

В заголовке ~Access-Control-Expose-Headers~ ответа сервера перечисляются заголовки ответа, которые будут доступны клиенту

^^^

^^^[Access-Control-Allow-Credentials]

optional (необязательный)

________________________

![ico-20 warn] Стандартные запросы CORS не отправляют и не устанавливают файлы **_cookie_** по умолчанию. Это нужно сделать самостоятельно:


![ico-20 pin] **XMLWttpRequest**

~~~js
var request = new XMLWttpRequest()
request.withCredentials = true
~~~

![ico-20 pin] **Fetch API**

~~~js
fetch(url, {
  ...,
  credentials: 'include'
})
~~~

![ico-20 warn] Чтобы это cработало, сервер также должен вернуть заголовок ~Access-Control-Allow-Credentials~ со значением ~true~

^^![ico-20 pin] При этом в запрос будут включены cookie-файлы удаленного домена, а удаленный домен будет писать свои cookie на клиенте^^
^^![ico-20 pin] В силу действия политики одного и того же происхождения эти cookie недоступны вашему скрипту, если он запущен с другого домена^^
^^![ico-20 pin] Они контролируются только удаленным доменом^^

^^^

^^^[Origin, Host, Referer]

![ico-20 pin] В заголовках ответа сервера ( объект **~headers~** ) есть свойство **~Host~** ( _куда был направлен запрос_ ) и свойство **~Origin~** ( домен, _с которого пришел запрос_ )
![ico-20 pin] Свойство **~Referer~** указывает _полный адрес_, с которого пришел запрос
![ico-20 pin] ^^Если сделать запрос с пустой страницы ( не имеющей адреса в сети ), то в заголовках ответа сервера свойство **~Origin~** будет иметь значение ~null~, а свойство **~Referer~**  будет отсутствовать^^

^^^

__________________________________

## ![ico-25 icon] Proxy for CORS request

Попробуйте запустить следующий код в консоли пустой вкладки (about:blank)

~~~js
fetch('http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg')
  .then(response => response.text())
  .then(response => console.log(response))
~~~

![ico-20 error] Ответ будет заблокирован браузером

~~~console
Access to fetch at 'http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
~~~

Во вкладке **Network** отладчика можно посмотреть заголовки ответа:

~~~console
▼ Response Headers
    Accept-Ranges: bytes
    Cache-Control: max-age=604800
    Content-Length: 127387
    Content-Type: image/jpeg
    Date: Tue, 19 Mar 2019 08:30:36 GMT
    ETag: "56ea8363-1f19b"
    Expires: Tue, 26 Mar 2019 08:30:36 GMT
    Last-Modified: Thu, 17 Mar 2016 10:13:55 GMT
    Server: nginx/1.12.2
~~~

Как мы видим, ~Access-Control-Allow-Origin~ отсутствует, что и становится причиной блокирования браузером ответа

Теперь воспользуемся готовым прокси-сервером ![ico-20 smile]

Для этого добавим в запросе url прокси: **~https://cors-anywhere.herokuapp.com/~**

~~~js
fetch('https://cors-anywhere.herokuapp.com/http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg')
  .then(response => response.blob())
  .then(blob => document.body.appendChild(document.createElement('img')).src = URL.createObjectURL(blob))
~~~

Теперь наш запрос благополучно проходит, на странице появляется картинка, а во вкладке **Network** можно увидеть такие заголовки ответа:

~~~~console
▼ Response Headers
    Accept-Ranges: bytes
    Access-Control-Allow-Origin: *
    Access-Control-Expose-Headers: server,date,content-type,content-length,last-modified,connection,etag,expires,cache-
    control,accept-ranges,x-final-url,access-control-allow-origin
    Cache-Control: max-age=604800
    Connection: keep-alive
    Content-Length: 127387
    Content-Type: image/jpeg
    Date: Tue, 19 Mar 2019 08:31:09 GMT
    Etag: "56ea8363-1f19b"
    Expires: Tue, 26 Mar 2019 08:31:09 GMT
    Last-Modified: Thu, 17 Mar 2016 10:13:55 GMT
    Server: nginx/1.12.2
    Via: 1.1 vegur
    X-Final-Url: http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg
    X-Request-Url: http://humor.fm/uploads/posts/2016-03/17/umndflr0wjc.jpg
~~~~

Прокси-сервер добавил необходимые заголовки к ответу, и браузер вернул нам ответ - файл изображения получен ![ico-20 smile]
