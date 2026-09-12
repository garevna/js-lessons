# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

~~~js
(параметры) => { тело функции }
~~~

{{s2.p3}}

~~~js
const multiply = (x, y) => x * y
multiply(2, 5)  // 10
~~~

______________________

{{s2.p4}}

~~~js
const sayHi = (name = 'user') => console.info(`Hi, ${name}`)
~~~

{{s2.p5}}

~~~js
const sayHi = name => console.info(`Hi, ${name}`)
~~~

{{s2.p6}}

~~~js
const sayHi = () => console.info('Hi, user')
~~~

________________________________________

{{s2.p7}}

~~~js
// обычная функция
const multiply = function (x, y) { return x * y }

// стрелочная функция
const multiply = (x, y) => x * y
~~~

{{s2.p8}}

{{s2.p9}}

~~~js
const iterate = len => {
  for (let i = 1; i <= len; i++) console.log(i)
}
~~~

{{s2.p10}}

~~~js
const iterate = len => new Array(len).fill(0).forEach((item, index) => console.log(index + 1))
~~~

{{s2.p11}}

~~~js
const getAnswer = question => {
  switch (question) {
    case 'who':
      return 'student'
    case 'what':
      return 'develop'
    case 'where':
      return 'Kharkiv'
    default:
      return 'I don\'t undestand your question.'
  }
}
~~~

{{s2.p12}}

~~~js
const getAnswer = question => question === 'who'
  ? 'Irina'
  : question === 'what'
    ? 'develop'
    : question === 'where'
      ? 'Kharkiv'
      : 'I don\'t undestand your question'
~~~

{{s2.p13}}

~~~js
const getAnswer = question => ['who', 'what', 'where'].includes(question)
  ? ['Irina', 'develop', 'Kharkiv'][['who', 'what', 'where'].indexOf(question)]
  : 'I don\'t undestand your question'
~~~

{{s2.p14}}

~~~js
const getAnswer = ((questions, answers) => question => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : 'I don\'t undestand your question')(['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'])
~~~

{{s2.p15}}

~~~js
const getAnswerTemplate = (questions, answers, wrong, question) => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : wrong

const getAnswer = getAnswerTemplate
  .bind(null, ['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'], 'I don\'t undestand your question')
~~~

____________________________________________________

## ![ico-25 icon] {{s3.h1}}

### ![ico-20 icon] {{s4.h1}}

@@@@
{{s4.p1}}
![](images/arrow-funcs-neutered-kitties.svg)
@@@@

☼☼☼ {{s4.slogan1}} ☼☼☼

~~~js
console.dir(() => {})
~~~

~~~console
▼ ƒ anonymous ()
    length: 0
    name: ""
    arguments: (...)
    caller: (...)
  ► [[Prototype]]: ƒ ()
~~~

~~~js
console.dir(function () {})
~~~

~~~console
▼ ƒ console ()
    arguments: null
    caller: null
    length: 0
    name: ""
  ► prototype: {}
  ► [[Prototype]]: ƒ ()
~~~

{{s4.p2}}

~~~js
const arrowFunc = () => null
const obj = new arrowFunc()
~~~

{{s4.p3}}

~~~error
    TypeError: arrowFunc is not a constructor
~~~

~~~js
const obj = new (function () {})

console.log(obj)  // ► {}
~~~

~~~js
const obj = new (() => {})
~~~

~~~error
    TypeError: (intermediate value) is not a constructor
~~~

______________________________________________________

### ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

~~~error
    ReferenceError: arguments is not defined
~~~

{{s5.p3}}
{{s5.p4}}
{{s5.p5}}
{{s5.p6}}

~~~js
function testArguments () {
  (() => console.log(arguments))()
}
testArguments(5, false)
~~~

{{s5.p7}}

~~~console
▼ Arguments(2) [5, false, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    0: 5
    1: false
  ► callee: ƒ testArguments()
    length: 2
  ► Symbol(Symbol.iterator): ƒ values()
  ► [[Prototype]]: Object
~~~

______________________________________________________

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}

#### ![ico-20 icon] {{s7.h1}}

~~~js
window.name = 'Chrome'

const human = {
  name: 'Stephan',
  getName () {
    console.log(this.name)
  },
  showName: () => console.log(this.name)
}

human.getName()   // Stephan
human.showName()  // Chrome
~~~

{{s7.p1}}

{{s7.p2}}
{{s7.p3}}
{{s7.p4}}
{{s7.p5}}
{{s7.p6}}

~~~js
human.name = 'Stephan'
human.getName = function () {
  console.log(this.name)
}
human.showName = () => console.log(this.name)
~~~

{{s7.p7}}

{{s7.p8}}

{{s7.p9}}
{{s7.p10}}

{{s7.p11}}

----------------
#### ![ico-20 icon] {{s8.h1}}

{{s8.p1}}

~~~js
function Sample (name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
  this.showName = () => console.log(this.name)
}
~~~

{{s8.p2}}

~~~js
const user = new Sample('Piter')
~~~

{{s8.p3}}

{{s8.p4}}
{{s8.p5}}
{{s8.p6}}
~~~js
const user = new Object()
~~~
{{s8.p7}}
~~~js
Object.setPrototypeOf(user, Sample.prototype)
~~~
{{s8.p8}}
~~~js
Sample.call(user, 'Piter')
~~~

{{s8.p9}}
{{s8.p10}}
{{s8.p11}}
{{s8.p12}}
{{s8.p13}}

~~~js
console.log(user.__proto__.constructor.name)  // Sample
~~~
{{s8.p14}}
~~~js
console.log(user instanceof Sample)  // true
~~~

{{s8.p15}}

{{s8.p16}}

{{s8.p17}}

~~~js
this.showName = () => console.log(this.name)
~~~

{{s8.p18}}
{{s8.p19}}

__________________________________

#### ![ico-20 icon] {{s9.h1}}

{{s9.p1}}
~~~js
const template = {
  name: 'Robert'
}

function fabric (instance, name) {
  instance.name = name
  instance.getName = function () {
    console.log(this.name)
  }
  instance.showName = () => console.log(this.name)
  return instance
}

const user = fabric.call(template, {}, 'Piter')
~~~

{{s9.p2}}

{{s9.p3}}

{{s9.p4}}

~~~js
user.showName()  // Robert
~~~
____________________________________________________

{{s9.p5}}

{{s9.p6}}
{{s9.p7}}
{{s9.p8}}

{{s9.p9}}

_____________________________________________________

## ![ico-20 icon] {{s10.h1}}

{{s10.p1}}
~~~js
function Sample (name, age) {
  const userName = name
  const userAge = age
  this.getName = this.createMethod(userName)
  this.getAge = this.createMethod(userAge)
}

Sample.prototype.createMethod = param => () => console.log(param)

const user = new Sample('Piter', 28)
~~~

{{s10.p2}}

~~~js
const test = ((data = []) => arg => {
  arg && data.push(arg)
  return arg ? test :  data
})()

test(1)
test(2)
test(3)

console.log(test()) // [1, 2, 3]

test(4)(5)(7)(8)

console.log(test()) // [1, 2, 3, 4, 5, 7, 8]
~~~

{{s10.p3}}

~~~js
const getUser = (getName = prompt.bind(null, 'User name'), getAge = prompt.bind(null, 'User age')) => ({
  name: getName(),
  age: getAge()
})
~~~

{{s10.p4}}

~~~js
(func => Object.assign({
  name: func('Your name'),
  hobby: func('Your hobby')
}))(message => prompt(message))
~~~

____________________________________________________________________

{{s10.p5}}
