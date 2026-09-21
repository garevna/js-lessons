# ![ico-70 webpack] WebSocket

{{p1}}

{{p2}}
{{p3}}

__________________________________

{{p4}}

{{p5}}

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

{{p6}}

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

{{p7}}

{{p8}}

_______________________________________________

## ![ico-25 hw] {{common.c3}} 1

<img src="https://www.piesocket.com/img/logo.png" height="40"/>

{{p9}}

{{p10}}

{{p11}}

~~~js
const apiKey = 'oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm'

const websocket = new WebSocket(`wss://demo.piesocket.com/v3/channel_1?api_key=${apiKey}`)
~~~

{{p12}}

{{p13}}
{{p14}}
{{p15}}

{{p16}}
{{p17}}
{{p18}}
{{p19}}

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

~~~console
CONNECTED
Happy New Year!
DISCONNECTED
~~~

![](https://kaazing.com/favicon.ico)

______________________________________________________________________________________

## ![ico-25 hw] {{common.c3}} 2

{{p20}}

{{p21}}

{{p22}}

{{p23}}

### ![ico-20 bash] {{common.c24}}

••$ npm install ws••

{{p24}}

{{p25}}

{{p26}}

{{p27}}

{{p28}}

{{p29}}

~~~js
const socket = require('ws')
~~~

{{p30}}

{{p31}}

◘◘server◘◘

~~~js
const server = new WebSocket
  .Server({
    port: 8080
  })
~~~

{{p32}}

{{p33}}

{{p34}}

{{p35}}

{{p36}}

{{p37}}

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

{{p38}}

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

{{p39}}

•• ![ico-20 bash] $ node start.js••

{{p40}}

**~http://localhost:8080/~**

{{p41}}

{{p42}}

{{p43}}

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

{{p44}}

{{p45}}

{{p46}}

{{common.c12}}

~~~js
const socket = new WebSocket('ws://localhost:8080')
~~~

{{p47}}
{{p48}}

{{p49}}

{{p50}}
{{p51}}
{{p52}}

{{p53}}

◘◘^^![ico-20 bash] {{common.c14}}^^◘◘
~~~console
$ node start.js
received from a client:
                Admin
                Hello, do you listen to me ?
~~~

{{p54}}

~~~console
▼ { name: "server", message: "I listen to you" }
    message: "I listen to you"
    name: "server"
  ► [[Prototype]]: Object
~~~

______________________________________________________________________________________

## ![ico-25 hw] {{common.c3}} 3

{{p55}}

### ![ico-20 ico] {{p56}}

{{p57}}

![ico-70 node] 

{{p58}}
^^(**~File System~**)^^

{{p59}}

~~~js
const fs = require('fs')
~~~

{{p60}}

{{p61}}

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

{{p62}}

~~~js
const users = []
const messages = []
~~~

{{p63}}

{{p64}}

~~~js
fs.readFile('users.json', 'utf8', (err, content) => users = JSON.parse(content))

fs.readFile('messages.json', 'utf8', (err, content) => messages = JSON.parse(content))
~~~

{{p65}}

{{p66}}
{{p67}}
{{p68}}
{{p69}}
{{p70}}

{{p71}}

{{p72}}

~~~js
const WebSocket = require('ws')
const server = new WebSocket.Server({ port: 8080 })
~~~

{{p73}}

{{p74}}

{{p75}}

{{p76}}

~~~js
server.on('connection', client => {
  ...
}
~~~

{{p77}}

{{p78}}

| add     | forEach |
| delete  | clear   |
| has     | entries |
| keys    | values  |

{{p79}}

~~~js
server.on('connection', client => {
  client.on('message', received => {
    server
      .clients
      .forEach(client => client.send(received))
  })
}
~~~

{{p80}}

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

{{p81}}

~~~js
const randomValue = num => Math.round(Math.random() * num)
~~~

{{p82}}

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

### ![ico-20 ico] {{p83}}

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

{{p84}}

{{p85}}

{{p86}}

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

{{p87}}

{{p88}}

{{p89}}

{{p90}}

{{p91}}

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

{{p92}}

___________________________

{{p93}}

{{p94}}

••![ico-20 bash] $ node start.js••

{{p95}}

{{p96}}

{{p97}}

{{p98}}
