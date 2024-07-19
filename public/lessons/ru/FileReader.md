# ![ico-30 icon] FileReader

**Конструктор**

Создает экземпляр объекта, который позволяет веб-приложению асинхронно читать содержимое файлов (объекты класса **_File_**) на компьютере пользователя или объекты класса **_Blob_**

~~~js
var reader = new FileReader()
~~~

![ico-20 warn] Не может читать объекты класса **_~ReadableStream~_**


^^^[Методы]
• ~ ƒ~ **~readAsArrayBuffer()~**
• ~ ƒ~ **~readAsBinaryString()~**
• ~ ƒ~ **~readAsDataURL()~**
• ~ ƒ~ **~readAsText()~**
^^^


^^^[Свойства]

![ico-20 green-ok] **error**

^^объект **DOMError** со свойствами **_name_** и **_message_**^^

______________________________________

![ico-20 green-ok] **readyState**


• ^^**EMPTY**   : 0 (_данные еще не загружены_)^^
• ^^**LOADING** : 1 (_данные загружаются_)^^
• ^^**DONE**    : 2 (_операция чтения завершена_)^^

______________________________________

![ico-20 green-ok] **result**

^^данные^^
^^• значение свойства result определено только после завершения операции чтения^^
^^• формат данных зависит от способа, с помощью которого процесс был вызван^^

^^^

^^^[Обработка событий]


![ico-20 green-ok] onabort
![ico-20 green-ok] onerror
![ico-20 green-ok] onload
![ico-20 green-ok] onloadend
![ico-20 green-ok] onloadstart
![ico-20 green-ok] onprogress

^^^

Разберите работу кода в Chrome DevTools:

◘◘![ico-25 cap] ** 1**◘◘

~~~js
const selector = document.body.appendChild(document.createElement('input'))
selector.type = 'file'

selector.onchange = function handleFiles (event) {
  fileReader.readAsDataURL(event.target.files[0])
  fileReader.onload = function (event) {
    picture.src = event.target.result
  }
}

var picture = document.body.appendChild(document.createElement('img'))

var fileReader = new FileReader()
~~~

Сравните с уже знакомым методом  **URL.createObjectURL**:

~~~js
picture.src = URL.createObjectURL(selected)
~~~

____________________________________________________________

Разберите работу кода в Chrome DevTools:

◘◘![ico-25 cap] ** 2**◘◘

~~~js
const selector = document.body
  .appendChild(document.createElement('input'))

const [picture, header, demo] = ['img', 'h3', 'pre']
  .map(tagName => document.body.appendChild(document.createElement(tagName)))

const defauls = {
  method: 'readAsArrayBuffer',
  element: console,
  prop: 'log'
}

selector.type = 'file'

const types = {
  image: {
    method: 'readAsDataURL',
    element: picture,
    prop: 'src'
  },
  text: {
    method: 'readAsText',
    element: demo,
    prop: 'innerText'
  },
  application: {
    method: 'readAsText',
    element: demo,
    prop: 'innerText'
  }
}

selector.onchange = function handleFiles (event) {
  const selected = event.target.files[0]
  header.innerText = selected.type
  const type = selected.type.split('/')[0]

  const { method, element, prop } = Object.keys(types).includes(type)
    ? types[type]
    : defauls

  fileReader[method](selected)
  fileReader.onload = function (event) {
    typeof element[prop] === 'function'
      ? element[prop](event.target.result)
      : Object.assign(element, { [prop]: event.target.result })
  }
}

const fileReader = new FileReader()
~~~

_____________________________________________________

Разберите работу кода в Chrome DevTools:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
const selector = document.body
  .appendChild(document.createElement('input'))

Object.assign(selector, {
  type: 'file',
  multiple: true,
  id: 'selectImages',
  style: 'display: none'
})

const label = document.body
  .appendChild(document.createElement('label'))

Object.assign(label, {
  htmlFor: 'selectImages',
  innerText: 'Select images'
})

selector.onchange = function (event) {
  for (const file of event.target.files) {
    if (file.type.split('/')[0] !== 'image') continue

    const picture = document.body
      .appendChild(document.createElement('img'))

    const fileReader = new FileReader()
    fileReader.onload = (image => function (e) {
      image.src = e.target.result
    })(picture)

    fileReader.readAsDataURL(file)
  }
}
~~~
