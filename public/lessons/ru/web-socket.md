# ![ico-30 study] WebSocket

**WebSockets API** позволяет веб-приложениям использовать протокол ~WebSockets~ для двусторонней связи с удаленным хостом

^^~WebSockets~, как и ~Local Storage~ и ~Geolocation~, изначально был частью спецификации HTML5^^

^^Cогласно спецификации протокола,^^
^^соединение ~WebSocket~ стартует как HTTP-соединение,^^
^^гарантируя полную обратную совместимость с миром до WebSocket^^

Переключение протокола с ~HTTP~ на ~WebSocket~ называется рукопожатием ( _handshake_ ) ~WebSocket~

При отправке запроса на сервер браузер с помощью заголовков **~Connection~** и **~Upgrade~** сообщает, что он хочет переключиться с протокола ~HTTP~ на ~WebSocket~:

^^^[Request Headers]

Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9,ru;q=0.8
Cache-Control: no-cache
Connection: Upgrade
Host: echo.websocket.org
Origin: null
Pragma: no-cache
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Key: FWRPxaoGQhQaeqg1eRPHTw==
Sec-WebSocket-Version: 13
Upgrade: websocket
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36

^^^

Если сервер поддерживает протокол ~WebSocket~, он соглашается на переключение протокола через те же заголовки **~Connection~** и **~Upgrade~**

^^^[Response Headers]

Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: content-type
Access-Control-Allow-Headers: authorization
Access-Control-Allow-Headers: x-websocket-extensions
Access-Control-Allow-Headers: x-websocket-version
Access-Control-Allow-Headers: x-websocket-protocol
Access-Control-Allow-Origin: null
Connection: Upgrade
Date: Mon, 31 Dec 2018 19:53:07 GMT
Sec-WebSocket-Accept: OQbuqh0sOBKbPsVMFPKNpI75N8I=
Server: Kaazing Gateway
Upgrade: websocket

^^^

В этот момент HTTP-соединение разрывается и заменяется ~WebSocket~-соединением через то же TCP/IP

~WebSocket~-соединение использует те же порты по умолчанию, что и HTTP (~80~) и HTTPS (~443~)

_____________________________________________

## ![ico-25 hw] Упражнение 1


<img src="https://www.piesocket.com/blog/wp-content/uploads/2021/12/websocket-for-free.png" height="150"/> Воспользуемся готовым WebSocket-сервером **~https://www.piesocket.com/~**, который возвращает назад сообщение, отправленное ему с клиента

Современные браузеры поддерживают протокол ~WebSocket~, поэтому создание объекта ~WebSocket~-соединения не представляет проблемы - это просто вызов конструктора

Создадим ~WebSocket~-соединение прямо в консоли браузера:

~~~js
const apiKey = 'oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm'

const websocket = new WebSocket(`wss://demo.piesocket.com/v3/channel_1?api_key=${apiKey}`)
~~~

При вызове конструктора **WebSocket** необходимо передать ему обязательный аргумент 


••протокол://домен:порт••


• протокол может быть ~ws~ или ~wss~
• домен будет ~demo.piesocket.com~ (точнее говоря, это субдомен demo домена piesocket.com)
• порт мы оставляем на усмотрение сервера

