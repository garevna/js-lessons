# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

_______________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

~~~js
const formData = new FormData()
formData instanceof FormData   // true
~~~

~~~~console
▼ FormData {}
  ▼ __proto__: FormData
      ► append: ƒ append()
      ► delete: ƒ delete()
      ► entries: ƒ entries()
      ► forEach: ƒ forEach()
      ► get: ƒ ()
      ► getAll: ƒ getAll()
      ► has: ƒ has()
      ► keys: ƒ keys()
      ► set: ƒ ()
      ► values: ƒ values()
      ► constructor: ƒ FormData()
      ► Symbol(Symbol.iterator): ƒ entries()
        Symbol(Symbol.toStringTag): "FormData"
      ► __proto__: Object
~~~~

{{s2.p2}}
{{s2.p3}}

{{s2.p4}}
_____________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

~~~~html
<head>
  <script src="https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"></script>
</head>
<body>
  <section id="registration-section">
    <form id="registration-form">
      <input
        name="user-name"
        placeholder="Enter your name"
      />

      <input
        type="password"
        id="pass-1"
        placeholder="Set your password"
        style="color: red;"
      />

      <input
        type="password"
        id="pass-2"
        placeholder="Repeat your password"
        disabled=""
      />

      <input
        type="hidden"
        value=""
        name="pass-hash"
      />

      <input
        type="hidden"
        value=""
        name="user-photo"
      />

      <input
        type="file"
        name="file"
        id="upload-avatar"
        style="visibility: hidden; width: 0"
      />

      <label for="upload-avatar">
        <img
          id="user-avatar-preview"
          src="https://www.pngitem.com/pimgs/m/440-4407257_class-dojo-cool-avatars-clipart-png-download-new.png"
          width="80"
        />
      </label>
    </form>
    <button id="register-button">Register</button>
  </section>
  <section id="user-info">
    <h4 id="user-info-name"></h4>
    <img id="user-info-avatar" src=null width="80">
  </section>
</body>
~~~~

~~~~js
let currentUser = null

const [password, passwordCheck, upload, avatar, submit, form, registration, userInfo, userInfoName, userInfoAvatar] = [
  'pass-1',
  'pass-2',
  'upload-avatar',
  'user-avatar-preview',
  'register-button',
  'registration-form',
  'registration-section',
  'user-info',
  'user-info-name',
  'user-info-avatar'
].map(id => document.getElementById(id))

const [userName, passwordHash, photo] = [
  'user-name',
  'pass-hash',
  'user-photo'
].map(name => document.getElementsByName(name)[0])

userInfo.style.display = 'none'

upload.onchange = function (event) {
  const photo = event.target.files[0]
  if (photo.type.indexOf('image') !== 0) return
  const picture = URL.createObjectURL(photo)
  avatar.src = picture
  photo.value = picture
}

password.oninput = function (event) {
  const pass = event.target.value
  event.target.valid = pass.length > 6 && !!pass.match(/\d/) && !!pass.match(/\D/)
  event.target.style.color = event.target.valid ? 'green' : 'red'
  passwordCheck.disabled = !event.target.valid
}

passwordCheck.oninput = function (event) {
  Object.assign(event.target, {
    valid: event.target.value === password.value,
    style: `color: ${event.target.valid ? 'green' : 'red'}`
  })
}

passwordCheck.onchange = function (event) {
  event.target.valid
    ? passwordHash.value = Sha256.hash(event.target.value)
    : null
}

submit.onclick = function (event) {
  const formData = new FormData(form)

  const result = {}

  formData.forEach((val, key) => Object.assign(result, { [key]: val }))

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(result)
  })
    .then(response => response.json())
    .then(response => {
      currentUser = response
      userInfoName.innerText = currentUser['user-name']
      userInfoAvatar.src = currentUser['user-photo']

      ;['id', 'pass-hash']
        .forEach(key => { document.cookie = `${key}=${currentUser[key]}` })
  
      registration.style.display = 'none'
      userInfo.style.display = 'block'
    })
}
~~~~

________________________________________________


{{s3.p4}}

________________________________________________

{{s3.p5}}

{{s3.p6}}
{{s3.p7}}

