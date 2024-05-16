# ![ico-30 study] Design Patterns

_____________________________________

### ![ico-20 icon] Observer

Это **поведенческий** паттерн

Разберем конкретную ситуацию, в которой его можно применить

Есть модель - это данные, которые динамически обновляются

Есть представление - данные должны отображаться пользователю

Нужно обеспечить реактивность приложения, т.е. отображение должно оперативно обновляться при обновлении данных модели

При этом модули должны быть независимы

Как оповестить модуль, отвечающий за представление, об изменении данных модели ?

_______________________________

![ico-25 cap] ** 1**

Пусть есть массив идентификаторов для элементов:

~~~js
const inputs = ['author', 'topic', 'message']
~~~

функция, создающая и вставляющая элемент на страницу:

~~~js
const addElem = (tag = 'input', container = document.body) => (container.nodeType === 1 ? container : document.body).appendChild(document.createElement(tag))
~~~

Создадим массив элементов _~input~_:

~~~js
const observed = inputs.map(item => {
  const elem = Object.assign(addElem(), { id: item })

  Object.assign(addElem('label'), {
    for: item,
    innerText: item
  })

  addElem('br')

  return elem
})
~~~

Итак, пользователь может в любой момент изменить данные модели

_________________________________________________________

Давайте создадим представление:

~~~js
const subscriber = addElem('section')
~~~

можно даже стилизовать этот элемент:

~~~js
subscriber.style = `
  border: inset 1px;
  padding: 10px 20px;
  font-family: Arial;
  color: darkblue;
  margin: 20px;
`
~~~

Будем отображать в **~subscriber~** данные, которые пользователь вводит в поля *~input~*

Для этого создадим ему метод **_~showInfo~_**

~~~js
subscriber.showInfo = function (data) {
  Object.assign(subscriber, data)

  subscriber.innerHTML = `
    <h3>${subscriber.topic}</h3>
    <small>${subscriber.author}</small>
    <p>${subscriber.message}</p>
  `
}
~~~

Этому методу передается объект **_~data~_**, в котором содержатся данные модели

Метод обновляет контент элемента **~subscriber~**

Осталось только "подписать" **~subscriber~** на обновления данных модели

___________________________________________

Создадим класс **~Observer~**:

~~~~js
class Observer {
  constructor (subjects) {
    this.subscribers = []
    this.events = subjects.map(function (elem) {
      elem.oninput = function (event) {
        this.broadcast({ [elem.id]: event.target.value })
      }.bind(this)
      return elem.oninput
    }, this)
  }

  subscibe (client) {
    typeof client === 'function'
      ? this.subscribers.push(client)
      : console.warn('Invalide subscriber')
  }

  unsubscibe (client) {
    this.subscribers = this.subscribers.filter(subscriber !== client)
  }

  broadcast (data) {
    this.subscribers.forEach(client => client(data))
  }
}
~~~~

Конструктору класса **~Observer~** передается массив **_~subjects~_**

Это массив ссылок на элементы _~input~_, которые обозреватель будет отслеживать

при изменении значений элементов обозреватель должен оповестить всех подписчиков об обновлении данных и передать им обновленные данные

^^Подписчики - это функции, которые нужно будет вызвать при изменении данных модели^^
Ссылки на них будут храниться в массиве **_~subscribers~_**

• Для того, чтобы подписаться на уведомления обозревателя, нужно вызвать его метод **_~subscibe~_**
• Для того, чтобы отписаться от уведомлений обозревателя, нужно вызвать его метод **_~unsubscibe~_**
• Для оповещения подписчиков есть метод **_~broadcast~_**

Осталось только создать экземпляр обозревателя **~observer~**, передав ему ссылки на отслеживаемые элементы **_~observed~_**:

~~~js
const observer = new Observer(observed)
~~~

и подписать на его оповещения наше представление **~subscriber~**:

~~~js
observer.subscibe(subscriber.showInfo)
~~~

Тееперь при изменении значений в полях _~input~_ созданное нами представление **~subscriber~** будет реактивно обновляться:

![](https://github.com/garevna/js-course/blob/master/pictures/observer-1.gif?raw=true)


____________________________________________________

Полный код сниппета:

~~~~js
const inputs = ['author', 'topic', 'message']
const addElem = (tag = 'input', container = document.body) => (container.nodeType === 1 ? container : document.body).appendChild(document.createElement(tag))

const observed = inputs.map(item => {
  Object.assign(addElem('label'), {
    for: item,
    innerText: item,
    style: `
      width: 120px;
      margin-right: 16px;
      font-family: Arial;
      font-size: 12px;
    `
  })

  const elem = Object.assign(addElem(), { id: item })

  addElem('br')

  return elem
})

const subscriber = Object.assign(addElem('section'), {
  topic: '',
  author: '',
  message: '',
  style: `
    border: inset 1px;
    padding: 12px 24px;
    font-family: Arial;
    color: #09b;
    margin: 16px;
  `,
  showInfo: function (data) {
    Object.assign(subscriber, data)
    
    subscriber.innerHTML = `
      <h3>Topic: ${subscriber.topic}</h3>
      <small>Author: ${subscriber.author}</small>
      <p>Message: ${subscriber.message}</p>
    `
  }
})

class Observer {
  constructor (subjects) {
    this.subscribers = []
    this.events = subjects.map(function (elem) {
      elem.oninput = function (event) {
        this.broadcast({ [elem.id]: event.target.value })
      }.bind(this)
      return elem.oninput
    }, this)
  }

  subscibe (client) {
    typeof client === 'function'
      ? this.subscribers.push(client)
      : console.warn('Invalide subscriber')
  }

  unsubscibe (client) {
    this.subscribers = this.subscribers.filter(subscriber !== client)
  }

  broadcast (data) {
    this.subscribers.forEach(client => client(data))
  }
}

const observer = new Observer(observed)

observer.subscibe(subscriber.showInfo)
~~~~

![](https://github.com/garevna/js-course/blob/master/pictures/observer-2.gif?raw=true)

Можно создать несколько подписчиков:

~~~js
observer.subscibe(subscriber.showInfo)
observer.subscibe(console.log)
observer.subscibe()
~~~

Теперь вым можете отслеживать изменения не только на странице, но и в консоли

В результате попытки создать подписчика без передачи аргумента observer.subscibe ()
мы получим сообщение от обозревателя:

••Invalide subscriber••

{{{pattern-2.js}}}