(Заметим, что этот API требует наличия ключа apiKey, который легко получить, зарегистрировавшись на сайте ~https://www.piesocket.com/~)

Созданный с помощью конструктора **WebSocket** экземпляр **_~websocket~_** 
имеет свойства ~onopen~, ~onmessage~, ~onclose~ и ~onerror~, 
а также методы ~send()~ и ~close()~, 
и всем этим арсеналом мы сейчас воспользуемся:

◘◘![ico-20 cap]◘◘

~~~js
const apiKey = 'oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm'

const websocket = new WebSocket(`wss://demo.piesocket.com/v3/channel_1?api_key=${apiKey}`)

websocket.onopen = function (event) {
  console.log('CONNECTED')
  websocket.send('Happy New Year!')
}

websocket.onclose = function (event) {
  console.log('DISCONNECTED')
}

websocket.onmessage = function (event) {
  console.log(event.data)
  websocket.close()
}

websocket.onerror = function (event) {
  console.error(`ERROR: ${event.data}`)
}
~~~

◘◘Результат в консоли:◘◘

~~~console
CONNECTED
Happy New Year!
DISCONNECTED
~~~

_____________________________________________

## ![ico-25 hw] Упражнение 2

Для получения некоторого экспириенса с веб-сокетами нам придется познакомиться с серверным JS

Не забудьте создать отдельную папку для наших экспериментов и перейти в нее

Итак, платформа **~Node.js~** станет основой нашего приложения

В **~Node.js~** нет встроенной поддержки ~WebSocket~, поэтому установим плагин **~ws~**

### ![ico-20 bash] Установка

••$ npm install ws••

Теперь создадим вебсокет-сервер 

Для этого нам нужен **серверный** скрипт

Создадим файл **_start.js_**

В **~Node.js~** все файлы, включаемые в приложение - это отдельные модули

Чтобы подключить модуль к исполняемому скрипту, необходимо использовать функцию **_~require~_**

Нам нужно подключить модуль **~ws~**, который мы уже установили:

~~~js
const socket = require('ws')
~~~

Теперь этот модуль доступен нам под именем **_socket_**

С его помощью мы и создадим ~WebSocket~ сервер на порту ~8080~

◘◘![ico-20 cap]◘◘

~~~js
const server = new WebSocket.Server({ port: 8080 })
~~~

Теперь в переменной **_server_** у нас ссылка на объект **~WebSocket~**-сервера

Используя событие ~connection~ **~WebSocket~**-сервера,

создадим обработчика события ~message~ объекта **_socket_**

Обработчик будет отсылать в ответ на полученное сообщение JSON-строку

с именем отправителя "server" и текстом "I listen to you",

а затем выводить в консоль полученное от клиента сообщение:

◘◘![ico-20 cap]◘◘

~~~js
server.on('connection', socket => {
  socket.on('message', received => {
    socket.send(JSON.stringify({
      name: 'server',
      message: 'I listen to you'
    }))

    const mess = JSON.parse(received)
    console.log(`received from a client\n${mess.user.name}: ${mess.message}`)
  })
})
~~~

Итак, серверный скрипт готов, сохраним его в файл **start.js**

◘◘![ico-20 cap] start.js◘◘

~~~js
const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8080 })

server.on('connection', socket => {
  socket.on('message', received => {
    socket.send(JSON.stringify({
      name: 'server',
      message: 'I listen to you'
    }))

    const mess = JSON.parse(received)
    console.log(`received from a client\n${mess.name}: ${mess.message}`)
  })
})
~~~

![ico-20 bash] и запустим с помощью консольной команды:

••$ node start.js••

Теперь откроем новую вкладку и введем в адресной строке браузера:
~http://localhost:8080/~

На странице появится сообщение _Upgrade Required_

Это потому, что мы указали протокол ~http~, а запущенный нами на порту ~8080~ сервер работает по протоколу ~ws~

В консоли этой вкладки введем "клиентский" код:

~~~js
const socket = new WebSocket('ws://localhost:8080')

socket.addEventListener('open', () => {
  socket.send(JSON.stringify({
    name: 'Admin',
    message: 'Hello, do you listen to me ?'
  }))
})

socket.addEventListener('message', event => {
  console.log(JSON.parse(event.data))
})
~~~

поскольку мы создаем сервер на локальной машине, 

домен будет **_localhost_** или **_127.0.0.1_**

порт мы уже выбрали - 8080

После выполнения кода:

~~~js
const socket = new WebSocket('ws://localhost:8080')
~~~

в переменной **socket** у нас будет ссылка на экземпляр WebSocket-соединения, 

у которого есть событие **~open~** и метод **~send~** 

(как видим, события и методы на стороне сервера и клиента одни и те же, 

поскольку это соединение двух "равноправных" партнеров для обмена сообщениями)

Итак, когда соединение будет открыто, клиент 

(пока из консоли браузера) 

отправит на сервер сообщение - JSON-строку 

с именем отправителя "_Admin_" и текстом "_Hello, do you listen to me ?_"

