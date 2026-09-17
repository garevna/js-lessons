# ![ico-30 study] Design Patterns

_____________________________________

## ![ico-25 icon] Pattern Observer

{{p1}}

{{p2}}

{{p3}}

{{p4}}

{{p5}}

{{p6}}

{{p7}}

_______________________________

## ![ico-30 cap] Example 1

{{p8}}

~~~js
const inputs = ['author', 'topic', 'message']
~~~

{{p9}}

~~~js
const addElem = (tag = 'input', container = document.body) => (container.nodeType === 1 ? container : document.body)
  .appendChild(document.createElement(tag))
~~~

## ![ico-25 cap] observed

{{p10}}

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

{{p11}}

_________________________________________________________

### ![ico-25 cap] createSubscriber

{{p12}}

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

{{p13}}

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

{{p14}}

{{p15}}

{{p16}}

{{p17}}
{{p18}}

{{p19}}
{{p20}}
{{p21}}

### ![ico-25 cap] Observer instance

{{p22}}

~~~js
const observer = new Observer(observed)
~~~

{{p23}}

~~~js
observer.subscribe(createSubscriber('topic', 'h3')),
observer.subscribe(createSubscriber('message', 'p')),
observer.subscribe(createSubscriber('author', 'small'))
~~~

{{p24}}

_____________________________________

{{p25}}

~~~js
observer.subscribe(outputDevice.write)
~~~

{{p26}}

{{p27}}

~~~js
observer.subscibe(null)
~~~

{{p28}}

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

{{p29}}
{{p30}}
{{p31}}

{{p32}}

~~~js
const observed = ['topic', 'message', 'author']
~~~

{{p33}}

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

{{p34}}
{{p35}}

~~~js
observer.subscribe(createSubscriber(0, 'h3')),
observer.subscribe(createSubscriber(1, 'p')),
observer.subscribe(createSubscriber(2, 'small'))
~~~

{{p36}}
{{p37}}

~~~js
const getRandom = num => Math.max(Math.round(Math.random() * num), 1000)

setTimeout(() => { observed[0] = 'new topic' }, getRandom(5000))
setTimeout(() => { observed[1] = 'new message' }, getRandom(7000))
setTimeout(() => { observed[2] = 'new author' }, getRandom(8000))
~~~

{{p38}}

### ![ico-25 slider-button] Demo 2

{{{pattern-observer-1.js}}}
