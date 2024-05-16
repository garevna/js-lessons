# ![ico-30 hw] Fake chat

_____________________________

## ![ico-25 icon] db.json

Внесем некоторые изменения в базу данных **db.json**

![ico-20 green-ok] **lastUpdate**

Добавим запись **_~lastUpdate~_** с двумя полями:

~~~js
"lastUpdate": {
  "data": "26.10.2018",
  "time": "12:38:01"
}
~~~

^^Мы будем использовать эти данные для обновления чата^^
^^после того, как данные в **~db.json~**  были обновлены^^
^^(операции ~POST~ &#124; ~PUT~ &#124; ~DELETE~)^^

![ico-20 green-ok] **posts**

В каждую запись базы данных **~posts~** добавим свойства **~date~** и **~time~**

~~~js
"posts": [
  {
    "id": 0,
    "date": "05.08.2018",
    "time": "10:30:15",
    "userId": 2,
    "title": "My first post here",
    "body": "It's really wonder!"
  },
  ...
}
~~~

__________________________________________

## ![ico-25 icon] json-server

![ico-25 bash] Запускаем  json-server

••son-server &#45;&#45;watch db.json••

Получаем **endpoints**:

~~~console

Resources
        http://localhost:3000/lastUpdate
        http://localhost:3000/users
        http://localhost:3000/posts
        http://localhost:3000/comments

Home
        http://localhost:3000
        
~~~

__________________________

• Открываем в браузере страницу **http://localhost:3000**
• заходим в _Chrome DevTools_
• Создаем  snippet

____________________

## ![ico-25 icon] Переменные и функции

#### ![ico-20 green-ok] lastUpdate

Объявляем переменную **_~lastUpdate~_**, в которой будем хранить дату и время модификации загруженных данных

~~~js
let lastUpdate
~~~

#### ![ico-20 green-ok] getData

Объявляем переменную **_~getData~_**, в которой будет ссылка на функцию, загружающую данные с сервера по имени ресурса ( **_~lastUpdate~_**, **_~users~_**, **_~posts~_**, **_~comments~_** )

~~~js
const getData = function (ref) {
  const promise = callback => fetch('http://localhost:3000/' + ref)
    .then(response => response.json())
    .then(response => callback(response))

  return new Promise(resolve => promise(resolve))
}
~~~

#### ![ico-20 green-ok] appElem

Объявляем переменную **_~appElem~_**
В этой переменной будет ссылка на анонимную стрелочную функцию
Функция получает в первом аргументе имя тега **_~tagName~_**,
и создает элемент DOM
Второй ( опциональный ) аргумент **_~container~_** может содержать ссылку на элемент-контейнер, куда нужно вставить созданный элемент
Если такой аргумент отсутствует, то функция вставляет элемент в _~document.body~_

~~~js
const addElem = (tagName, container = document.body) => container.appendChild(document.createElement(tagName))
~~~

#### ![ico-20 green-ok] chat

ссылка на элемент DOM, который будет контейнером для сообщений чата

#### ![ico-20 green-ok] posts & users

В переменные ~posts~ и ~users~ будем получать данные из базы данных на сервере

#### ![ico-20 green-ok] currentUser

объект активного пользователя чата (от лица которого мы будем писать в чат)

~~~js
let currentUser
~~~

#### ![ico-20 green-ok] chatInput

Создаем элемент ~input~ (поле для ввода текста сообщения) и стилизуем элемент:

~~~js
const chatInput = Object.assign(addElem('input'), {
  style: `
    position: fixed;
    left: 20px;
    width: 80%;
    bottom: 10px;
    border: inset 1px;
    background-color: #af9;
    overflow: auto;
  `
})
~~~

#### ![ico-20 green-ok] buildChat

Ссылка на функцию, создающую элемент section (это будет чат)

~~~js
const buildChat = function () {
  return Object.assign(addElem('section'), {
    style: `
      position: fixed;
      top: 30px;
      left: 20px;
      right: 20px;
      bottom: 70px;
      border: inset 1px;
      overflow: auto;
      padding: 10px;
    `,
    innerHTML: ''
  })
}

const chat = buildChat()
~~~

#### ![ico-20 green-ok] initChat

После вызова функции **~buildChat~** в переменной **~chat~** будет ссылка на элемент **~section~**, который будет контейнером для сообщений в чате

Асинхронная функция **~initChat~** будет итерировать массив **~post~** с помощью метода **~forEach~**
заполнять контейнер **~chat~** данными из массива **~post~**
(данные к моменту вызова функции должны быть уже получены от сервера)

В первую очередь контейнер **~chat~** освобождается: ~chat.innerHTML = ''~

На каждой итерации по значению **~post.userId~** находится соответствующий элемент массива **~users~** (с помощью метода  **~filter~**)

На каждой итерации создается элемент ~div~, который будет контейнером для очередной записи из массива **~post~**

Для создания новых элементов DOM  и вставки их на страницу используем асинхронную функцию **~appElem~**

~~~~js
const initChat = async function () {
  posts.forEach(post => {
    const user = users.find(user => user.id === post.userId)
    chat.appendChild((function () {
      const cont = addElem('div')
      const ava = Object.assign(addElem('img', cont), {
        src: user.photoURL,
        width: 40,
        title: `${user.name} ${user.lastName}`
      })

      addElem('span', cont).innerHTML = ` <small> ${post.date} ${post.time}</small>`
      addElem('p', cont).innerText = post.body
      return cont
    })(user))
  })
}
~~~~

__________________________

#### ![ico-20 green-ok] updateChat

Объявляем переменную **~updateChat~**, в которую помещаем ссылку на асинхронную анонимную функцию **~updateChat~**

![ico-20 pin] Используем функцию **~getData~** для получения даты и времени последнего обновления базы данных
в переменную **~updated~**,
используя ключевое слово **_~await~_**, чтобы дождаться результата асинхронной операции

![ico-20 pin] Сравниваем дату и время обновления загруженных данных
с датой и временем последнего обновления базы данных
Если загруженные данные актуальны
( после их загрузки обновлений базы данных не было ),
то завершаем выполнение функции **~updateChat~** ( *~return~* )

![ico-20 pin] В противном случае формируем массив промисов:

~~~js
[getData('users'), getData('posts')]
~~~

и передаем его методу **~Promise.all~**,
который также вызываем с ключевым словом **_~await~_**

![ico-20 pin] Когда **_~Promise.all~_**  будет разрешен, проверяем, есть ли значение
у объявленной ранее переменной **~currentUser~**
( пользователь, от лица которого будут добавляться сообщения в чат )
Если активный пользователь еще не определен,
выбираем его случайным образом из числа всех зарегистрированных пользователей ( **~users~** )

![ico-20 pin] Вызываем функцию **~initChat ()~**

~~~~js
const updateChat = async function () {
  const updated = await getData('lastUpdate')

  if (lastUpdate && updated.data === lastUpdate.data && updated.time === lastUpdate.time) return

  const scrollValue = chat.scrollTop

  const [users, posts] = await Promise.all([getData('users') , getData('posts')])

  if (!currentUser) {
    currentUser = users[Math.floor(Math.random() * users.length)]
    currentUserId = currentUser.id
  }

  initChat()
  chat.scrollTop = scrollValue
}
~~~~

Свойство **_~scrollTop~_** можно использовать для управления прокруткой чата
Если установить

~~~js
chat.scrollTop = chat.offsetTop
~~~

то элемент **~chat~** будет прокручен до конца
(мы будем видеть последние сообщения в чате)


_______________________________________________

## ![ico-25 icon] Запуск

• вызваем **~buildChat()~**, чтобы создать контейнер для чата
• вызваем **~updateChat()~**, чтобы заполнить контейнер данными
• устанавливаем интервал обновления чата (~setInterval~)

^^через заданные интервалы времени мы будем вызывать ~updateChat()~,^^
^^чтобы проверить, было ли за это время обновление базы данных на серевере,^^
^^и если да - обновлять содержимое чата на клиенте^^

• вешаем обработчика события **change** элемента **chatInput**
^^если клиент введет сообщение, это сообщение нужно отправить на сервер для добавления в базу данных^^

Итак:

~~~~js
const chat = buildChat()

updateChat()

setTimeout(() => { chat.scrollTop = chat.scrollHeight }, 100)

const interval = setInterval(() => updateChat(), 1000)

chatInput.onchange = function (event) {
  const postTime = new Date().toLocaleString().split(', ')
  fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify({
      date: postTime[0],
      time: postTime[1],
      userId: currentUserId,
      body: event.target.value
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
}
~~~~

___________________________

## ![ico-20 file] Полный код сниппета

~~~~js
document.body.style = `
  font-family: monospace, Arial;
  font-size: 14px;
`

let lastUpdate

const getData = function (ref) {
  const promise = callback => fetch('http://localhost:3000/' + ref)
    .then(response => response.json())
    .then(response => callback(response))

  return new Promise(resolve => promise(resolve))
}

const addElem = (tagName, container = document.body) => container.appendChild(document.createElement(tagName))

// let posts
// let users

let currentUser

const chatInput = Object.assign(addElem('input'), {
  style: `
    position: fixed;
    left: 20px;
    width: 80%;
    bottom: 10px;
    border: inset 1px;
    background-color: #af9;
    overflow: auto;
  `
})

const buildChat = function () {
  return Object.assign(addElem('section'), {
    style: `
      position: fixed;
      top: 30px;
      left: 20px;
      right: 20px;
      bottom: 70px;
      border: inset 1px;
      overflow: auto;
      padding: 10px;
    `,
    innerHTML: ''
  })
}

const updateChat = async function () {
  const updated = await getData('lastUpdate')

  if (lastUpdate && updated.data === lastUpdate.data && updated.time === lastUpdate.time) return

  const scrollValue = chat.scrollTop

  const [users, posts] = await Promise.all([getData('users') , getData('posts')])
  
  console.log(users)
  console.log(posts)

  if (!currentUser) {
    currentUser = users[Math.floor(Math.random() * users.length)]
    currentUserId = currentUser.id
  }

  initChat()
  chat.scrollTop = scrollValue
}

const initChat = async function () {
  posts.forEach(post => {
    const user = users.find(user => user.id === post.userId)
    chat.appendChild((function () {
      const cont = addElem('div')
      const ava = Object.assign(addElem('img', cont), {
        src: user.photoURL,
        width: 40,
        title: `${user.name} ${user.lastName}`
      })

      addElem('span', cont).innerHTML = ` <small> ${post.date} ${post.time}</small>`
      addElem('p', cont).innerText = post.body
      return cont
    })(user))
  })
}

const chat = buildChat()

updateChat ()

setTimeout(() => { chat.scrollTop = chat.scrollHeight }, 100)

const interval = setInterval(() => updateChat(), 500)

chatInput.onchange = function (event) {
  const postTime = new Date().toLocaleString().split(', ')
  fetch('http://localhost:3000/lastUpdate', {
    method: 'POST',
    body: JSON.stringify({
      data: postTime[0],
      time: postTime[1]
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify ({
      date: postTime [0],
      time: postTime [1],
      userId: currentUser.id,
      body: event.target.value
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
}
~~~~