◘◘![ico-20 bash] Результат в консоли bash◘◘

~~~console
$ node start.js
received from a client:
                Admin
                Hello, do you listen to me ?
~~~

◘◘Результат в консоли браузера◘◘

~~~console
▼ { name: "server", message: "I listen to you" }
    message: "I listen to you"
    name: "server"
  ► __proto__: Object
~~~

_____________________________________________

## ![ico-25 hw] Упражнение 3

Создадим простенький чат

### ![ico-50 node] Серверная часть

Теперь серверный скрипт будет немного сложнее, поэтому углубимся в **~Node.js~**

Первое, с чем мы познакомимся - это модуль **~fs~** ([**^^File System^^**](https://nodejs.org/api/fs.html))

Для подключения модуля **~fs~** нужно использовать функцию ~require~:

~~~js
const fs = require('fs')
~~~

С помощью модуля ~fs~ мы будем читать (а можно и писать) файлы на сервере

Давайте сначала создадим такие файлы

^^^[users.json]

~~~json
[
  {
    "name": "Иван",
    "photo": "https://apollo-ireland.akamaized.net/v1/files/5bucx1wiqmes-UA/image;s=644x461"
  },
  {
    "name": "Ольга",
    "photo": "https://orig00.deviantart.net/ecd9/f/2015/050/9/3/gravity_falls_icon__wendy_by_mikeinel-d8iowct.gif"
  },
  {
    "name": "Демьян",
    "photo": "https://leoterra.com/sites/default/files/clAvHWVG4GE.jpg"
  },
  {
    "name": "Денис",
    "photo": "https://avatars.mds.yandex.net/get-pdb/1058492/c606d11d-e4fb-4d5b-9de6-84e590c34f8b/s1200"
  },
  {
    "name": "Вероника",
    "photo": "https://super.urok-ua.com/wp-content/uploads/2017/04/Avatarka-11-2.jpg"
  }
]
~~~

^^^


^^^[messages.json]

~~~json
[
  "Привет!",
  "Пойдем в кино ?",
  "Кто сделал домашку ?",
  "У меня проблемы с промисами... :(",
  "Кто вчера был на конфе ? Поделитесь впечатлениями",
  "Я повторяю веб-компоненты - совсем опух...",
  "Похоже, гитлаб опять лег...",
  "Кто уже закачал проект на гит ?",
  "Я спал вчера 2 часа",
  "А я начинаю понимать промисы :)",
  "Вот бы недельку передышки, чтобы только пилить код :)",
  "Меня посылают в командировку, похоже, не попаду на защиту :(",
  "Кто завтра идет на коворкинг ? Встречаемся ?",
  "Отослал резюме на джуна, жду ответа",
  "Завтра у меня собес, пожелайте мне ни пуха",
  "Кто чем планирует заниматься на праздники ?",
  "Мне достался такой жуткий проект по верстке, что я в осадке...",
  "Не очень получается отцентровать иконки соцсетей в окружностях",
  "Я респонсив замутил уже, правда только до 1024рх"
]
~~~

^^^

Объявим два пустых массива

~~~js
const users = []
const messages = []
~~~

в которые мы будем помещать данные из файлов **~users.json~** и **~messages.json~**

Теперь воспользуемся методом **_~readFile()~_** модуля **~fs~** для чтения этих файлов

~~~js
fs.readFile('users.json', 'utf8', (err, content) => users.push(...JSON.parse(content)))

fs.readFile('messages.json', 'utf8', (err, content) => messages.push(...JSON.parse(content)))
~~~

Этот метод принимает три аргумента:

| • | имя файла ( и путь к файлу, если он расположен не в корневой папке ) |
| • | кодировка |
| • | коллбэк-функция, которая будет вызвана, когда файл будет прочитан, и ей будет передано два аргумента: |
|   | • сообщение об ошибке, если чтение файла завершится неудачей |
|   | • содержимое файла в противном случае |

Прочитанное содержимое мы помещаем в ранее объявленные массивы **_~users~_** и **_~messages~_**

Далее мы создаем вебсокет-сервер, как мы это уже делали в предыдущем упражнении

~~~js
const WebSocket = require('ws')
const server = new WebSocket.Server({ port: 8080 })
~~~

Теперь нужно познакомиться поближе с вебсокет-сервером

Каждый раз, когда происходит подключение нового клиента к вебсокет-серверу, происходит событие ~connection~

Мы устанавливаем обработчика события ~connection~

Этот колбэк получает в качестве аргумента экземпляр нового соединения

~~~js
server.on('connection', client => {
  ...
}
~~~

Этот экземпляр (_client_) попадает в итерабельный объект **~server.clients~** (экземпляр класса ~Set~)

От своего конструктора (~Set~) **~server.clients~** наследует методы:

| • add     | • clear   |
| • delete  | • entries |
| • forEach | • has     |
| • keys    | • values  |

Мы воспользуемся методом ~forEach~, чтобы сделать рассылку каждого нового сообщения всем подключенным клиентам

~~~js
server.on('connection', client => {
  client.on('message', received => {
    server.clients.forEach(client => client.send(received))
  })
}
~~~

Для более оживленного чата при каждом поступлении на сервер сообщения от клиента добавим отправку всем клиентам случайно выбранного сообщения из массива **_messages_** от случайно выбранного клиента  из массива **_users_**

~~~js
server.on('connection', client => {
  client.on('message', received => {
    server.clients.forEach(client => client.send(received))
    const newMessage = {
      user: users[randomValue(users.length - 1)],
      message: messages[randomValue(messages.length - 1)]
    }
    server.clients.forEach(client => client.send(JSON.stringify(newMessage)))
  })
}
~~~

где **_randomValue_** - функция:

~~~js
const randomValue = num => Math.round(Math.random() * num)
~~~

Итак, серверный скрипт полностью готов:

◘◘![ico-20 file] start.js◘◘

~~~js
const fs = require('fs')

const [users, messages] = [[], []]

fs.readFile('users.json', 'utf8', (err, content) => users.push(...JSON.parse(content)))

fs.readFile('messages.json', 'utf8', (err, content) => messages.push(...JSON.parse(content)))

const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8080 })

server.on('connection', client => {
  client.on('message', received => {
    server.clients.forEach(_client => _client.send(received))
    const newMessage = {
      user: users[randomValue(users.length - 1)],
      message: messages[randomValue(messages.length - 1)]
    }
    server.clients.forEach(_client => _client.send(JSON.stringify(newMessage)))
  })
})

const randomValue = num => Math.round(Math.random() * num)
~~~

__________________________________________________________________________

### ![ico-20 icon] Клиентская часть


◘◘![ico-20 file] index.html◘◘

~~~html
&lt;!DOCTYPE html>
&lt;html lang="ru">
  &lt;head>
    &lt;meta charset="UTF-8">
    &lt;title>Websocket&lt;/title>
  &lt;/head>

  &lt;body>
    &lt;chat-element
        username="user"
        photo="https://i.pinimg.com/originals/0c/a9/e2/0ca9e28dcb12dc698cfd2beda6d6fa64.jpg">
    &lt;/chat-element>
    &lt;script src = "./chat.js">&lt;/script>
    &lt;script src = "./index.js">&lt;/script>
  &lt;/body>

&lt;/html>
~~~

Как можно увидеть из кода разметки, мы подключаем два файла скриптов ( chat.js и index.js ), которые должны находиться в корневой папке приложения

Кроме того, в разметке присутствует веб-компонент ~&lt;chat-element>~ с атрибутами **_~username~_** и **_~photo~_**, значения которых вы можете изменить по своему усмотрению

Теперь создадим веб-компонент ~&lt;chat-element>~

◘◘![ico-20 file] chat.js◘◘

~~~js
class ChatElement extends HTMLElement {
  constructor () {
    super ()

    this.name = this.getAttribute('username') || 'admin'
    this.photo = this.getAttribute('photo') || 'http://hypeava.ru/uploads/posts/2018-03/1522076645_4.jpg'

    const shadow = this.attachShadow({ mode: 'open' })

    this.chatWindow = Object.assign(document.createElement('div'), {
      className: 'chat'
    })

    const input = Object.assign(document.createElement('input'), {
      innerText: 'Send message',
      onchange: this.sendMessage.bind(this)
    })

    this.css = Object.assign(document.createElement('style'), {
      textContent: `
        * {
          font-family: monospace, Arial;
        }
        .chat {
          width: ${window.innerWidth - 20}px;
          height: ${window.innerHeight - 120}px;
          border: inset 1px;
        }
        input {
          width: ${window.innerWidth - 50}px;
          border: inset 1px;
          background-color: #ded;
          box-shadow: inset 3px 3px 5px #00000090;
          padding: 8px 14px;
          outline: none;
        }
        p, img, .small, .text {
          margin: 4px 8px;
        }
        p {
          font-weight: bold;
          color: green;
        }
        .small {
          font-size:10px;
        }
      `
    })

    shadow.appendChild(this.css)
    shadow.appendChild(this.chatWindow)
    shadow.appendChild(input)
  }

  sendMessage (event) {
    const mess = {
      user: {
        name: this.name,
        photo: this.photo
      },
      message: event.target.value
    }
    socket.send(JSON.stringify(mess))
  }
  
  reseiveMessage (mess) {
    const messageObject = JSON.parse(mess)

    const messageElement = document.createElement('div')
  
    const ava = Object.assign(document.createElement('img'), {
      src: messageObject.user.photo || 'https://i.cartoonnetwork.com/prismo/props/chars/ben17_180x180_0.png',
      width: "50"
    })

    const userName = Object.assign(document.createElement('p'), {
      innerText: messageObject.user.name
    })

    const data = Object.assign(document.createElement('div'), {
      innerText: new Date().toLocaleString(),
      className: 'small'
    })

    const message = Object.assign(document.createElement('span'), {
      className: 'text',
      innerText: messageObject.message
    })

    ;[ava, userName, data, message]
      .forEach(elem => messageElement.appendChild(elem))
    
    
    this.chatWindow.appendChild(messageElement)
  }

  resize () {
    const rules = Array.from(this.css.sheet.cssRules)

    rules.filter(rule => rule.selectorText === '.chat')[0]
      .style.cssText = `
        width: ${window.innerWidth - 20}px;
        height: ${window.innerHeight - 120}px;
        border: inset 1px;
      `
      rules.filter(rule => rule.selectorText === 'input')[0]
        .style.width = `${window.innerWidth - 50}px`
    }
}

customElements.define('chat-element', ChatElement)
~~~

В компоненте есть метод ~resize()~, который будет вызываться при изменении размеров окна браузера

^^Обратите внимание на "слабое место" компонента: он напрямую ссылается на переменную **~socket~** при отправке сообщения на сервер^^
^^Т.е. если в главном скрипте мы назовем наше подключение к серверу иначе, то отправка сообщений работать не будет^^
^^Подумайте, как избежать потенциальных ошибок в этом случае^^

И, наконец, главный скрипт, в котором устанавливается соединение с сервером:

◘◘![ico-20 file] index.js◘◘

~~~js
const socket = new WebSocket('ws://localhost:8080')

const chat = document.querySelector('chat-element')

const user = {
  name: 'garevna',
  photo: 'https://github.com/garevna/js-course/blob/master/images/my-photo.png?raw=true'
}

socket.addEventListener('open', () => {
  socket.send(JSON.stringify({
    user: user,
    message: 'Hello, do you listen to me ?'
  }))
})

socket.addEventListener('message', event => {
  chat.reseiveMessage(event.data)
})

window.onresize = chat.resize.bind(chat)
~~~

Теперь все готово к запуску

_________________________________________________________________________

### ![ico-20 icon] Запуск чата

![ico-20 bash] В первую очередь стартуем сервер:

••$ node start.js••

Теперь откроем в браузере файл **index.html**

Дублируем вкладку несколько раз - каждый раз к вебсокет-серверу подключается новый клиент

Мы видим на страницах открытых вкладок все сообщения, поступающие из разных вкладок

играйтесь в свое удовольствие ![ico-20 smile]

_____________________________________________

