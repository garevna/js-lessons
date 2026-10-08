# ![ico-30 study] super в литералах объектов⟪super_v_lyteralakh_obъektov⟫

Ключевое слово **~super~** можно использовать без объявления классов.
![ico-25 warn] **~super~** является ссылкой на прототип объекта.
Поэтому можно использовать его для доступа к свойствам и методам объекта-прототипа.

••![ico-30 memo] _В этом разделе мы будем использовать объекты, объявленные в литеральной форме_.••

••••
![ico-20 pin] В примерах, которые будут далее, в качестве прототипа объекта **_person_** будет выступать объект **_human_**.
^^  Назначать объект **_human_** прототипом объекта **_person_** мы будем с помощью метода **_Object.setPrototypeOf()_**^^
^^  После такого назначения внутри объекта **_person_** свойства и методы объекта **_human_** будут доступны с помощью ключевого слова **_super_**.^^
![ico-20 pin] будем использовать функцию **_addElem()_** создания элемента DOM:
••••

◘◘![ico-25 cap] **addElem**◘◘

~~~js
function addElem (tag, props = {}, container = document.body) {
  const elem = container.appendChild(document.createElement(tag))
  Object.assign(elem, props, { style: 'font-family: Arial; color: #09b' })
  return elem
}
~~~

^^![ico-25 speach] В следующем примере вызовем метод **~say()~** прототипа **~human~** из метода **~talk()~** объекта **~person~** с помощью ключевого слова **~super~**:^^

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

Выведем полученный объект **~person~** в консоль:

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

→→→ Что появится на странице? | 'Authentication code', 'Operation failed.', 'Ничего', 'Оба сообщения' | Оба сообщения →→→

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

## ![ico-20 icon] super vs this & &#95;&#95;proto&#95;&#95;⟪super_vs_this_&_&#95;&#95;proto&#95;&#95;⟫

^^В этом примере демонстрируется взаимозаменяемость ключевых слов **~super~** и **~this~** при ссылках на свойства прототипа.^^
![ico-20 speach] ^^Метод **~say()~** объекта **~admin~** вызывает метод **~output()~** прототипа без ключевого слова **~super~** (с ключевым словом **~this~**).^^
![ico-20 speach] ^^Когда метод **~output()~** в объекте **~admin~** не будет найден, поиск будет продолжен в прототипе, где и будет благополучно найден.^^

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

![ico-20 speach] ^^Если же имена свойств объекта и его прототипа совпадают, и нужно вытянуть именно свойство прототипа, а не собственное свойство объекта, то для унаследованных свойств можно использовать ~__proto__~.^^

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

![ico-25 speach] ^^Однако очевидно, что код:^^

~~~js
super.output(text)
~~~

^^гораздо читабельнее и аккуратнее, чем^^

~~~js
this.__proto__.output(text)
~~~

^^а результат идентичный^^ ![ico-25 smile]

___________________________________________________

## ![ico-20 icon] get & set⟪get_&_set⟫

![ico-20 speach] ^^В этом примере мы используем геттеры и сеттеры свойств объектов.^^

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

^^Для вычисляемых свойств это наиболее корректный способ доступа к их значениям.^^

___________________________________________________
