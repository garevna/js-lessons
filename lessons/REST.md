# ![ico-30 study] REST API

**Representational State Transfer**

__________________________________

Обычно URL указывает на _ресурс_

В архитектуре **REST** URL указывает на ![ico-20 warn] _операцию с ресурсом_

Для каждой операции с ресурсом (~GET~, ~POST~, ~PUT~, ~PATCH~, ~DELETE~) устанавливается **endpoint**

![ico-25 cap] **POST**: ^^http://ptsv2.com/t/garevna/post^^
![ico-25 cap] **GET в формате JSON-строки**: ^^http://ptsv2.com/t/garevna/d/940001/json^^
![ico-25 cap] **GET в текстовом формате**: ^^http://ptsv2.com/t/garevna/d/940001/text^^

________________________________________

## ![ico-25 icon] Автор концепции

@@@@

![](illustrations/filding.png)
**Roy Thomas Fielding**<br><br>^^DOCTOR OF PHILOSOPHY<br/>_in Information and Computer Science^^_<br/>[^^DISSERTATION^^](external/fielding)

@@@@

______________________________

## ![ico-25 icon] HATEOAS

**_Hypermedia As The Engine Of Application State_** (**HATEOAS**) — это базовая концепция REST
^^(коренное отличие архитектуры **REST** от других сетевых архитектур)^^

Концепция **_HATEOAS_** заключается в том, что север не должен быть "прикован" к клиентам гиперссылками

Сервер работает с некими URL-подобными ~endpoint~-ами, которые информируют серверный скрипт о том, чего хочет клиент, но никак не привязаны к расположению ресурса и серверным технологиям работы с данными

Клиентский скрипт располагает списком допустимых ~endpoint~-ов
Клиентский скрипт знает, что он может получить, "дернув" за тот или другой ~endpoint~

Для него  ~endpoint~-ы - это перечень услуг, которые можно получить, если воспользоваться тем или иным ~endpoint~ из списка валидных (в рамках данного API) ~endpoint~-ов

Ура, сервер свободен - он может расширяться, развивать свой функционал, не нарушая при этом сложившиеся "добрые отношения" с клиентами ![ico-20 smile]

Ресурсы могут быть перемещены в другое место - доступ к ним для клиента останется неизменным, поскольку ~endpoint~ не изменится

Сервер может изменить структуру баз данных, технологию доступа к данным - клиент от этого не пострадает, для него будут работать все те же ~endpoint~-ы

___________________________________

^^**~Hypermedia~** — это способ структурирования информации и доступа к её элементам с помощью _~гиперсвязей~_^^

_____________________________________

## ![ico-25 icon] Понятие endpoint

^^^[endpoint]

**~endpoint~** — точка взаимодействия клиента с API

^^URI не содержат никакой информации о том, где размещен ресурс^^
^^клиент не знает ( и не должен знать ) URL ресурса^^
^^если ресурс будет перемещен на другой сервер, клиент этого не узнает^^
^^он будет по-прежнему работать с ресурсом по тем же URI^^
^^каждая такая ссылка является **~endpoint~**^^
^^**~endpoint~** - это некая операция с ресурсом^^

![ico-20 warn] Итак, API предоставляет клиенту  ~endpoints~  для доступа к ресурсу
![ico-20 warn] API решает, какие операции может выполнять клиент с ресурсом
![ico-20 warn] Для каждой операции есть свой endpoint

^^^

Примером может служить API **picsum.photos**
Эндпойнты у этого API позволяют точно указать требуемый размер изображения

••https://picsum.photos/ширина/высота••

Для получения случайного изображения можно больше ничего не указывать,
а можно добавить строку запроса **_?random_**

••https://picsum.photos/ширина/высота?random••

◘◘![ico-20 cap] ** 1**◘◘

~~~js
document.body.style.margin = 0

const img = document.body.appendChild(new Image())
img.src = 'https://picsum.photos/900/400?random'
~~~

Можно использовать эндпойнты с указанием числового **id** изображения
Тогда эндпойнт выглядит так:

••https://picsum.photos/id/число/ширина/высота••

◘◘![ico-20 cap] ** 2**◘◘

~~~js
const img = document.body.appendChild(new Image())
img.src = 'https://picsum.photos/id/356/900/500'
document.body.style.margin = 0

const showImage = function () {
  const w = window.innerWidth,
        h = window.innerHeight,
        num = Math.round(Math.random() * 900)

  arguments[0].src = `https://picsum.photos/id/${num}/${w}/${h}`

  setTimeout(() => requestAnimationFrame(showImage), 1000)
}.bind(null, img)

