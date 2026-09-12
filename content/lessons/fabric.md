# ![ico-30 study] {{s1.h1}}

| ![](illustrations/douglas-crockford.jpg) | «_I think the lack of classes is one of JavaScript's great strengths_»<hr>[Douglas Crockford](external/crockford) |

☼☼☼ {{s1.slogan1}} ☼☼☼

{{s1.p1}}

{{s1.p2}}

~~~js
const creator = (name, age) => ({ name, age })
~~~

{{s1.p3}}
{{s1.p4}}
{{s1.p5}}

{{s1.p6}}
{{s1.p7}}

{{s1.p8}}

![ico-25 cap] ** 1**

~~~js
function creator = (name, age) {
  return { name, age }
}
~~~

{{s1.p9}}

~~~js
const user = new creator('Piter', 25)

console.log(user instanceof creator) // false

console.log(user instanceof Object) // true
~~~

{{s1.p10}}

{{s1.p11}}

____________________________

![ico-25 cap] ** 2**

~~~js
function creator () {
  return Array.from(arguments)
}

const obj = new creator(5, 8, 7)

obj instanceof creator  // false
~~~

{{s1.p12}}
{{s1.p13}}

____________________________

![ico-25 cap] ** 3**

~~~js
function simple () {
  return Math.min(...arguments)
}

const obj = new simple

obj instanceof simple  // true
~~~

{{s1.p14}}
{{s1.p15}}

{{s1.p16}}

{{s1.p17}}
______________________________

## ![ico-20 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}

![ico-25 cap] ** 4**

{{s2.p3}}

{{s2.p4}}

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

{{s2.p5}}

~~~console

▼ User {name: "Google", getVar: ƒ}
  ► getVar: ƒ getVar( varName, pincode )
    name: "Google"
  ► __proto__: Object

~~~

_____________________________

![ico-25 cap] ** 5**

{{s2.p6}}
{{s2.p7}}
{{s2.p8}}

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

{{s2.p9}}

~~~console

▼ User {name: "Google", getVar: ƒ}
  ► getVar: ƒ getVar( varName, pincode )
    name: "Google"
  ▼ __proto__:
      ▼ constructor: class User
          ► updateUser: ƒ ( user, params, pin )
            arguments: (...)
            caller: (...)
            length: 1
            name: "User"
            prototype: {constructor: ƒ}
          ► __proto__: ƒ ()
      ► __proto__: Object

~~~

__________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}
{{s3.p3}}

{{s3.p4}}
{{s3.p5}}

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

**visitor**

~~~console

▼ User {talk: ƒ, name: "migrant", timeVisit: "01.11.2018, 13:40:41"}
    name: "migrant"
  ► talk: ƒ ( key )
    timeVisit: "01.11.2018, 13:40:41"
  ► __proto__: Object

~~~

______________________________

**currentUser**

~~~console

▼ User {talk: ƒ, name: "Nick", age: "25", id: 80661698, posts: {…}, …}
    age: "25"
    id: 80661698
    name: "Nick"
  ▼ posts:
        01.11.2018, 13:40:51: "I'm here since 01.11.2018, 13:40:51"
      ► __proto__: Object
  ► registered: (2) ["01.11.2018", "13:40:51"]
  ► talk: ƒ ( key )
  ► write: ƒ ( text )
  ► __proto__: Object

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
  ► __proto__: ƒ ()

~~~

{{s3.p6}}

{{s3.p7}}

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
{{s3.p8}}
{{s3.p9}}
{{s3.p10}}