____________________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

~~~js
const formData = new FormData()
formData.append('username', 'garevna')
formData.append('token', 'HgTY78-jdfhj91*/jskdfj')
~~~

{{s4.p5}}

~~~js
formData.has('token')     // true
~~~

{{s4.p6}}

~~~js
formData.get('username')  // "garevna"
formData.get('token')     // "HgTY78-jdfhj91*/jskdfj"
~~~

{{s4.p7}}

{{s4.p8}}

~~~js
formData.append('pictures', 'http://icecream.me/uploads/b0d4d73f21508dd67e0c57a590f582f0.png')
formData.getAll('pictures')
formData.append('pictures', 'https://github.com/garevna/js-course/raw/master/images/js_cup-ico.png')
formData.getAll('pictures')
~~~

{{s4.p9}}

{{s4.p10}}

{{s4.p11}}

~~~js
formData.set('token', 'gF&op*i91/54gkjHU')
formData.get('token')  // "gF&op*i91/54gkjHU"
~~~

{{s4.p12}}

~~~js
formData.delete('token')
formData.get('token')    // null
~~~

{{s4.p13}}

{{s4.p14}}

{{s4.p15}}

~~~js
const iterator = formData.keys()
iterator.next()
iterator.next()
...
~~~

{{s4.p16}}

{{s4.p17}}

{{s4.p18}}

~~~js
const iterator = formData.entries()
iterator.next()
iterator.next()
...
~~~

{{s4.p19}}

~~~js
const formData = new FormData()

formData.append('name', 'Peter')
formData.append('age', 25)
formData.append('speciality', 'dev')

formData.forEach(item => console.log(item))

// Peter
// 25
// dev

const iterator = formData.entries()

const result = []

do {
  var { value, done } = iterator.next()
  value && result.push(value)
} while (!done)

console.log(result)

~~~

~~~console

► (3) [Array(2), Array(2), Array(2)]
   ► 0: (2) ['name', 'Peter']
   ► 1: (2) ['age', '25']
   ► 2: (2) ['speciality', 'dev']
~~~

_____________________________________________

## ![ico-25 icon] {{s5.h1}}

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}

~~~js
const fileSelector = document.body
  .appendChild(document.createElement('input'))

fileSelector.type = 'file'

const formData = new FormData()

