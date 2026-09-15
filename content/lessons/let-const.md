# ![ico-30 study] let | const

**ES6 ( 2015 )**

________________________

## ![ico-25 icon] let

### ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var x = 5

{
  let x = 15
  console.log(x) // 15
}

console.log(x)  // 5
~~~

{{s1.p3}}

{{s1.p4}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
for (let i of [1, 2, 3, 4, 5]) {
  setTimeout(() => console.log(i), 1000 * i)
}
~~~

__________________________________________________________

{{s1.p5}}

◘◘![ico-25 cap] **var**◘◘

~~~js
const funcs = []

for (var item of ['alpha', 'sigma', 'omega']) {
  funcs.push(() => console.log(item))
}
funcs[0]()  // omega
funcs[1]()  // omega
funcs[2]()  // omega
~~~

◘◘![ico-25 cap] **let**◘◘

~~~js
const funcs = []

for (const item of ['alpha', 'sigma', 'omega']) {
  funcs.push(() => console.log(item))
}

funcs[0]()  // omega
funcs[1]()  // omega
funcs[2]()  // omega
~~~
_______________________

### ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
{
  console.log(x)
  // [ временная мёртвая зона ]
  let x = 10
}
~~~

{{common.c5}}

••![ico-25 err] ReferenceError: Cannot access 'x' before initialization••

_________________________


{{s2.p7}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
function sample () {
  let figure = {
    name: 'Radius',
    size: 50
  }

  console.log(figure)

  let figure = 10
  console.log(figure)
}
sample ()
~~~

{{topic.t6}}

![ico-20 err] ~Uncaught SyntaxError: Identifier 'figure' has already been declared~

{{s2.p9}}

~~~js
const sample = { a: 'img', b: 'div', c: 'p' }

for (const prop in sample) {
  const elem = document.body
    .appendChild(document.createElement(sample[prop]))
  console.log(elem)
}
~~~

{{s2.p10}}

◘◘![ico-25 cap] ** 5**◘◘

~~~js
var x = 25
let z = 15
window.x    //  25
window.z    //  undefined
~~~

______________________

## ![ico-25 icon] const

{{s2.p11}}
{{s2.p12}}
{{s2.p13}}
{{s2.p14}}

◘◘![ico-25 cap] ** 6**◘◘

~~~js
const XXX = 11
XXX = 55
~~~

{{topic.t6}}

![ico-20 err] ~Uncaught TypeError: Assignment to constant variable.~

{{s2.p16}}

◘◘![ico-25 cap] ** 7**◘◘

~~~js
const XXX
~~~

{{topic.t6}}

••![ico-20 err] Uncaught SyntaxError: Missing initializer in const declaration••

{{s2.p18}}

◘◘![ico-25 cap] ** 8**◘◘

~~~js
const user = {
  login: 'admin',
  role: 'admin',
  status: 'active',
  rights: ['read', 'write', 'delete']
}

user.login = 'student'
user.role = 'user'
user.rights = ['read']
~~~

{{s2.p19}}

◘◘![ico-25 cap] ** 9**◘◘

~~~js
const rights = ['read', 'write', 'delete']
rights[1] = null
rights[2] = null
~~~

_______________________________

{{s2.p20}}
