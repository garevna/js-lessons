# ![ico-30 study] let | const

**ES6 ( 2015 )**

________________________

## ![ico-25 icon] let

### ![ico-25 icon] Functional and block scope

The scope of variables declared using the **_var_** directive can only be restricted by ‘wrapping’ them within a function

![ico-25 pin] Block scope is the restriction of scope within curly brackets

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var x = 5

{
  let x = 15
  console.log(x) // 15
}

console.log(x)  // 5
~~~

As a result, the garbage collector frees up memory by removing unnecessary variables upon exiting the block scope

![ico-25 pin] The consequence of block scope for variables declared using the **_let_** directive is that the value of the loop variable is reset on each iteration of the _for_ block:

◘◘![ico-25 cap] ** 2**◘◘

~~~js
for (let i of [1, 2, 3, 4, 5]) {
  setTimeout(() => console.log(i), 1000 * i)
}
~~~

__________________________________________________________

![ico-20 warn] Note that the absence of explicit curly brackets does not alter the behaviour of variables declared using the **_let_** directive

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

### ![ico-25 icon] Hoisting and the ‘temporary dead zone’

**Hoisting** means that variables are ‘hoisted’ from their point of declaration in the code to the top of their scope

**Hoisting** applies equally to variables declared using the **_let_** directive as it does to those declared using **_var_**

![ico-20 warn] However, variables declared using **_let_** will remain inaccessible until execution reaches the point where the variable is actually declared

This is how a **_temporary dead zone_** arises

Therefore, as a result of executing the code:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
{
  console.log(x)
  // [ временная мёртвая зона ]
  let x = 10
}
~~~

An exception will be thrown:

••![ico-25 err] ReferenceError: Cannot access 'x' before initialization••

_________________________


![ico-25 pin] It is not possible to re-declare a variable with the same identifier within the same scope:

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

An exception will be thrown:

![ico-20 err] ~Uncaught SyntaxError: Identifier 'figure' has already been declared~

It will run in the loop because the block {...} is clearly present

~~~js
const sample = { a: 'img', b: 'div', c: 'p' }

for (const prop in sample) {
  const elem = document.body
    .appendChild(document.createElement(sample[prop]))
  console.log(elem)
}
~~~

![ico-25 pin] ~let~ does not create properties in the global object

◘◘![ico-25 cap] ** 5**◘◘

~~~js
var x = 25
let z = 15
window.x    //  25
window.z    //  undefined
~~~

______________________

## ![ico-25 icon] const

![ico-20 pin] Block scope (as with ~let~)
![ico-20 pin] Duplicate declarations are not permitted (as with ~let~)
![ico-20 pin] Generally, everything is the same as with ~let~, except:
![ico-20 warn] The value cannot be changed

◘◘![ico-25 cap] ** 6**◘◘

~~~js
const XXX = 11
XXX = 55
~~~

An exception will be thrown:

![ico-20 err] ~Uncaught TypeError: Assignment to constant variable.~

![ico-20 warn] You must initialise the value when declaring it

◘◘![ico-25 cap] ** 7**◘◘

~~~js
const XXX
~~~

An exception will be thrown:

••![ico-20 err] Uncaught SyntaxError: Missing initializer in const declaration••

If a constant is an object, the values of its properties can be changed:

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

The same applies to arrays:

◘◘![ico-25 cap] ** 9**◘◘

~~~js
const rights = ['read', 'write', 'delete']
rights[1] = null
rights[2] = null
~~~

_______________________________

※※※exercises https://docs.google.com/forms/d/e/1FAIpQLScPBbEkpMk9CNH935pToTh_BmyE1vqk2rnzu3Mhw9F-D-7V_w/viewform※※※
