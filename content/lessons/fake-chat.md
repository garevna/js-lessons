# ![ico-30 hw] Fake chat

_____________________________

## ![ico-25 icon] db.json

{{p1}}

![ico-20 green-ok] **lastUpdate**

{{p2}}

~~~js
"lastUpdate": {
  "data": "26.10.2018",
  "time": "12:38:01"
}
~~~

{{p3}}
{{p4}}
{{p5}}

![ico-20 green-ok] **posts**

{{p6}}

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

{{p7}}

••son-server &#45;&#45;watch db.json••

{{p8}}

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

{{p9}}
{{p10}}
{{p11}}

____________________

## ![ico-25 icon] {{p12}}

#### ![ico-20 green-ok] lastUpdate

{{p13}}

~~~js
let lastUpdate
~~~

#### ![ico-20 green-ok] getData

{{p14}}

~~~js
const getData = function (ref) {
  const promise = callback => fetch('http://localhost:3000/' + ref)
    .then(response => response.json())
    .then(response => callback(response))

  return new Promise(resolve => promise(resolve))
}
~~~

#### ![ico-20 green-ok] appElem

{{p15}}
{{p16}}
{{p17}}
{{p18}}
{{p19}}
{{p20}}

~~~js
const addElem = (tagName, container = document.body) => container.appendChild(document.createElement(tagName))
~~~

#### ![ico-20 green-ok] chat

{{p21}}

#### ![ico-20 green-ok] posts & users

{{p22}}

#### ![ico-20 green-ok] currentUser

{{p23}}

~~~js
let currentUser
~~~

#### ![ico-20 green-ok] chatInput

{{p24}}

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

{{p25}}

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

{{p26}}

{{p27}}
{{p28}}
{{p29}}

{{p30}}

{{p31}}

{{p32}}

{{p33}}

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

{{p34}}

{{p35}}
{{p36}}
{{p37}}

{{p38}}
{{p39}}
{{p40}}
{{p41}}
{{p42}}

{{p43}}

~~~js
[getData('users'), getData('posts')]
~~~

{{p44}}
{{p45}}

{{p46}}
{{p47}}
{{p48}}
{{p49}}
{{p50}}

{{p51}}

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

{{p52}}
{{p53}}

~~~js
chat.scrollTop = chat.offsetTop
~~~

{{p54}}
{{p55}}


_______________________________________________

## ![ico-25 icon] {{p56}}

{{p57}}
{{p58}}
{{p59}}

{{p60}}
{{p61}}
{{p62}}

{{p63}}
{{p64}}

{{p65}}

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

## ![ico-20 file] {{p66}}

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
