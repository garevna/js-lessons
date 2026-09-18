# ![ico-30 study] {{p1}}

**ES6**

## ![ico-25 icon] {{p2}}

![ico-20 error] **_function_**

{{p3}}

~~~js
(параметры) => { тело функции }
~~~

{{p4}}

~~~js
const multiply = (x, y) => x * y
multiply(2, 5)  // 10
~~~

______________________

{{p5}}

~~~js
const sayHi = (name = 'user') => console.info(`Hi, ${name}`)
~~~

{{p6}}

~~~js
const sayHi = name => console.info(`Hi, ${name}`)
~~~

{{p7}}

~~~js
const sayHi = () => console.info('Hi, user')
~~~

________________________________________

{{p8}}

~~~js
// обычная функция
const multiply = function (x, y) { return x * y }

// стрелочная функция
const multiply = (x, y) => x * y
~~~

{{p9}}

{{p10}}

~~~js
const iterate = len => {
  for (let i = 1; i <= len; i++) console.log(i)
}
~~~

{{p11}}

~~~js
const iterate = len => new Array(len).fill(0).forEach((item, index) => console.log(index + 1))
~~~

{{p12}}

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

{{p13}}

~~~js
const getAnswer = question => question === 'who'
  ? 'Irina'
  : question === 'what'
    ? 'develop'
    : question === 'where'
      ? 'Kharkiv'
      : 'I don\'t undestand your question'
~~~

{{p14}}

~~~js
const getAnswer = question => ['who', 'what', 'where'].includes(question)
  ? ['Irina', 'develop', 'Kharkiv'][['who', 'what', 'where'].indexOf(question)]
  : 'I don\'t undestand your question'
~~~

{{p15}}

~~~js
const getAnswer = ((questions, answers) => question => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : 'I don\'t undestand your question')(['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'])
~~~

{{p16}}

~~~js
const getAnswerTemplate = (questions, answers, wrong, question) => questions.includes(question)
  ? answers[questions.indexOf(question)]
  : wrong

const getAnswer = getAnswerTemplate
  .bind(null, ['who', 'what', 'where'], ['Irina', 'develop', 'Kharkiv'], 'I don\'t undestand your question')
~~~

____________________________________________________

## ![ico-25 icon] {{p17}}

### ![ico-20 icon] prototype

@@@@
{{p18}}
![](slogans/arrow-funcs-neutered-kitties.svg)
@@@@

☼☼☼ {{p19}} ☼☼☼

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

{{p20}}

~~~js
const arrowFunc = () => null
const obj = new arrowFunc()
~~~

{{common.c5}}

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

### ![ico-25 icon] arguments

{{p21}}

{{p22}}

~~~error
    ReferenceError: arguments is not defined
~~~

{{p23}}
{{p24}}
{{p25}}
{{p26}}

~~~js
function testArguments () {
  (() => console.log(arguments))()
}
testArguments(5, false)
~~~

{{p27}}

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

### ![ico-20 icon] {{common.c19}}

{{p28}}

{{p29}}

{{p30}}

#### ![ico-20 icon] {{p31}}

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

{{p32}}

{{p33}}
{{p34}}
{{p35}}
{{p36}}
{{p37}}

~~~js
human.name = 'Stephan'
human.getName = function () {
  console.log(this.name)
}
human.showName = () => console.log(this.name)
~~~

{{p38}}

{{p39}}

{{p40}}
{{p41}}

{{p42}}

----------------
#### ![ico-20 icon] {{common.c7}}

{{p43}}

~~~js
function Sample (name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
  this.showName = () => console.log(this.name)
}
~~~

{{p44}}

~~~js
const user = new Sample('Piter')
~~~

{{p45}}

{{p46}}
{{p47}}
{{p48}}
~~~js
const user = new Object()
~~~
{{p49}}
~~~js
Object.setPrototypeOf(user, Sample.prototype)
~~~
{{p50}}
~~~js
Sample.call(user, 'Piter')
~~~

{{p51}}
{{p52}}
{{p53}}
{{p54}}
{{p55}}

~~~js
console.log(user.__proto__.constructor.name)  // Sample
~~~
{{p56}}
~~~js
console.log(user instanceof Sample)  // true
~~~

{{p57}}

{{p58}}

{{p59}}

~~~js
this.showName = () => console.log(this.name)
~~~

{{p60}}
{{p61}}

__________________________________

#### ![ico-20 icon] {{p62}}

{{p63}}
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

{{p64}}

{{p65}}

{{p66}}

~~~js
user.showName()  // Robert
~~~
____________________________________________________

{{p67}}

{{p68}}
{{p69}}
{{p70}}

{{p71}}

_____________________________________________________

## ![ico-20 icon] {{common.c10}}

◘◘![ico-25 cap] ** 1**◘◘
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

◘◘![ico-25 cap] ** 2**◘◘

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

◘◘![ico-25 cap] ** 3**◘◘

~~~js
const getUser = (getName = prompt.bind(null, 'User name'), getAge = prompt.bind(null, 'User age')) => ({
  name: getName(),
  age: getAge()
})
~~~

◘◘![ico-25 cap] ** 4**◘◘

~~~js
(func => Object.assign({
  name: func('Your name'),
  hobby: func('Your hobby')
}))(message => prompt(message))
~~~

____________________________________________________________________

※※※tests ⟦f17⟧※※※
