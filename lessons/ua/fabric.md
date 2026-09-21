# ![ico-30 study] Фабричні методи⟪Factory_methods⟫

| ![](illustrations/douglas-crockford.jpg) | «_I think the lack of classes is one of JavaScript's great strengths_»<hr>[Douglas Crockford](external/crockford) |

☼☼☼ Просто скажи «new», і кожна функція поверне об’єкт ☼☼☼

^^Причому не має значення, чи є в тілі функції оператор ~return~.^^

Якщо вона робить це без використання ключового слова **_~new~_**, то така функція є **фабрикою**:

~~~js
const creator = (name, age) => ({ name, age })
~~~

У цьому прикладі ми використовуємо стрілкову функцію, яка за визначенням не може бути конструктором через відсутність у неї властивості **~prototype~**.
Вона є фабрикою, тому що повертає об’єкт.
І цей об’єкт нічого не знатиме про функцію **~creator~**. Він буде екземпляром **~Object~**.

![ico-20 warn] Функція може бути або фабрикою, або конструктором.
Доведемо це твердження.

Необхідною, але недостатньою (![ico-20 warn]) умовою того, щоб функція стала фабрикою, є наявність оператора **~return~**.

![ico-25 cap] ** 1**

~~~js
function creator = (name, age) {
  return { name, age }
}
~~~

У цьому прикладі функція **~creator~** повертає об’єкт. Чудово, подивимося, що вона поверне, якщо ми викличемо її з ключовим словом **~new~**:

~~~js
const user = new creator('Piter', 25)

console.log(user instanceof creator) // false

console.log(user instanceof Object) // true
~~~

Функція **~creator~** вже не може бути конструктором, і використання ключового слова **~new~** жодним чином не впливає на її поведінку.

Функція **~creator~** створює екземпляри конструктора **~Object~**.

____________________________

![ico-25 cap] ** 2**

~~~js
function creator () {
  return Array.from(arguments)
}

const obj = new creator(5, 8, 7)

obj instanceof creator  // false
~~~

У цьому прикладі функція **~creator~** повертає масив.
Але масив є об’єктом, тому функція **~creator~** приречена бути фабрикою і ніколи не зможе стати конструктором.

____________________________

![ico-25 cap] ** 3**

~~~js
function simple () {
  return Math.min(...arguments)
}

const obj = new simple

obj instanceof simple  // true
~~~

Функція **~simple~** повертає число (можливо, NaN або ~Infinity~). Чи можна сказати, що вона є фабрикою? — Ні, оскільки вона повертає **не об’єкт**.
При виклику з ключовим словом **~new~** вона повертає екземпляр **~simple~**.

Аналогічна ситуація буде у випадку, якщо функція повертає рядок, або ~null~, або ~undefined~. Можете перевірити самостійно.

Тобто функція буде фабрикою лише в тому випадку, якщо вона повертає екземпляр **~Object~**.
______________________________

## ![ico-20 icon] ООП-об’єкти та структури даних⟪OOP_objects_and_data_structures⟫

••^^Роберт Мартін, «Чистий код»:^^••
•••• none
_Об’єкти забезпечують поведінку та приховують дані
Структури даних надають дані,
але не мають жодної значущої поведінки_
••••

![ico-25 cap] ** 4**

**Паттерн «_Модуль_»**

^^У цьому прикладі за допомогою IIFE та замикання створюється об’єкт, дані якого приховані від безпосереднього доступу й доступні лише через інтерфейс, представлений методом _**getVar**_^^

~~~js
const google = (function (params, pin) {
  return {
    getVar (varName, pincode) {
      return pin === pincode ? params[varName] : 'Forbidden'
    }
  }
})({
  name: 'Google',
  token: 'A7fgh14-771pd-ufr147'
}, '789541')

console.log(google.getVar('token'))            // No access
console.log(google.getVar('name', '789541'))   // Google
~~~

^^Виведемо об’єкт **google** у консоль:^^

~~~console

▼ User {name: "Google", getVar: ƒ}
  ► getVar: ƒ getVar( varName, pincode )
    name: "Google"
  ► [[Prototype]]: Object

~~~

_____________________________

![ico-25 cap] ** 5**

^^У цьому прикладі ми робимо те саме, але використовуємо розширення класу _User_^^
^^Конструктор класу створює публічну властивість _name_^^
^^Фабричний метод класу _updateUser_ дозволяє розширити функціонал класу, створити приховані дані, доступні через інтерфейс (метод _**getVar**_)^^

