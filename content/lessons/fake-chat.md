# ![ico-30 hw] {{s1.h1}}

_____________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

~~~js
"lastUpdate": {
  "data": "26.10.2018",
  "time": "12:38:01"
}
~~~

{{s2.p4}}
{{s2.p5}}
{{s2.p6}}

{{s2.p7}}

{{s2.p8}}

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

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

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

{{s3.p4}}
{{s3.p5}}
{{s3.p6}}

____________________

## ![ico-25 icon] {{s4.h1}}

#### ![ico-20 green-ok] {{s5.h1}}

{{s5.p1}}

~~~js
let lastUpdate
~~~

#### ![ico-20 green-ok] {{s6.h1}}

{{s6.p1}}

~~~js
const getData = function (ref) {
  const promise = callback => fetch('http://localhost:3000/' + ref)
    .then(response => response.json())
    .then(response => callback(response))

  return new Promise(resolve => promise(resolve))
}
~~~

#### ![ico-20 green-ok] {{s7.h1}}

{{s7.p1}}
{{s7.p2}}
{{s7.p3}}
{{s7.p4}}
{{s7.p5}}
{{s7.p6}}

~~~js
const addElem = (tagName, container = document.body) => container.appendChild(document.createElement(tagName))
~~~

#### ![ico-20 green-ok] {{s8.h1}}

{{s8.p1}}

#### ![ico-20 green-ok] {{s9.h1}}

{{s9.p1}}

#### ![ico-20 green-ok] {{s10.h1}}

{{s10.p1}}

~~~js
let currentUser
~~~

#### ![ico-20 green-ok] {{s11.h1}}

{{s11.p1}}

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

#### ![ico-20 green-ok] {{s12.h1}}

{{s12.p1}}

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

#### ![ico-20 green-ok] {{s13.h1}}

{{s13.p1}}

{{s13.p2}}
{{s13.p3}}
{{s13.p4}}

{{s13.p5}}

{{s13.p6}}

{{s13.p7}}

{{s13.p8}}

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

#### ![ico-20 green-ok] {{s14.h1}}

{{s14.p1}}

{{s14.p2}}
{{s14.p3}}
{{s14.p4}}

{{s14.p5}}
{{s14.p6}}
{{s14.p7}}
{{s14.p8}}
{{s14.p9}}

{{s14.p10}}

~~~js
[getData('users'), getData('posts')]
~~~

{{s14.p11}}
{{s14.p12}}

{{s14.p13}}
{{s14.p14}}
{{s14.p15}}
{{s14.p16}}
{{s14.p17}}

{{s14.p18}}

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

{{s14.p19}}
{{s14.p20}}

~~~js
chat.scrollTop = chat.offsetTop
~~~

{{s14.p21}}
{{s14.p22}}


_______________________________________________

## ![ico-25 icon] {{s15.h1}}

{{s15.p1}}
{{s15.p2}}
{{s15.p3}}

{{s15.p4}}
{{s15.p5}}
{{s15.p6}}

{{s15.p7}}
{{s15.p8}}

{{s15.p9}}

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

## ![ico-20 file] {{s16.h1}}

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
