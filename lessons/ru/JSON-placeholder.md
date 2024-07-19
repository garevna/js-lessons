## ![ico-30 hw] json-placeholder

Для того, чтобы понять принцип взаимодействия с ~REST API~, воспользуемся бесплатным сервисом **~JSONPlaceholder~**

![](https://garevna.github.io/a-level-js-lessons/src/icons/json-placeholder-logo.png)

[JSONPlaceholder](https://jsonplaceholder.typicode.com/)

Здесь нам не нужна авторизация, чтобы получить доступ к данным

Но, естественно, мы имеем доступ только на чтение данных

![ico-20 warn] Методы ~POST~, ~PUT~, ~PATCH~, ~DELETE~ только имитируются, фактически мы не можем вносить изменения

_____________________________

Перечень **~endpoint~** ( доступных операций с ресурсами )

^^^[JSONPlaceholder endpoints]

![](https://lh4.googleusercontent.com/kLZ2AUHmxj_tGElT44CKZEDXYqZ9fKOUbciuV5XDf-tRnKiPT0njS1rJnurGUEI7QGfFLNL6UYRa-noaqWmZ1QcUG_7bKBAYWMSLntBIcA-Kop3T3W-y4w1e-moZvWG-ndn0IPJwtWAOmlE)

^^^
_________________________________________________

Например, чтобы получить с фейкового сервера все посты, мы должны использовать ссылку:

~https://jsonplaceholder.typicode.com/posts~

При этом нас не волнуют детали реализации обработки нашего запроса на стороне сервера

Сервер также "свободен" в выборе или изменении способа обработки запроса и фактического размещения данных

Нас связывают с сервером только условные ссылки ( ~endpoints~ ), которые понятны серверу ( чего мы хотим )

Где конкретно лежат нужные нам данные - это не наше дело, как сервер будет их обрабатывать - не наше дело

то есть есть некое соглашение, по которому и взаимодействуют две стороны: клиент и сервер

____________________________________________

### ![ico-25 cap] curl

Получим все комментарии к первому посту с помощью утилиты ~curl~

![ico-20 bash] Выполним консольную команду
~~~console
$ curl https://jsonplaceholder.typicode.com/comments?postId=1
~~~

![](https://lh6.googleusercontent.com/RRQtfUSawytMqnSDIF4k8wpz1oDzkM8-RxWqBR3XN5PR18HS3jOfGfAyNVYe587xnJL0NoPfy7V1MbovDbOpPuJ0nFj0O-LZinvj2dmdBb1yLKFtRwMcKf7tXimuD0nEB0ZECxD7oPr7liU)

_____________________________________________

### ![ico-25 cap] fetch

Получим все комментарии к первому посту прямо в консоли браузера, воспользовавшись методом ~fetch~

~~~js
fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
  .then(response => response.json())
  .then(json => console.log(json))
~~~

![](https://lh6.googleusercontent.com/tQof5aM48ME-v6g1l-4gkfE2v2WYqinFGYyarEsCdKNvAxfQLjY02h9VffWTvVqk1QlkMxpy14ZNhbCTnVxTzIdMb-5-CYM4zgEVzXQUdodp0UUFx5SMozubZ-1kmTRdly-mS03cSBVGDQ8)