~~~~js
class User {
  constructor (name) {
    this.name = name || 'unknown'
  }
}

User.updateUser = function (user, params, pin) {
  return Object.assign(user, {
    getVar (varName, pincode) {
      return pin === pincode ? params[varName] : 'Access denied'
    }
  })
}

const google = User.updateUser(new User('Google'), {
  token: 'AfG78-1nm*15ph',
  cash: 25000
}, '789451')

google.getVar('token', '789451')  // "AfG78-1nm*15ph"
google.getVar('cash', '789451')   // 25000
~~~~

^^Виведемо об’єкт **google** у консоль:^^

~~~console

▼ User {name: "Google", getVar: ƒ}
  ► getVar: ƒ getVar( varName, pincode )
    name: "Google"
  ▼ [[Prototype]]:
      ▼ constructor: class User
          ► updateUser: ƒ ( user, params, pin )
            arguments: (...)
            caller: (...)
            length: 1
            name: "User"
            prototype: {constructor: ƒ}
          ► [[Prototype]]: ƒ ()
      ► [[Prototype]]: Object

~~~

__________________________________

## ![ico-25 icon] Поліморфізм⟪Polymorphism⟫

Фабричні методи дають можливість розширювати функціональність конструктора, забезпечуючи його поліморфізм.

У наступному прикладі конструктор  **User**  має фабричний метод   **_createNewUser_**,
що дозволяє створювати екземпляри класу з різним набором властивостей і методів.

екземпляри  **visitor**  та  **currentUser**,  створені конструктором  **User**,
мають різні властивості та методи.

![ico-25 cap] ** 6**

~~~~js
function User () {
  this.talk = function (key) {
    document.write(`<p>${key}: <b>${this[key]}</b></p>`)
  }
}

User.createNewUser = function (params) {
  const user = new this
  for (const key in params) user[key] = params[key]
  return user
}

const visitor = User.createNewUser({
  name: 'migrant',
  timeVisit: new Date().toLocaleString()
})

visitor.talk('name')
visitor.talk('timeVisit')

const currentUser = User.createNewUser({
  name: prompt('What is your name?'),
  age: prompt('How old are you?'),
  id: Date.now(),
  posts: {},
  registered: new Date().toISOString().slice(0, 10),
  write: function (text) {
    this.posts = Object.assign(this.posts, {
      [new Date().toLocaleString()] : text
    })
  }
})

currentUser.talk('name')
currentUser.talk('registered')
currentUser.write(`I'm here since ${new Date().toLocaleString()}`)
~~~~

_____________________________

~~~console

▼ User {talk: ƒ, name: "migrant", timeVisit: "01.11.2018, 13:40:41"}
    name: "migrant"
  ► talk: ƒ ( key )
    timeVisit: "01.11.2018, 13:40:41"
  ► [[Prototype]]: Object

~~~

______________________________

~~~console

▼ User {talk: ƒ, name: "Nick", age: "25", id: 80661698, posts: {…}, …}
    age: "25"
    id: 80661698
    name: "Nick"
  ▼ posts:
        01.11.2018, 13:40:51: "I'm here since 01.11.2018, 13:40:51"
      ► [[Prototype]]: Object
  ► registered: (2) ["01.11.2018", "13:40:51"]
  ► talk: ƒ ( key )
  ► write: ƒ ( text )
  ► [[Prototype]]: Object

~~~

_________________________________________

~~~js
console.dir(currentUser.__proto__.constructor)
~~~

~~~console

▼ ƒ User()
    createNewUser: ƒ ( params )
    arguments: null
    caller: null
    length: 0
    name: "User"
    prototype: {constructor: ƒ}
  ► [[Prototype]]: ƒ ()

~~~

Отримали _перелічуваний_ статичний метод **_createNewUser_** конструктора.

Зробимо те саме за допомогою класу:

~~~js
class User {
  constructor () {
    this.talk = function (key) {
      document.write(`<p>${key}: <b>${this[key]}</b></p>`)
    }
  }

  static createNewUser (params) {
    const user = new this
    for (const key in params) user[key] = params[key]
    return user
  }
}
~~~
У цьому випадку статичний метод класу **_createNewUser_** буде неперелічуваним,<br/>
а в іншому все буде аналогічно варіанту з конструктором<br/>
^^Тож «під капотом» працює те саме прототипне успадкування, тільки з косметичними «добавками».^^
