# ![ico-30 study] Design Patterns

_____________________________________

## ![ico-25 icon] Pattern Observer

This is a **behavioral** pattern.

Let's analyze a specific situation in which it can be used.

There is data that is dynamically updated.

The data must be displayed to the user.

We need to ensure that the application is reactive, i.e. the display should be updated quickly when the model data is updated.

At the same time, the modules must be independent.

How do we notify the module responsible for presenting data to the user about changes to the model data?

_______________________________

## ![ico-30 cap] Example 1

Suppose there is an array of identifiers for the elements:

~~~js
const inputs = ['author', 'topic', 'message']
~~~

Let's declare a helper function that creates and inserts an element on the page:

~~~js
const addElem = (tag = 'input', container = document.body) => (container.nodeType === 1 ? container : document.body)
  .appendChild(document.createElement(tag))
~~~

## ![ico-25 cap] observed

Let's create an array of ~input~ elements:

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

So, the user can change the model data at any time.

_________________________________________________________

### ![ico-25 cap] createSubscriber

Let's declare **~createSubscriber~** function:

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

and finally, the **~Observer~** class:

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

The array **_~subjects~_** is passed to the **~Observer~** class.

This is an array of references to ~input~ elements that ~observer~ will track.

When element values change, the ~observer~ must notify all subscribers of the data update and send them the updated data.

**Subscribers** are functions that will need to be called when model data changes.
References to them will be stored in the **~subscribers~** array.

• To subscribe to observer notifications, you need to call its **~subscibe~** method.
• In order to unsubscribe from observer notifications, you need to call its **~unsubscibe~** method.
• There is a **~broadcast~** method to notify subscribers.

### ![ico-25 cap] Observer instance

The only thing left to do is to create an instance of **~Observer~**, passing it references to observed elements:

~~~js
const observer = new Observer(observed)
~~~

and subscribers that the **~observer~** will notify about data changes:

~~~js
observer.subscribe(createSubscriber('topic', 'h3')),
observer.subscribe(createSubscriber('message', 'p')),
observer.subscribe(createSubscriber('author', 'small'))
~~~

Now, when the values in ~input~ fields change, the created subscribers will be reactively updated.

_____________________________________

If you "subscribe" to model data updates, the console.log method:

~~~js
observer.subscribe(outputDevice.write)
~~~

then the changes will be reflected not only on the page, but also in the console.

As a result of trying to create a subscriber without passing an argument:

~~~js
observer.subscibe(null)
~~~

we'll get a message from the observer:

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

Let's change the statement of the problem.
Changes to model data values are not always initiated by the user.
That is, we will not have form elements with such a convenient ~onchange~ property at our disposal.

Suppose you want to track changes in the values of the elements of the ~observed~ array:

~~~js
const observed = ['topic', 'message', 'author']
~~~

**~createSubscriber~** function can be borrowed from the previous example, but the **~Observer~** class is slightly different.

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

As you can see, each "subscriber" keeps track of a separate element of the array.
When we create a subscriber, we pass it the index of the tracked item:

~~~js
observer.subscribe(createSubscriber(0, 'h3')),
observer.subscribe(createSubscriber(1, 'p')),
observer.subscribe(createSubscriber(2, 'small'))
~~~

When a new subscriber registers, the current value of the array element being tracked is passed to the subscriber.
Let's make the values of the elements of the tracked array change after a while:

~~~js
const getRandom = num => Math.max(Math.round(Math.random() * num), 1000)

setTimeout(() => { observed[0] = 'new topic' }, getRandom(5000))
setTimeout(() => { observed[1] = 'new message' }, getRandom(7000))
setTimeout(() => { observed[2] = 'new author' }, getRandom(8000))
~~~

and see how our solution works.

### ![ico-25 slider-button] Demo 2

{{{pattern-observer-1.js}}}
