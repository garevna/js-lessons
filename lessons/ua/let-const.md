# ![ico-30 study] let | const⟪let___const⟫

**ES6 ( 2015 )**

________________________

## ![ico-25 icon] let⟪let⟫

### ![ico-25 icon] Функціональна та блокова області видимості⟪Functional_and_block_scope⟫

Обмежити область видимості змінних, оголошених за допомогою директиви **_var_**, можна лише «загортанням» їх у функцію

![ico-25 pin] Блокова область видимості — це обмеження області видимості в межах фігурних дужок

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var x = 5

{
  let x = 15
  console.log(x) // 15
}

console.log(x)  // 5
~~~

Завдяки цьому збирач сміття звільняє пам’ять від непотрібних змінних при виході з блокової області видимості

![ico-25 pin] Наслідком блокової області видимості змінних, оголошених за допомогою директиви **_let_**, є фіксація значення змінної циклу на кожній ітерації блоку _for_:

◘◘![ico-25 cap] ** 2**◘◘

~~~js
for (let i of [1, 2, 3, 4, 5]) {
  setTimeout(function () {
    console.log(i), 1000 * i
  })
}
~~~

__________________________________________________________

![ico-20 warn] Зверніть увагу, що відсутність явних фігурних дужок не змінює принцип поведінки змінних, оголошених за допомогою директиви **_let_**

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

### ![ico-25 icon] Hoisting і «тимчасова мертва зона»⟪Hoisting_and_the_‘temporary_dead_zone’⟫

**Hoisting** полягає в тому, що змінні «піднімаються» від місця їх оголошення в коді до початку їхньої області видимості

**Hoisting** має таке саме значення для змінних, оголошених за допомогою директиви **_let_**, як і для оголошених за допомогою **_var_**

![ico-20 warn] Однак змінні, оголошені за допомогою **_let_**, будуть недоступні доти, доки виконання коду не дійде до місця фактичного оголошення змінної

Так виникає **_тимчасова мертва зона_**

Тому в результаті виконання коду:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
{
  console.log(x)
  // [ временная мёртвая зона ]
  let x = 10
}
~~~

буде згенеровано виняток:

••![ico-25 err] ReferenceError: Cannot access 'x' before initialization••

_________________________


![ico-25 pin] Неможливо повторно оголосити змінну з таким самим ідентифікатором у тій самій області видимості:

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

Буде згенеровано виняток:

![ico-20 err] ~Uncaught SyntaxError: Identifier 'figure' has already been declared~

у циклі спрацює, оскільки явно присутній блок {...}

~~~js
const sample = { a: 'img', b: 'div', c: 'p' }

for (const prop in sample) {
  const elem = document.body
    .appendChild(document.createElement(sample[prop]))
  console.log(elem)
}
~~~

![ico-25 pin] ~let~ не створює властивостей у глобальному об’єкті

◘◘![ico-25 cap] ** 5**◘◘

~~~js
var x = 25
let z = 15
window.x    //  25
window.z    //  undefined
~~~

______________________

## ![ico-25 icon] const⟪const⟫

![ico-20 pin] Блокова область видимості (як у ~let~)
![ico-20 pin] Неможливе дублювання оголошення (як у ~let~)
![ico-20 pin] Загалом, усе, як у ~let~, тільки:
![ico-20 warn] Змінити значення не можна

◘◘![ico-25 cap] ** 6**◘◘

~~~js
const XXX = 11
XXX = 55
~~~

Буде згенеровано виняток:

![ico-20 err] ~Uncaught TypeError: Assignment to constant variable.~

![ico-20 warn] Обов’язково під час оголошення ініціалізувати значення

◘◘![ico-25 cap] ** 7**◘◘

~~~js
const XXX
~~~

Буде згенеровано виняток:

••![ico-20 err] Uncaught SyntaxError: Missing initializer in const declaration••

Якщо константа є об’єктом, то значення її властивостей можна змінити:

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

Аналогічно з масивами:

◘◘![ico-25 cap] ** 9**◘◘

~~~js
const rights = ['read', 'write', 'delete']
rights[1] = null
rights[2] = null
~~~

_______________________________

※※※exercises https://docs.google.com/forms/d/e/1FAIpQLScPBbEkpMk9CNH935pToTh_BmyE1vqk2rnzu3Mhw9F-D-7V_w/viewform※※※