showImage()
~~~

{{{REST-endpoints.js}}}

___________________________________

Еще один пример REST API

Зарегистрируйтесь на [%%%weather API%%%](https://weatherstack.com/)

Это нужно для получения индивидуального ключа доступа **_access_key_**

После чего вы сможете делать запросы к API по следующему эндпойнту:

~~~console
http://api.weatherstack.com/current?access_key=xxxxxxxx&query=Kharkiv
~~~

@@@@
Ответ вы будете получать в формате JSON<br>Даже с иконками
![](illustrations/REST-01.webp)
@@@@
___________________________________

## ![ico-25 icon] endpoints для самостоятельной работы с REST API

### ![ico-20 icon] GET

Получить всех юзеров из базы данных **users**:

••https://garevna-rest-api.glitch.me/users/all••

~~~js
fetch('https://garevna-rest-api.glitch.me/users/all')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

Ответ сервера:

~~~console
▼ {451789: {…}, 789451: {…}, begemot: {…}}
  ► 451789: {name: "Feodor", age: 18, speciality: "hobbit"}
  ► 789451: {name: "Teodor", age: 25, hobby: "fly", speciality: "teacher"}
  ► begemot: {name: "Stephan", age: 36, speciality: "doctor"}
  ► __proto__: Object
~~~

_______________________

Получить юзера по ~id === begemot~:

••https://garevna-rest-api.glitch.me/user/begemot••

~~~js
fetch('https://garevna-rest-api.glitch.me/user/begemot')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

Ответ сервера:

~~~console
▼ {name: "Stephan", age: 36, speciality: "doctor"}
    age: 36
    name: "Stephan"
    speciality: "doctor"
  ► __proto__: Object
~~~

_______________________________

**Поиск данных по значению одного из ключей**

Например, для получения всех юзеров с именем _Stephan_:

••https://garevna-rest-api.glitch.me/users/?name=Stephan••

~~~js
fetch('https://garevna-rest-api.glitch.me/users/?name=Stephan')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

Ответ сервера будет массивом:

~~~console
▼ [{…}]
  ► 0: {name: "Stephan", age: 36, speciality: "doctor"}
    length: 1
  ► __proto__: Array(0)
~~~

если нужно получить из базы данных **users** всех юзеров в возрасте 18 лет:

••https://garevna-rest-api.glitch.me/users?age=&#94;18&#94;••

для передачи числа используем **~_&#94;число&#94;_~**

~~~js
fetch('https://garevna-rest-api.glitch.me/users?age=^18^')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

Ответ сервера будет массивом:

~~~console
▼ [{…}]
  ► 0: {name: "Feodor", age: 18, speciality: "hobbit"}
    length: 1
  ► __proto__: Array(0)
~~~

___________________________________

### ![ico-20 icon] POST | PUT | PATCH | DELETE

••https://garevna-rest-api.glitch.me/user/_id_••

◘◘**POST**◘◘

~~~js
fetch('https://garevna-rest-api.glitch.me/user/987145', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Mary',
    age: 19,
    speciality: 'developer'
  })
})
  .then(response => response.json())
  .then(response => console.log(response))
~~~

Ответ сервера:

~~~console
► {name: "Mary", age: 19, speciality: "developer"}
~~~

Если вы попытаетесь записать методом POST уже существующую запись, то ответ сервера будет:

~~~console
► {error: 475, message: "987145 allready exist"}
~~~

___________________________________

◘◘**PUT**◘◘

~~~js
fetch('https://garevna-rest-api.glitch.me/user/987145', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify ({
    name: 'Helen',
    age: 20,
    speciality: 'florist'
  })
})
  .then(response => response.json())
  .then(response => console.log(response))
~~~

Ответ сервера:

~~~console
► {name: "Helen", age: 20, speciality: "florist"}
~~~

___________________________________

◘◘**PATCH**◘◘

~~~js
fetch('https://garevna-rest-api.glitch.me/user/987145', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    hobby: 'flowers'
  })
})
  .then(response => response.json())
  .then(response => console.log(response))
~~~

Ответ сервера:

~~~console
► {name: "Helen", age: 20, speciality: "florist", hobby: "flowers"}
~~~

___________________________________

◘◘**DELETE**◘◘

~~~js
fetch('https://json-server-with-router.glitch.me/user/garevna', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => console.log(response.status))
~~~

Ответ сервера: **~200~**
