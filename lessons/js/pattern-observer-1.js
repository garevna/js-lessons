const section = document.body

section.style = `height: 400px; overflow: auto; background-color: #000; color: #eef; font-family: Arial`

const observed = ['topic', 'message', 'author']

const addElem = (tag = 'input', container = document.body) => (container.nodeType === 1 ? container : document.body)
  .appendChild(document.createElement(tag))

function createSubscriber (index, tagName, container = section) {
  const elem = addElem(tagName)
  return function update (data) {
    Object.assign(elem, {
      innerText: data[index]
    })
  }
}

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

observer.subscribe(createSubscriber(0, 'h3')),
observer.subscribe(createSubscriber(1, 'p')),
observer.subscribe(createSubscriber(2, 'small'))

setTimeout(() => { observed[0] = 'new topic' }, Math.max(Math.round(Math.random() * 5000), 1000))
setTimeout(() => { observed[1] = 'new message' }, Math.max(Math.round(Math.random() * 7000), 1000))
setTimeout(() => { observed[2] = 'new author' }, Math.max(Math.round(Math.random() * 8000), 1000))
