# ![ico-30 study] Design Patterns

_____________________________________

## ![ico-25 icon] Pattern Observer

Це **поведінкова** модель.

Розберемо конкретну ситуацію, в якій його можна використовувати.

Є дані, які динамічно оновлюються.

Дані повинні відображатися користувачеві.

Необхідно забезпечити реактивність програми, тобто те, що бачить користувач, має оперативно оновлюватися при оновленні даних моделі.

При цьому модулі повинні бути незалежними.

Як сповістити модуль, відповідальний за представлення даних користувачеві, про зміну даних моделі?

_______________________________

## ![ico-30 cap] Приклад 1

Припустимо, існує масив ідентифікаторів елементів:

~~~js
const inputs = ['author', 'topic', 'message']
~~~

Оголосимо допоміжну функцію, яка створює та вставляє елемент на сторінку:

~~~js
const addElem = (tag = 'input', container = document.body) => (container.nodeType === 1 ? container : document.body)
  .appendChild(document.createElement(tag))
~~~

## ![ico-25 cap] observed

Створимо масив ~input~ елементів:

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

Так, користувач може в будь-який момент змінити дані моделі.

_________________________________________________________

### ![ico-25 cap] createSubscriber

Оголосимо функцію **~createSubscriber~**:

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

і, нарешті, клас **~Observer~**:

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

Конструктору класу **~Observer~** передається масив **_~subjects~_**.
Це масив посилань на елементи _~input~_, які оглядач буде відстежувати.

При зміні значень елементів оглядач повинен повідомити всіх підписників про оновлення даних і передати їм оновлені дані.

**Підписники** - це функції, які потрібно буде викликати при зміні даних моделі.
Посилання на них зберігатимуться в масиві **_~subscribers~_**.

• Для того, щоб підписатися на повідомлення оглядача, потрібно викликати його метод **_~subscibe~_**.
• Для того, щоб відписатися від повідомлень оглядача, потрібно викликати його метод **_~unsubscibe~_**.
• Для сповіщення підписників є метод **_~broadcast~_**.

### ![ico-25 cap] Observer instance

Залишилося тільки створити екземпляр оглядача **~observer~**, передавши йому посилання на елементи, що відстежуються **_~observed~_**:

~~~js
const observer = new Observer(observed)
~~~

та підписників, яких **~observer~** сповіщатиме про зміну даних:

~~~js
observer.subscribe(createSubscriber('topic', 'h3')),
observer.subscribe(createSubscriber('message', 'p')),
observer.subscribe(createSubscriber('author', 'small'))
~~~

Тепер при зміні значень у полях _~input~_ створені підписники реактивно оновлюватимуться.

_____________________________________

Якщо "підписати" на оновлення даних моделі метод console.log:

~~~js
observer.subscribe(outputDevice.write)
~~~

то зміни відображатимуться не лише на сторінці, а й у консолі.

Внаслідок спроби створити підписника без передачі аргументу:

~~~js
observer.subscibe(null)
~~~

ми отримаємо повідомлення від оглядача:

••Invalide subscriber••

_________________________________________

### ![ico-25 slider-button] Demo 1

{{{pattern-observer.js}}}
____________________________________________________

### ![ico-25 icon] Повний фрагмент коду

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

Змінимо постановку задачі.
Ініціатором зміни значень даних моделі не завжди є користувач.
Тобто у нашому розпорядженні не буде елементів форм із такою зручною властивістю ~onchange~.

Припустимо, що слід відстежувати зміну значень елементів масиву ~observed~:

~~~js
const observed = ['topic', 'message', 'author']
~~~

Функцію **~createSubscriber~** можна запозичити з попереднього прикладу, а ось клас **~Observer~** дещо зміниться.

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

Як бачите, кожен підписник відстежує окремий елемент масиву.
При створенні підписника ми передаємо індекс елемента, що відстежується:

~~~js
observer.subscribe(createSubscriber(0, 'h3')),
observer.subscribe(createSubscriber(1, 'p')),
observer.subscribe(createSubscriber(2, 'small'))
~~~

При реєстрації нового підписника йому передається поточне значення елемента масиву, що відстежується.
Зробимо так, щоб через деякий час значення елементів масиву, що відстежується, змінилися:

~~~js
const getRandom = num => Math.max(Math.round(Math.random() * num), 1000)

setTimeout(() => { observed[0] = 'new topic' }, getRandom(5000))
setTimeout(() => { observed[1] = 'new message' }, getRandom(7000))
setTimeout(() => { observed[2] = 'new author' }, getRandom(8000))
~~~

і побачимо, як працює наше рішення.

### ![ico-25 slider-button] Demo 2

{{{pattern-observer-1.js}}}
