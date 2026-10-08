# ![ico-30 study] {{p1}}

{{p2}}
{{p3}}
{{p4}}

{{p5}}

••••
{{p6}}
{{p7}}
{{p8}}
{{p9}}
••••

◘◘![ico-25 cap] **addElem**◘◘

~~~js
function addElem (tag, props = {}, container = document.body) {
  const elem = container.appendChild(document.createElement(tag))
  Object.assign(elem, props, { style: 'font-family: Arial; color: #09b' })
  return elem
}
~~~

{{p10}}

♦♦♦1♦♦♦

~~~js
const human = {
  place: addElem('h3', { id: 'demo' }),
  say (text) {
    this.place.textContent = text
  }
}

const person = {
  talk (text) {
    super.say(text)
  }
}

Object.setPrototypeOf(person, human)
person.talk('super')
~~~

{{p11}}

~~~console
▼ {talk: ƒ}
  ► talk: ƒ talk(text)
  ▼ [[Prototype]]: Object
    ► place: h3#demo
    ► say: ƒ say(text)
    ► [[Prototype]]: Object
~~~

___________________________________________________

♦♦♦2♦♦♦

~~~js
const human = {
  id: 'human-demo',
  getPlace (id) {
    return document.getElementById(id) || addElem('h2', { id })
  },
  say (text, id) {
    this.getPlace(id).textContent = text
  }
}

let person = {
  id: 'person-demo',
  sayToParent (text) {
    super.say(text, super.id)
  },
  say (text) {
    super.say(text, this.id)
  }
}

Object.setPrototypeOf(person, human)

person.sayToParent('Authentication code')
person.say('Operation failed.')
~~~

→→→ {{p12}} | {{p13}} | {{p14}} →→→

___________________________________________________

♦♦♦3♦♦♦

~~~js
const human = {
  place: (() => addElem('h2', { id: 'demo' }))()
}

let person = {
  talk (text) {
    super.place.textContent = text
  }
}

Object.setPrototypeOf(person, human)
person.talk('Authentication code')
setTimeout(() => person.talk('Operation failed.'), 3000)
~~~

~~~tests
→→→ Что появится на странице сразу после запуска кода? | 'Authentication code', 'Operation failed.', 'Ничего', 'Оба сообщения' | Authentication code →→→
→→→ Что будет на странице через 5 секунд после запуска кода? | 'Authentication code', 'Operation failed.', 'Ничего', 'Оба сообщения' | Operation failed. →→→
→→→ Какой прием использован при объявлении свойства place объекта human? | Замыкание, 'IIFE', 'Каррирование', 'Никакого' | IIFE →→→
~~~

___________________________________________________

## ![ico-20 icon] super vs this & &#95;&#95;proto&#95;&#95;

{{p15}}
{{p16}}
{{p17}}

♦♦♦4♦♦♦

~~~js
const core = {
  place: (() => addElem('h2', { id: 'demo' }))(),
  output (text) {
    this.place.textContent = text
  } 
}

const admin = {
  say (text) {
    this.output(`Admin says:\n${text}`)
  }
}

Object.setPrototypeOf(admin, core)
core.output('Authentication code')
setTimeout(() => admin.say('Access denied.'), 3000)
~~~

{{p18}}

~~~js
const admin = {
  output (text) {
    this.__proto__.output(text)
  }
}

Object.setPrototypeOf(admin, core)
core.output('Authentication code')
setTimeout(() => admin.output('Access denied.'), 3000)
~~~

{{p19}}

~~~js
super.output(text)
~~~

{{p20}}

~~~js
this.__proto__.output(text)
~~~

{{p21}}

___________________________________________________

## ![ico-20 icon] get & set

{{p22}}

♦♦♦5♦♦♦

~~~js
const human = {
  id: '',
  get place () {
    if (this.id) return document.getElementById(this.id)
  },
  set place (newId) {
    this.id = newId
    document.getElementById(this.id) || addElem('h3', { id: this.id })
  },
  get message () {
    return this.place.innerText
  },
  set message (val) {
    this.place.innerText = val
  }
}

const person = {
  talk (text) {
    super.message = text
  },
  get place () {
    return super.place
  },
  set place (newId) {
    super.place = newId
  }
}

Object.setPrototypeOf(person, human)
person.place = 'demo'
person.talk('Authentication code')
setTimeout(() => person.talk('Sorry, operation failed.'), 3000)
~~~

{{p23}}

___________________________________________________
