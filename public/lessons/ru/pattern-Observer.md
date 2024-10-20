# ![ico-30 study] Design Patterns

_____________________________________

## ![ico-25 icon] Pattern Observer

Это **поведенческий** паттерн.

Разберем конкретную ситуацию, в которой его можно применить.

Есть данные, которые динамически обновляются.

Данные должны отображаться пользователю.

Нужно обеспечить реактивность приложения, т.е. отображение должно оперативно обновляться при обновлении данных модели.

При этом модули должны быть независимы.

Как оповестить модуль, отвечающий за представление данных пользователю, об изменении данных модели?

_______________________________

## ![ico-30 cap] Example 1

Пусть есть массив идентификаторов для элементов:

~~~js
const inputs = ['author', 'topic', 'message']
~~~

Объявим вспомогательную функцию, создающую и вставляющую элемент на страницу:

~~~js
const addElem = (tag = 'input', container = document.body) => (container.nodeType === 1 ? container : document.body)
  .appendChild(document.createElement(tag))
~~~

## ![ico-25 cap] observed

Создадим массив элементов _~input~_:

~~~js
const observed = inputs  
  .map(item => {
    const elem = Object.assign(addElem(), {
      id: item,
      innerText: item,
      placeholder: item
    })
    return elem
  })
~~~

Итак, пользователь может в любой момент изменить данные модели.

_________________________________________________________

### ![ico-25 cap] createSubscriber

Объявим функцию **~createSubscriber~**:

~~~js
function createSubscriber (prop, tagName, container = section) {
  const elem = addElem(tagName)
  return function update (data) {
    data[prop] && Object.assign(elem, {
      innerText: data[prop]
    })
  }
}
~~~

___________________________________________

### ![ico-25 cap] Class Observer

и, наконец, класс **~Observer~**:

~~~js
class Observer {
  constructor (subjects) {
    Object.assign(this, {
      subscribers: [],
      events: subjects.map(function (elem) {
        elem.oninput = function (event) {
          this.broadcast({ [elem.id]: event.target.value })
        }.bind(this)
        return elem.oninput
      }, this)
    })
  }

  subscribe (client) {
    typeof client === 'function'
      ? this.subscribers.push(client)
      : console.error('Invalide subscriber: ' + client)
  }

  unsubscribe (client) {
    this.subscribers = this.subscribers.filter(subscriber !== client)
  }

  broadcast (data) {
    this.subscribers.forEach(client => client(data))
  }
}
~~~

Конструктору класса **~Observer~** передается массив **_~subjects~_**.

Это массив ссылок на элементы _~input~_, которые обозреватель будет отслеживать.

При изменении значений элементов обозреватель должен оповестить всех подписчиков об обновлении данных и передать им обновленные данные.

**Подписчики** - это функции, которые нужно будет вызвать при изменении данных модели.
Ссылки на них будут храниться в массиве **_~subscribers~_**.

• Для того, чтобы подписаться на уведомления обозревателя, нужно вызвать его метод **_~subscibe~_**.
• Для того, чтобы отписаться от уведомлений обозревателя, нужно вызвать его метод **_~unsubscibe~_**.
• Для оповещения подписчиков есть метод **_~broadcast~_**.

### ![ico-25 cap] Observer instance

Осталось только создать экземпляр обозревателя **~observer~**, передав ему ссылки на отслеживаемые элементы **_~observed~_**:

~~~js
const observer = new Observer(observed)
~~~

и подписчиков, которых **~observer~** будет оповещать об изменении данных:

~~~js
observer.subscribe(createSubscriber('topic', 'h3')),
observer.subscribe(createSubscriber('message', 'p')),
observer.subscribe(createSubscriber('author', 'small'))
~~~

Тееперь при изменении значений в полях _~input~_ созданные подписчики будут реактивно обновляться.

_____________________________________

Если "подписать" на обновления данных модели метод console.log:

~~~js
observer.subscribe(outputDevice.write)
~~~

то изменения будут отображаться не только на странице, но и в консоли.

В результате попытки создать подписчика без передачи аргумента:

~~~js
observer.subscibe(null)
~~~

мы получим сообщение от обозревателя:

••Invalide subscriber••

_________________________________________

### ![ico-25 slider-button] Demo 1

{{{pattern-observer.js}}}
____________________________________________________

