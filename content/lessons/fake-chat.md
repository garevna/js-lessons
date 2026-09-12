# ![ico-30 hw] Fake chat

_____________________________

## ![ico-25 icon] db.json

{{s0.p1}}

![ico-20 green-ok] **lastUpdate**

{{s0.p2}}

~~~js
"lastUpdate": {
  "data": "26.10.2018",
  "time": "12:38:01"
}
~~~

{{s0.p3}}
{{s0.p4}}
{{s0.p5}}

![ico-20 green-ok] **posts**

{{s0.p6}}

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

{{s0.p7}}

••son-server &#45;&#45;watch db.json••

{{s0.p8}}

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

{{s0.p9}}
{{s0.p10}}
{{s0.p11}}

____________________

## ![ico-25 icon] {{s1.h1}}

#### ![ico-20 green-ok] lastUpdate

{{s1.p1}}

~~~js
let lastUpdate
~~~

#### ![ico-20 green-ok] getData

{{s1.p2}}

~~~js
const getData = function (ref) {
  const promise = callback => fetch('http://localhost:3000/' + ref)
    .then(response => response.json())
    .then(response => callback(response))

  return new Promise(resolve => promise(resolve))
}
~~~

#### ![ico-20 green-ok] appElem

{{s1.p3}}
{{s1.p4}}
{{s1.p5}}
{{s1.p6}}
{{s1.p7}}
{{s1.p8}}

~~~js
const addElem = (tagName, container = document.body) => container.appendChild(document.createElement(tagName))
~~~

#### ![ico-20 green-ok] chat

{{s1.p9}}

#### ![ico-20 green-ok] posts & users

{{s1.p10}}

#### ![ico-20 green-ok] currentUser

{{s1.p11}}

~~~js
let currentUser
~~~

#### ![ico-20 green-ok] chatInput

{{s1.p12}}

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

{{s1.p13}}

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

{{s1.p14}}

{{s1.p15}}
{{s1.p16}}
{{s1.p17}}

{{s1.p18}}

{{s1.p19}}

{{s1.p20}}

{{s1.p21}}

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

{{s1.p22}}

{{s1.p23}}
{{s1.p24}}
{{s1.p25}}

{{s1.p26}}
{{s1.p27}}
{{s1.p28}}
{{s1.p29}}
{{s1.p30}}

{{s1.p31}}

~~~js
[getData('users'), getData('posts')]
~~~

{{s1.p32}}
{{s1.p33}}

{{s1.p34}}
{{s1.p35}}
{{s1.p36}}
{{s1.p37}}
{{s1.p38}}

{{s1.p39}}

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

{{s1.p40}}
{{s1.p41}}

~~~js
chat.scrollTop = chat.offsetTop
~~~

{{s1.p42}}
{{s1.p43}}


_______________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

{{s2.p4}}
{{s2.p5}}
{{s2.p6}}

{{s2.p7}}
{{s2.p8}}

{{s2.p9}}

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

## ![ico-20 file] {{s3.h1}}

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
