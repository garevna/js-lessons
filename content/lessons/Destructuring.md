# ![ico-40 icon] {{s1.h1}}

**ES6**

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}
{{s1.p4}}
{{s1.p5}}

{{s1.p6}}

{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

_______________________________________________________________

## ![ico-25 icon] {{common.c34}}

{{s2.p1}}

◘◘![ico-20 cap] 1◘◘

~~~js
const fruits = ['банан', 'апельсин', 'киви']
const [var1, var2, var3] = fruits

console.info(var1)   // "банан"
console.info(var2)   // "апельсин"
console.info(var3)   // "киви"

// функция getArr возвращает массив

const getArr = deg => [Math.sin(deg), Math.cos(deg)]

// Получим результат ее работы в переменные  sin30  и  cos30

const [sin30, cos30] = getArr(Math.PI/3)

console.info(sin30)  // 0.8660254037844386
console.info(cos30)  // 0.5
~~~

___________________________________________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

◘◘![ico-20 cap] 2◘◘

~~~js
let x = 5, y = 7, z = 9;

[x, y, z] = [y, z, x];

console.info(x)  // 7
console.info(y)  // 9
console.info(z)  // 5
~~~

___________________________________________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

◘◘![ico-20 cap] 3◘◘

~~~js
const getAngleData = deg => ([
  Math.sin(deg),
  Math.cos(deg),
  Math.tan(deg),
  Math.atan(deg)
])

const [sin30, cos30, , arctg30] = getAngleData(Math.PI/3)

console.info(sin30)  // 0.8660254037844386
console.info(cos30)  // 0.5
console.info(arctg30)  // 0.808448792630022
~~~

~~~js
const calcAngleData = (funcs => deg => funcs.map(func => Math[func](deg)))(['sin', 'cos', 'tan', 'atan'])
console.log(calcAngleData(Math.PI/3))
~~~

___________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

~~~js
const array = [5, 1, 4, 9, 3, 8, 0]
~~~

{{s5.p2}}

◘◘![ico-20 cap] 4◘◘

~~~js
array.forEach((item, index, arr) => {
  let [current, prev] = [index, index]
  while (--prev >= 0) {
    if (arr[current] < arr[prev]) {
      [arr[prev], arr[current]] = [arr[current], arr[prev]];
      current = prev
    }
  }
})
~~~

{{s5.p3}}

~~~console
[0, 1, 3, 4, 5, 8, 9]
~~~

{{s5.p4}}

~~~js
const array = ['undefined', 'number', 'boolean', 'string', 'function', 'symbol', 'object']
~~~

{{s5.p5}}

{{s5.p6}}

~~~console
["boolean", "function", "number", "object", "string", "symbol", "undefined"]
~~~

_____________________________________________________________

## ![ico-25 icon] Date()

~~~js
new Date(...new Date().toLocaleDateString().split('.').reverse())
~~~

{{s5.p7}}

~~~js
user.birthday = new Date(...).toLocaleDateString()
~~~

{{common.c6}}

~~~js
user.birthday = '27.05.2001'
~~~

{{s5.p9}}

~~~js
const userBirthday = new Date(...user.birthday.split('.').reverse())
~~~

_____________________________________________________________

## ![ico-25 icon] {{common.c25}}

{{s6.p1}}

{{s6.p2}}
{{s6.p3}}

◘◘![ico-20 cap] 5◘◘

~~~js
const user = {
  name: 'Georg',
  role: 'admin',
  stars: 5
}

const { name, role, stars } = user

console.info(name)   // "Georg"
console.info(role)   // "admin"
console.info(stars)  // 5
~~~

{{s6.p4}}

~~~js
let name, age

({ name, age } = { name: 'Ivan', age: 25 })
~~~

{{s6.p5}}

~~~console
⛔️ Uncaught SyntaxError: Unexpected token =
~~~

{{s6.p6}}
{{s6.p7}}

◘◘![ico-20 cap] 6◘◘

~~~js
const user = {
  login: 'Ivan',
  age: 42,
  works: true
}

const {
  login: userName,
  works: employed
} = user

console.log(userName)   // "Ivan"
console.log(employed)   // true
~~~

{{s6.p8}}

{{s6.p9}}

____________________________________________________________________

◘◘![ico-20 cap] 7◘◘

~~~js
const {
  login = 'Сергей',
  speciality = 'слесарь'
} = { login: 'Ivan', age: 42 }

console.log(login)       // "Ivan"
console.log(speciality)  // "слесарь"
~~~

----------------------------------------------------------------------

## ![ico-25 icon] {{s7.h1}}

◘◘![ico-20 cap] 8◘◘

~~~js
const humans = [
  {
    name: 'Stephan',
    age: 38,
    speciality: 'worker'
  },
  {
    name: 'Mary',
    age: 45,
    speciality: 'teacher'
  },
  {
    name: 'Peter',
    age: 18,
    speciality: 'student'
  }
]

const [, , { name, age, speciality }] = humans

console.log(name, age, speciality)  // Peter 18 student
~~~

◘◘![ico-20 cap] 9◘◘

~~~ js
const user = {
  name: 'Peter',
  age: 30,
  hobby: ['football', 'fishing', 'sleeping'],
  family: {
    mother: {
      name: 'Mary',
      age: 55,
      hobby: ['flowers', 'walks']
    },
    father: {
      name: 'Joseph',
      age: 60,
      hobby: ['safari', 'run']
    }
  }
}

const { hobby: [, , last] } = user

console.log(last)  // sleeping

const { family: { mother } } = user

console.log(mother) // { name: 'Mary', age: 55, hobby: Array(2) }

const { family: { mother: { name: motherName } } } = user

console.log(motherName)  // Mary

const { family: { mother: { hobby: [, motherLastHobby] } } } = user

console.log(motherLastHobby)  // walks
~~~

____________________________________________________________________


## ![ico-25 icon] {{s8.h1}}

{{s8.p1}}
{{s8.p2}}
{{s8.p3}}

◘◘![ico-20 cap] 10◘◘

~~~js
const getAngleData = deg => (['sin', 'cos', 'tan', 'atan'].map(func => Math[func](deg)))

const show = function () {
  for (const arg of arguments) {
    console.log(arg)
  }
}

show(...getAngleData(Math.PI/3))
~~~

~~~console
0.8660254037844386
0.5000000000000001
1.7320508075688767
0.808448792630022
~~~

{{s8.p4}}

{{s8.p5}}
{{s8.p6}}

~~~js
const [sin30, ...rest30] = getAngleData(Math.PI/3)

console.info(sin30)  // 0.8660254037844386
console.log(rest30)
~~~

~~~console
(3) [0.5000000000000001, 1.7320508075688767, 0.808448792630022]
~~~

_______________________________________

### ![ico-20 icon] {{s9.h1}}

◘◘![ico-20 cap] 11◘◘

~~~js
const user = {
  name: 'Piter',
  pass: 'xYc9-8a/bbb',
  age: 25,
  email: 'piter@gmail.com',
  hobby: 'football'
}
~~~

~~~js
const { pass, ...userWithoutPass } = user

console.log(pass)   // xYc9-8a/bbb
console.log (userWithoutPass)
~~~

~~~console
▼ {name: "Piter", age: 25, email: "piter@gmail.com", hobby: "football"}
    age: 25
    email: "piter@gmail.com"
    hobby: "football"
    name: "Piter"
  ► __proto__: Object
~~~

_______________________________________

### ![ico-20 icon] {{s10.h1}}

{{s10.p1}}
{{s10.p2}}
{{s10.p3}}
{{s10.p4}}
{{s10.p5}}

◘◘![ico-20 cap] 12◘◘

~~~js
const array = [1, 2, 3, 4, 5]

const clone = new Array(...array)
~~~

{{s10.p6}}
{{s10.p7}}
{{s10.p8}}

~~~js
const first = [1, 2, 3, 4, 5]
const second = [10, 20, 30]

const clone = new Array(...first, ...second)
~~~

___________________________

## ![ico-20 icon] Immutability

{{s10.p9}}
{{s10.p10}}
{{s10.p11}}
{{s10.p12}}

◘◘![ico-20 cap] 13◘◘

~~~js
const numbers = [10, 5, 7]
const result = 0

const summation = () => {
  let result = 0
  return array => {
    while (array.length) result += array.shift()
    return result
  }
}
~~~

{{s10.p13}}
{{s10.p14}}

~~~js
console.log((summation())([...numbers]))
console.log(numbers)
console.log(result)
~~~

____________________________________________________________

{{s10.p15}}

{{s10.p16}}

◘◘![ico-20 cap] 14 (html)◘◘

~~~html
<body>
  <p class="paragraph">1</p>
  <p class="paragraph">2</p>
  <p class="paragraph">3</p>
  <p class="paragraph">4</p>
</body>
~~~

◘◘![ico-20 cap] 14 (JS)◘◘

~~~js
const [first, second, third, forth] = document.querySelectorAll('.paragraph')

console.log(first)   // <p class="paragraph">1</p>
console.log(second)  // <p class="paragraph">2</p>
console.log(third)   // <p class="paragraph">3</p>
console.log(forth)   // <p class="paragraph">4</p>
~~~

____________________________________________________________________

{{s10.p17}}

{{common.c24}}

◘◘![ico-20 cap] 15 (html)◘◘

~~~html
<body>
    <button id="registration">Регистрация</button>
    <button id="sign-in">Вход</button>
    <h3 id="title">Hello</h3>
    <div id="demo">
        <p>User name:</p>
        <input id="name"/>
        <p>password:</p>
        <input id="pass" type="password"/>
        <button>Submit</button>
    </div>
</body>
~~~

{{s10.p19}}

◘◘![ico-20 cap] 15 (JS)◘◘

~~~js
const demo = document.getElementById('demo')
const btnReg = document.getElementById('registration')
const btnSignIn = document.getElementById('sign-in')
const nameElem = document.getElementById('name')
const passElem = document.getElementById('pass')
const title = document.getElementById('title')
~~~

{{s10.p20}}

~~~js
const [demo, btnReg, btnSignIn, nameElem, passElem, title] = ['demo', 'registration', 'sign-in', 'name', 'pass', 'title']
  .map(id => document.getElementById(id))
~~~

_______________________________________________________________________

{{s10.p21}}

{{s10.p22}}

◘◘![ico-20 cap] 16◘◘

~~~js
const lettersCounter = str => Object.assign({}, ...str
  .split('')
  .map(letter => ({ [letter]: str.match(eval(`/${letter}/g`)).length })))
}))

