# ![ico-70 webpack] WebSocket

{{s0.p1}}

{{s0.p2}}
{{s0.p3}}

__________________________________

{{s0.p4}}

{{s0.p5}}

^^^[Request Headers]

~~~console
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
~~~

^^^

{{s0.p6}}

^^^[Response Headers]

~~~console
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
~~~

^^^

{{s0.p7}}

{{s0.p8}}

_______________________________________________

## ![ico-25 hw] {{common.c3}} 1

<img src="https://www.piesocket.com/img/logo.png" height="40"/>

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

~~~js
const apiKey = 'oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm'

const websocket = new WebSocket(`wss://demo.piesocket.com/v3/channel_1?api_key=${apiKey}`)
~~~

{{s1.p4}}


{{s1.p5}}
{{s1.p6}}
{{common.c228}}

{{s1.p8}}
{{s1.p9}}
{{s1.p10}}
{{common.c229}}

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

◘◘^^{{common.c20}}^^◘◘

~~~console
CONNECTED
Happy New Year!
DISCONNECTED
~~~

![](https://kaazing.com/favicon.ico)

______________________________________________________________________________________

## ![ico-25 hw] {{common.c3}} 2


{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

### ![ico-20 bash] {{common.c44}}


••$ npm install ws••


{{s3.p1}}

{{common.c233}}

{{s3.p3}}

{{s3.p4}}

{{s3.p5}}

{{s3.p6}}

~~~js
const socket = require('ws')
~~~

{{common.c235}}

{{s3.p8}}

◘◘server◘◘

~~~js
const server = new WebSocket
  .Server({
    port: 8080
  })
~~~

{{s3.p9}}

{{s3.p10}}

{{common.c236}}

{{s3.p12}}

{{common.c238}}

{{common.c239}}

~~~js
server.on('connection', socket => {
  socket.on('message', received => {
    socket.send(JSON.stringify({
      name: 'server',
      message: 'I listen to you'
    }))

    const mess = JSON.parse(received)
    console.log(`received from a client: ${mess.user.name} ${mess.message}`)
  })
})
~~~

{{s3.p15}}

◘◘![ico-20 file] start.js◘◘

~~~js
const WebSocket = require('ws')

const server = new WebSocket
  .Server({
    port: 8080
  })

server.on('connection', socket => {
  socket.on('message', received => {
    socket.send(JSON.stringify ( {
      name: 'server',
      message: 'I listen to you'
    }))

    const mess = JSON.parse(received)
    console.log(`received from a client: ${mess.name} ${mess.message}`)
  })
})
~~~

{{common.c241}}

•• ![ico-20 bash] $ node start.js••


{{s3.p17}}

**~http://localhost:8080/~**

{{s3.p18}}

{{s3.p19}}

{{common.c243}}

~~~js
const socket = new WebSocket('ws://localhost:8080')

socket.addEventListener('open', () => {
  socket.send(JSON.stringify({
    name: 'Admin',
    message: 'Hello, do you listen to me ?'
  }))
})

socket.addEventListener('message', event => console.log(JSON.parse(event.data)))
~~~

{{s3.p21}}

{{s3.p22}}

{{s3.p23}}

{{common.c16}}

~~~js
const socket = new WebSocket('ws://localhost:8080')
~~~

{{s3.p25}}
{{s3.p26}}

{{s3.p27}}

{{s3.p28}}
{{s3.p29}}
{{s3.p30}}

{{s3.p31}}

◘◘^^![ico-20 bash] {{common.c20}}^^◘◘
~~~console
$ node start.js
received from a client:
                Admin
                Hello, do you listen to me ?
~~~

◘◘^^{{common.c249}}^^◘◘

~~~console
▼ { name: "server", message: "I listen to you" }
    message: "I listen to you"
    name: "server"
  ► __proto__: Object
~~~

______________________________________________________________________________________

## ![ico-25 hw] {{common.c3}} 3

{{common.c250}}

### ![ico-20 ico] {{common.c251}}

{{s5.p1}}

![ico-70 node] 

{{s5.p2}}
^^(**~File System~**)^^

{{s5.p3}}

~~~js
const fs = require('fs')
~~~

{{s5.p4}}

{{common.c252}}

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

{{common.c253}}

~~~js
const users = []
const messages = []
~~~

{{s5.p7}}

{{s5.p8}}

~~~js
fs.readFile('users.json', 'utf8', (err, content) => users = JSON.parse(content))

fs.readFile('messages.json', 'utf8', (err, content) => messages = JSON.parse(content))
~~~

{{common.c254}}

{{s5.p10}}
{{s5.p11}}
{{s5.p12}}
{{s5.p13}}
{{s5.p14}}

{{s5.p15}}

{{s5.p16}}

~~~js
const WebSocket = require('ws')
const server = new WebSocket.Server({ port: 8080 })
~~~

{{common.c256}}

{{s5.p18}}

{{common.c257}}

{{s5.p20}}

~~~js
server.on('connection', client => {
  ...
}
~~~

{{s5.p21}}

{{common.c259}}

| add     | forEach |
| delete  | clear   |
| has     | entries |
| keys    | values  |

{{s5.p23}}

~~~js
server.on('connection', client => {
  client.on('message', received => {
    server
      .clients
      .forEach(client => client.send(received))
  })
}
~~~

{{s5.p24}}

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

{{s5.p25}}

~~~js
const randomValue = num => Math.round(Math.random() * num)
~~~

{{common.c262}}

^^^[start.js]

~~~js
const fs = require('fs')

const users = []
const messages = []

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

^^^

______________________________________________________________

### ![ico-20 ico] {{common.c263}}

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

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}

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

{{s6.p4}}

{{s6.p5}}

{{s6.p6}}

{{s6.p7}}

{{s6.p8}}

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

{{common.c265}}

___________________________

![ico-20 icon] **{{common.c266}}**

{{common.c267}}

••![ico-20 bash] $ node start.js••


{{common.c268}}

{{s6.p13}}

{{s6.p14}}

{{common.c271}}
