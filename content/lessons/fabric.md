# ![ico-30 study] {{p1}}

| ![](illustrations/douglas-crockford.jpg) | «_I think the lack of classes is one of JavaScript's great strengths_»<hr>[Douglas Crockford](external/crockford) |

☼☼☼ {{p2}} ☼☼☼

{{p3}}

{{p4}}

~~~js
const creator = (name, age) => ({ name, age })
~~~

{{p5}}
{{p6}}
{{p7}}

{{p8}}
{{p9}}

{{p10}}

![ico-25 cap] ** 1**

~~~js
function creator = (name, age) {
  return { name, age }
}
~~~

{{p11}}

~~~js
const user = new creator('Piter', 25)

console.log(user instanceof creator) // false

console.log(user instanceof Object) // true
~~~

{{p12}}

{{p13}}

____________________________

![ico-25 cap] ** 2**

~~~js
function creator () {
  return Array.from(arguments)
}

const obj = new creator(5, 8, 7)

obj instanceof creator  // false
~~~

{{p14}}
{{p15}}

____________________________

![ico-25 cap] ** 3**

~~~js
function simple () {
  return Math.min(...arguments)
}

const obj = new simple

obj instanceof simple  // true
~~~

{{p16}}
{{p17}}

{{p18}}

{{p19}}
______________________________

## ![ico-20 icon] {{p20}}

{{p21}}
•••• none
{{p41}}
{{p42}}
{{p43}}
••••

![ico-25 cap] ** 4**

{{p23}}

{{p24}}

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

{{p25}}

~~~console

▼ User {name: "Google", getVar: ƒ}
  ► getVar: ƒ getVar( varName, pincode )
    name: "Google"
  ► [[Prototype]]: Object

~~~

_____________________________

![ico-25 cap] ** 5**

{{p26}}
{{p27}}
{{p28}}

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

{{p29}}

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

## ![ico-25 icon] {{p30}}

{{p31}}

{{p32}}
{{p33}}

{{p34}}
{{p35}}

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

{{p36}}

{{p37}}

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
{{p38}}
{{p39}}
{{p40}}