### ![ico-25 icon] Full code snippet

~~~~js
const inputs = ['topic', 'message', 'author']

const addElem = (tag = 'input', container = section) => (container.nodeType === 1 ? container : section)
  .appendChild(document.createElement(tag))

Object.assign(addElem('style'), {
  textContent: `
    input {
      display: block;
      padding: 4px 12px;
      margin-left: 16px;
    }
  `
})

const observed = inputs  
  .map(item => {
    const elem = Object.assign(addElem(), {
      id: item,
      innerText: item,
      placeholder: item
    })
    return elem
  })

function createSubscriber (prop, tagName, container = section) {
  const elem = container.appendChild(document.createElement(tagName))
  return function update (data) {
    data[prop] && Object.assign(elem, {
      innerText: data[prop]
    })
  }
}

class Observer {
  constructor (subjects) {
    Object.assign(this, {
      subscribers: [],
      events: subjects.map(function (elem) {
        elem.oninput = function (event) {
          this.broadcast({ [elem.id]: event.target.value })
        }.bind(this)
        return elem.oninput
      }, this)
    })
  }

  subscribe (client) {
    typeof client === 'function'
      ? this.subscribers.push(client)
      : console.error('Invalide subscriber: ' + client)
  }

  unsubscribe (client) {
    this.subscribers = this.subscribers.filter(subscriber !== client)
  }

  broadcast (data) {
    this.subscribers.forEach(client => client(data))
  }
}

const observer = new Observer(observed)

observer.subscribe(createSubscriber('topic', 'h3')),
observer.subscribe(createSubscriber('message', 'p')),
observer.subscribe(createSubscriber('author', 'small'))
~~~~

____________________________________________________

## ![ico-30 cap] Example 2

Изменим постановку задачи.
Инициатором изменения значений данных модели не всегда является пользователь.
Т.е. в нашем распоряжении не будет элементов форм с таким удобным свойством ~onchange~.

Предположим, что нужно отслеживать изменение значений элементов массива ~observed~:

~~~js
const observed = ['topic', 'message', 'author']
~~~

Функцию **~createSubscriber~** можно позаимствовать из предыдущего примера, а вот класс **~Observer~** несколько изменится.

### ![ico-25 cap] Class Observer

~~~js
class Observer {
  constructor (subjects) {
    Object.assign(this, {
      subjects: {
        oldValues: JSON.parse(JSON.stringify(subjects)),
        newValues: subjects
      },
      subscribers: []
    })

    this.check()
  }

  check () {
    const modified = this.subjects.newValues.filter((item, index) => item !== this.subjects.oldValues[index])
    if (modified.length) {
      this.subjects.oldValues = JSON.parse(JSON.stringify(this.subjects.newValues))
      this.broadcast(this.subjects.newValues)
    }
    requestAnimationFrame(this.check.bind(this))
  }

  subscribe (client) {
    typeof client === 'function'
      ? this.subscribers.push(client)
      : console.error('Invalide subscriber: ' + client)
    this.broadcast(this.subjects.newValues)
  }

  unsubscribe (client) {
    this.subscribers = this.subscribers.filter(subscriber !== client)
  }

  broadcast (data) {
    this.subscribers.forEach(client => client(data))
  }
}

const observer = new Observer(observed)
~~~

Как видите, каждый "подписчик" отслеживает отдельный элемент массива.
При создании подписчика мы передаем ему индекс отслеживаемого элемента:

~~~js
observer.subscribe(createSubscriber(0, 'h3')),
observer.subscribe(createSubscriber(1, 'p')),
observer.subscribe(createSubscriber(2, 'small'))
~~~

При регистрации нового подписчика ему передается текщее значение отслеживаемого элемента массива.
Сделаем так, чтобы через некоторое время значения элементов отслеживаемого массива изменились:

~~~js
const getRandom = num => Math.max(Math.round(Math.random() * num), 1000)

setTimeout(() => { observed[0] = 'new topic' }, getRandom(5000))
setTimeout(() => { observed[1] = 'new message' }, getRandom(7000))
setTimeout(() => { observed[2] = 'new author' }, getRandom(8000))
~~~

и посмотрим, как работает наше решение.

### ![ico-25 slider-button] Demo 2

{{{pattern-observer-1.js}}}
