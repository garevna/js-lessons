# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

________________________

## ![ico-25 icon] {{s2.h1}}

### ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

~~~js
var x = 5

{
  let x = 15
  console.log(x) // 15
}

console.log(x)  // 5
~~~

{{s3.p4}}

{{s3.p5}}

{{s3.p6}}

~~~js
for (let i of [1, 2, 3, 4, 5]) {
  setTimeout(() => console.log(i), 1000 * i)
}
~~~

__________________________________________________________

{{s3.p7}}

{{s3.p8}}

~~~js
const funcs = []

for (var item of ['alpha', 'sigma', 'omega']) {
  funcs.push(() => console.log(item))
}
funcs[0]()  // omega
funcs[1]()  // omega
funcs[2]()  // omega
~~~

{{s3.p9}}

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

### ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

{{s4.p5}}

{{s4.p6}}

~~~js
{
  console.log(x)
  // [ временная мёртвая зона ]
  let x = 10
}
~~~

{{s4.p7}}

{{s4.p8}}

_________________________


{{s4.p9}}

{{s4.p10}}

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

{{s4.p11}}

{{s4.p12}}

{{s4.p13}}

~~~js
const sample = { a: 'img', b: 'div', c: 'p' }

for (const prop in sample) {
  const elem = document.body
    .appendChild(document.createElement(sample[prop]))
  console.log(elem)
}
~~~

{{s4.p14}}

{{s4.p15}}

~~~js
var x = 25
let z = 15
window.x    //  25
window.z    //  undefined
~~~

______________________

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}
{{s5.p2}}
{{s5.p3}}
{{s5.p4}}

{{s5.p5}}

~~~js
const XXX = 11
XXX = 55
~~~

{{s5.p6}}

{{s5.p7}}

{{s5.p8}}

{{s5.p9}}

~~~js
const XXX
~~~

{{s5.p10}}

{{s5.p11}}

{{s5.p12}}

{{s5.p13}}

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

{{s5.p14}}

{{s5.p15}}

~~~js
const rights = ['read', 'write', 'delete']
rights[1] = null
rights[2] = null
~~~

_______________________________

{{s5.p16}}