lettersCounter('htkolkhlfottko')
~~~

**{{common.c153}}**

~~~console
▼ {h: 2, t: 3, k: 3, o: 3, l: 2, …}
    f: 1
    h: 2
    k: 3
    l: 2
    o: 3
    t: 3
  ► __proto__: Object
~~~

___________________________________________________________________

### ![ico-30 icon] Other samples

{{s10.p24}}

◘◘![ico-20 cap] 17◘◘

~~~js
function func (a, b, c) {
  console.log(a + b + c)
}

const user = {
  a: 5,
  b: 8,
  c: 13,
  [Symbol.iterator]: function* () {
    for (const key of Object.keys(this)) yield this[key]
  }
}

func(...user)   // 26
~~~

______________________________________________________________

◘◘![ico-20 cap] 18◘◘

~~~js
console.log([...'012345'])
~~~
~~~console
► (6) ['0', '1', '2', '3', '4', '5']
~~~

~~~js
console.log({ ...'012345' })
~~~
~~~console
► {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5'}
~~~

~~~js
function func (a, b, c) {
  console.log(a*1 + b*1 + c*1)
}

func(...'578')  // 20


function test ({ a, b, c } = { a: 3, b: 4, c: 5 }) {
  console.log(a + b + c)
}

test()  // 12

test({ a: 5, b: 7, c: 8 })  // 20
~~~

_________________________

### ![ico-30 hw] {{common.c3}}

{{s11.p1}}

~~~js
function first () {
  return Math.random() > 0.5 ? 'First' : ''
}

function second () {
  return Math.random() < 0.5 ? 'second' : ''
}

second() || console.log(...[first(), second()])
~~~

_______________________________________________________________________________


[![ico-25 hw] Quiz](quiz/destructuring)

_______________________________________________________________________________