fileSelector.onchange = function (event) {
  formData.append('avatar, this.files[0])

  fetch('https://httpbin.org/post', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(response => console.log(response))
}
~~~

____________________________________

### ![ico-20 icon] {{s7.h1}}

{{s7.p1}}

~~~js
const fileSelector = document.body
  .appendChild(document.createElement('input'))

fileSelector.type = 'file'

const formData = new FormData()

fileSelector.onchange = function (event) {
  formData.append('avatar', this.files[0])

  const request = new XMLHttpRequest()
  request.open('POST', 'https://httpbin.org/post')
  request.onreadystatechange = function (event) {
    if (this.readyState < 4) return
    console.log(this.status, this.response)
  }
  request.send(formData)
}
~~~

{{s7.p2}}

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FformData-1.png)


{{s7.p3}}

~~~console
data:[<media type>][;base64],<data>
~~~

{{s7.p4}}

______________________________________________________

{{s7.p5}}

{{s7.p6}}

{{s7.p7}}

{{s7.p8}}

~~~js
const fileSelector = document.body
  .appendChild(document.createElement('input'))

fileSelector.type = 'file'

const formData = new FormData()

fileSelector.onchange = function (event) {
  formData.append('avatar', this.files[0])

  const request = new XMLHttpRequest()
  request.open('POST', 'http://ptsv2.com/t/garevna/post')
  request.send(formData)
}
~~~

{{s7.p9}}

~~~js
const request = new XMLHttpRequest()
request.open('GET', 'http://ptsv2.com/t/garevna/d/1110001/json')
request.onreadystatechange = function (event) {
  if (this.readyState < 4) return
  const result = JSON.parse(this.response)
  const img = document.querySelector('img')
  img.src = `data:image/png;base64,${result.Files[0].Content}`   
}
request.send()
~~~

{{s7.p10}}

![](http://ptsv2.com/static/ToiletLogo.jpg)

{{s7.p11}}

______________________________________________________________________________

## ![ico-25 icon] {{s8.h1}}

{{s8.p1}}

### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}

~~~js
fetch('https://garevna-form-data.glitch.me/forms/all')
  .then(response => response.json())
  .then(response => console.log(response))
~~~

~~~console
▼ {goblin: {…}, frodo: {…}, garevna: {…}, begemot: {…}, bomb: {…}, …}
  ► begemot: {name: "Cat", age: "15", avatar: {…}}
  ► bomb: {name: "Serafim", age: "27", avatar: {…}}
  ► frodo: {name: "Frodo", age: "18", avatar: {…}}
  ► garevna: {name: "Irina", age: "16", avatar: {…}}
  ► goblin: {name: "Grig", age: "21", avatar: {…}}
  ► safari: {name: "Grig", age: "25", avatar: {…}}
  ► __proto__: Object
~~~

{{s9.p2}}

~~~js
function getFormData (url) {
  fetch(url)
    .then(response => response.formData())
    .then(formData => formData.forEach(prop => console.log(prop)))
}

getFormData('https://garevna-form-data.glitch.me/forms/frodo')
~~~

~~~console
Frodo
18
▼ File {name: "upload_d3a3179170b5ddaf0fee28e32799cc32.jpg", lastModified: 1572253559576, lastModifiedDate: Mon Oct 28 2019 11:05:59 GMT+0200 (Восточная Европа, стандартное время), webkitRelativePath: "", size: 15068, …}
    lastModified: 1572253615903
  ► lastModifiedDate: Mon Oct 28 2019 11:06:55 GMT+0200 (Восточная Европа, стандартное время) {}
    name: "upload_d3a3179170b5ddaf0fee28e32799cc32.jpg"
    size: 15068
    type: "image/jpeg"
    webkitRelativePath: ""
  ► __proto__: File
~~~

{{s9.p3}}

~~~js
const api = 'https://garevna-form-data.glitch.me/forms'

const addElem = (tagName, container = document.body) => {
  return container.appendChild(document.createElement(tagName))
}

const readFile = file => {
  const reader = new FileReader()
  return new Promise(resolve => {
    reader.onload = event => resolve(event.target.result)
    reader.readAsDataURL(file)
  })
}

async function getFormData (login) {
  const response = await fetch(`${api}/${login}`)

  if (response.status !== 200) return { status: response.status, result: null }

  const formData = await response.formData()

  const iterator = formData.entries()

  const result = {}

  do {
    var { value, done } = iterator.next()
    if (value) {
      const [key, val] = value
      console.log(key, val)
      if (val.type && !val.type.indexOf('image')) {
        const picture = document.createElement('img')
        picture.src = await readFile(val)
        Object.assign(result, { [key]: picture })
      } else Object.assign(result, { [key]: val })
    }
  } while (!done)

  return { status: 200, result }
}

const response = await getFormData('goblin')
  .catch(err => console.warn(err))

const { status, result } = response || {}

status === 200 && document.body.appendChild(result.avatar)
~~~

________________________________________________________

### ![ico-20 icon] {{s10.h1}}

{{s10.p1}}

~~~html
<form id="form">
  <p>Name</p>
  <input id="userName" name="name" placeholder="Name">
  <p>Age</p>
  <input
    type="number"
    id="userAge" 
    name="age"
    placeholder="Age"
  />
  <p>Your Photo</p>
  <input
    type="file" 
    id="avatar" 
    name="avatar" 
  />
  <img
    id="userPhoto"
    src="https://forexi.ru/wp-content/uploads/2019/02/teacher1.png" width="70"
  />
</form>

<button id="submit">Submit</button>
~~~

{{s10.p2}}

~~~js
const login = 'bandit'

const formData = new FormData(document.getElementById('form'))

fetch(`https://garevna-form-data.glitch.me/form/${login}`, {
  method: 'POST',
  body: formData
}).then(response => console.log(response.status))
~~~

{{s10.p3}}
{{s10.p4}}
{{s10.p5}}

________________________________________________________

{{s10.p6}}
{{s10.p7}}