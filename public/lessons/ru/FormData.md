# ![ico-30 study] FormData

Объекты класса **FormData** предоставляют интефейс для манипулирования данными форм и могут быть отправлены на сервер с помощью ~XMLHttpRequest~ или ~Fetch API~

_______________________________________

## ![ico-25 icon] Конструктор

Конструктор FormData() создает объект класса **_FormData_**

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

Обратие внимание, что у экземпляра FormData есть ряд унаследованных методов:
~append~, ~delete~, ~entries~, ~forEach~, ~get~, ~getAll~, ~has~, ~keys~, ~set~ и ~values~

Эти методы обеспечивают интерфейс для доступа к данным
_____________________________________

## ![ico-25 icon] Работа с формами

Собрать данные из формы в экземпляр класса _FormData_ очень легко - достаточно при создании экземпляра передать конструктору ~FormData()~ в качестве аргумента ссылку на элемент формы

![ico-20 warn] Следует помнить, что конструктор будет собирать в объект класса ~FormData~ из указанной формы только значения свойства ~value~ тех элементов, у которых указан атрибут **~name~**

![ico-25 cap] ** 1**

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


[![ico-25 cap] **Live demo**](https://garevna.github.io/js-samples/#29)

________________________________________________

Обратите внимание, что в этом примере мы делаем скрытые поля формы, которые не отображаются пользователю, однако их содержимое будет включено в объект ~formData~

При этом в форме есть поля, не имеющие атрибута ~name~
Они отображаются пользователю, однако их содержимое не будет включено в объект ~formData~

____________________________________________

## ![ico-25 icon] Методы

![ico-20 icon] append()

Принимает два аргумента - имя ключа и его значение

Если такого ключа еще нет, добавляет пару ключ/значение

Если такой ключ уже существует, добавляет ему новое значение

~~~js
const formData = new FormData()
formData.append('username', 'garevna')
formData.append('token', 'HgTY78-jdfhj91*/jskdfj')
~~~

![ico-20 icon] has()

~~~js
formData.has('token')     // true
~~~

![ico-20 icon] get()

~~~js
formData.get('username')  // "garevna"
formData.get('token')     // "HgTY78-jdfhj91*/jskdfj"
~~~

![ico-20 icon] getAll()

Возвращает массив всех значений, связанных с указанным в аргументе ключом

~~~js
formData.append('pictures', 'http://icecream.me/uploads/b0d4d73f21508dd67e0c57a590f582f0.png')
formData.getAll('pictures')
formData.append('pictures', 'https://github.com/garevna/js-course/raw/master/images/js_cup-ico.png')
formData.getAll('pictures')
~~~

![ico-20 icon] set()

Аргументы: ключ, значение

Если указанный аргументом ключ уже существует, устанавливает ему новое значение, в противном случае добавляет новый ключ и значение

~~~js
formData.set('token', 'gF&op*i91/54gkjHU')
formData.get('token')  // "gF&op*i91/54gkjHU"
~~~

![ico-20 icon] delete()

~~~js
formData.delete('token')
formData.get('token')    // null
~~~

![ico-20 icon] keys()

Возвращает объект-итератор (будем изучать позже)

![ico-25 cap] ** 2**

~~~js
const iterator = formData.keys()
iterator.next()
iterator.next()
...
~~~

![ico-20 icon] entries()

Возвращает объект-итератор (будем изучать позже)

![ico-25 cap] ** 3**

~~~js
const iterator = formData.entries()
iterator.next()
iterator.next()
...
~~~

![ico-25 cap] ** 4**

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

## ![ico-25 icon] Отправка данных на сервер

### ![ico-20 icon] fetch

![ico-25 cap] ** 5**

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

### ![ico-20 icon] XMLHttpRequest

![ico-25 cap] ** 6**

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

**Посмотрим, что ответил сервер**

![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2FformData-1.png)


Как мы видим, файл изображения был передан на сервер как строка закодированных двичных данных

~~~console
data:[<media type>][;base64],<data>
~~~

**_base64_** указывает, что содержимое является двоичными данными, закодированными с использованием [схемы **Base64**](https://www.base64encode.org/)

______________________________________________________

![ico-25 cap] ** 7**

![ico-20 warn] Для выполнения упражнения перейдем на страницу ![ico-30 toilet] http://ptsv2.com

^^не забудьте заменить _garevna_ на свой идентификатор^^

**Загрузка изображения с клиента**

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

**прочитаем записанное**

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

После выполнения этого кода вы увидите, что на странице изображение

![](http://ptsv2.com/static/ToiletLogo.jpg)

будет заменено на выбранное изображение

______________________________________________________________________________

## ![ico-25 icon] Endpoints для самостоятельной работы

••https://garevna-form-data.glitch.me/forms/&lt;id>••

### ![ico-20 icon] GET

◘◘![ico-20 cap] 8◘◘

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

◘◘![ico-20 cap] 9◘◘

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

◘◘![ico-20 cap] 10◘◘

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

### ![ico-20 icon] POST | PUT | PATCH

••https://garevna-form-data.glitch.me/form/&lt;id>••

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

Ввод логина прийдется сделать отдельно ![ico-20 smile]

~~~js
const login = 'bandit'

const formData = new FormData(document.getElementById('form'))

fetch(`https://garevna-form-data.glitch.me/form/${login}`, {
  method: 'POST',
  body: formData
}).then(response => console.log(response.status))
~~~

^^Обратите внимание, что при отправке фетчем POST-запроса заголовок ~'Content-Type': "multipart/form-data"~ лучше не указывать^^
^^Браузер сам добавит нужный заголовок и разделитель ( ~boundary~ )^^
^^В противном случае на сервер приходит пустой объект^^

________________________________________________________

[:::Live Demo:::](https://garevna-form-data.glitch.me/)  
[![ico-50 git] Live Demo](https://garevna.github.io/js-samples/#47)