# ![ico-30 study] let | const

**ES6 ( 2015 )**

________________________

## ![ico-25 icon] let

### ![ico-25 icon] {{p1}}

{{p2}}

{{p3}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var x = 5

{
  let x = 15
  console.log(x) // 15
}

console.log(x)  // 5
~~~

{{p4}}

{{p5}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
for (let i of [1, 2, 3, 4, 5]) {
  setTimeout(function () {
    console.log(i), 1000 * i
  })
}
~~~

__________________________________________________________

{{p6}}

◘◘![ico-25 cap] **var**◘◘

~~~js
const funcs = []

for (var item of ['alpha', 'sigma', 'omega']) {
  funcs.push(function () {
    console.log(item)
  })
}
funcs[0]()  // omega
funcs[1]()  // omega
funcs[2]()  // omega
~~~

~~~console
omega
omega
omega
~~~

◘◘![ico-25 cap] **let**◘◘

~~~js
const funcs = []

for (const item of ['alpha', 'sigma', 'omega']) {
  funcs.push(function () {
    console.log(item)
  })
}

funcs[0]()  // alpha
funcs[1]()  // sigma
funcs[2]()  // omega
~~~

~~~console
alpha
sigma
omega
~~~

_______________________

### ![ico-25 icon] {{p7}}

{{p8}}

{{p9}}

{{p10}}

{{p11}}

{{p12}}

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


{{p13}}

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

{{p14}}

~~~js
const sample = { a: 'img', b: 'div', c: 'p' }

for (const prop in sample) {
  const elem = document.body
    .appendChild(document.createElement(sample[prop]))
  console.log(elem)
}
~~~

{{p15}}

◘◘![ico-25 cap] ** 5**◘◘

~~~js
var x = 25
let z = 15
window.x    //  25
window.z    //  undefined
~~~

______________________

## ![ico-25 icon] const

{{p16}}
{{p17}}
{{p18}}
{{p19}}

◘◘![ico-25 cap] ** 6**◘◘

~~~js
const XXX = 11
XXX = 55
~~~

{{topic.t6}}

![ico-20 err] ~Uncaught TypeError: Assignment to constant variable.~

{{p20}}

◘◘![ico-25 cap] ** 7**◘◘

~~~js
const XXX
~~~

{{topic.t6}}

••![ico-20 err] Uncaught SyntaxError: Missing initializer in const declaration••

{{p21}}

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

{{p22}}

◘◘![ico-25 cap] ** 9**◘◘

~~~js
const rights = ['read', 'write', 'delete']
rights[1] = null
rights[2] = null
~~~

_______________________________

※※※exercises ⟦f1⟧※※※
