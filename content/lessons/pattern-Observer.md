# ![ico-30 study] {{s1.h1}}

_____________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}

{{s2.p7}}

_______________________________

## ![ico-30 cap] {{s3.h1}}

{{s3.p1}}

~~~js
const inputs = ['author', 'topic', 'message']
~~~

{{s3.p2}}

~~~js
const addElem = (tag = 'input', container = document.body) => (container.nodeType === 1 ? container : document.body)
  .appendChild(document.createElement(tag))
~~~

## ![ico-25 cap] {{s4.h1}}

{{s4.p1}}

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

{{s4.p2}}

_________________________________________________________

### ![ico-25 cap] {{s5.h1}}

{{s5.p1}}

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

### ![ico-25 cap] {{s6.h1}}

{{s6.p1}}

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

{{s6.p2}}

{{s6.p3}}

{{s6.p4}}

{{s6.p5}}
{{s6.p6}}

{{s6.p7}}
{{s6.p8}}
{{s6.p9}}

### ![ico-25 cap] {{s7.h1}}

{{s7.p1}}

~~~js
const observer = new Observer(observed)
~~~

{{s7.p2}}

~~~js
observer.subscribe(createSubscriber('topic', 'h3')),
observer.subscribe(createSubscriber('message', 'p')),
observer.subscribe(createSubscriber('author', 'small'))
~~~

{{s7.p3}}

_____________________________________

{{s7.p4}}

~~~js
observer.subscribe(outputDevice.write)
~~~

{{s7.p5}}

{{s7.p6}}

~~~js
observer.subscibe(null)
~~~

{{s7.p7}}

{{s7.p8}}

_________________________________________

### ![ico-25 slider-button] {{s8.h1}}

{{{pattern-observer.js}}}
____________________________________________________

### ![ico-25 icon] {{s9.h1}}

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

## ![ico-30 cap] {{s10.h1}}

{{s10.p1}}
{{s10.p2}}
{{s10.p3}}

{{s10.p4}}

~~~js
const observed = ['topic', 'message', 'author']
~~~

{{s10.p5}}

### ![ico-25 cap] {{s11.h1}}

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

{{s11.p1}}
{{s11.p2}}

~~~js
observer.subscribe(createSubscriber(0, 'h3')),
observer.subscribe(createSubscriber(1, 'p')),
observer.subscribe(createSubscriber(2, 'small'))
~~~

{{s11.p3}}
{{s11.p4}}

~~~js
const getRandom = num => Math.max(Math.round(Math.random() * num), 1000)

setTimeout(() => { observed[0] = 'new topic' }, getRandom(5000))
setTimeout(() => { observed[1] = 'new message' }, getRandom(7000))
setTimeout(() => { observed[2] = 'new author' }, getRandom(8000))
~~~

{{s11.p5}}

### ![ico-25 slider-button] {{s12.h1}}

{{{pattern-observer-1.js}}}
