# ![ico-30 study] Генераторы и итераторы

**ES6**

_______________________________________________________

## ![ico-25 icon] Передача параметров

У функции-генератора, как и у любой нормальной функции, могут быть формальные параметры и приватные переменные

Эта функция имеет внутренний "тормоз" (~yield~) и внешний стартер (метод ~next~ итератора),
и в точке останова (~yield~) возникает возможность получить извне дополнительные данные
Поскольку "пинок" извне, заставляющий генератор возобновить работу с той точки, в которой она была остановлена, - это метод ~next~ итератора, 
то логично, что именно с этим "пинком" можно передать новые данные функции-генератору

Итак, при вызове метода ~next~ итератора можно передавать некие данные
Для того, чтобы эти данные были благополучно "доставлены по назначению",
в генераторе должно быть присваивание вида:

~~~js
...
let param = yield ...
...
~~~

т.е. нужно в месте "стыка" точки возобновления с точкой останова поставить "ловушку" для данных
(в данном случае это переменная **_param_**)

~yield~ выдает значение наружу, и переводит генератор в режим "ожидания пинка"

Если с "пинком" прилетят данные, то они "войдут" в генератор в точке останова, 
т.е. там, где их "поджидает" наш оператор присваивания,
а именно - в переменную **_param_**...

Например:

~~~js
const iterator = (function * gen (arg) {
  const x = yield arg
  const y = yield arg + x
  const z = yield arg + x + y
  return arg + x + y + z
})(1)

console.log(iterator.next())
console.log(iterator.next(2))
console.log(iterator.next(3))
console.log(iterator.next(4))
~~~

~~~console
► { value: 1, done: false }
► { value: 3, done: false }
► { value: 6, done: false }
► { value: 10, done: true }
~~~

ну, погнали ![ico-20 wink]

_______________________________________________________

◘◘![ico-20 cap] **Пример 23**◘◘

~~~js
function * testArgGenerator (x) {
  console.log('x: ', x)
  const y = yield x + 1
  console.log('I remember: x = ', x, '\nI receive: y = ', y)
  const z = yield y * 2
  console.log('I remember: x: ', x, 'y: ', y, '\nI receive: z: ', z)
  return x + y + z
}

const testArg = testArgGenerator(10)

for (const x of [0, 15, 6]) console.warn('Emitted value: ', testArg.next(x).value)
~~~

{{{generators-23.js}}}

В этом примере генератор объявлен с формальным параметром ** x**

Значение, которое будет передано генератору при первом вызове (возвращающем объект итератора),
используется при вычислении значения, которое вернет первый вызов метода **next** итератора

Однако при возвращении первого значения в генераторе создается новая приватная переменная ** y**,
которая "подхватывает" эстафету получения аргументов извне

На следующей итерации переданное методу **next** значение попадет в приватную переменную ** y**,
при этом первое полученное значение сохраняется в приватной переменной ** x**

Далее "эстафету" принимает переменная ** z**,
в которую попадет следующее переданное методу **next** значение

Все приватные переменные сохраняют свои значения и могут быть использованы в вычислениях 

Итак, на первой итерации используется значение 10, полученное при создании итератора
Это значение сохраняется в приватной переменной ** x**

Далее происходит следующее:
Итерация 2: метод **next** итератора получает аргумент 15, и сохраняет его значение в приватной переменной ** y**
Итерация 2: метод **next** итератора получает аргумент 6, и сохраняет его значение в приватной переменной ** z**

Как мы видим, значения переменных ** x**, ** y** и ** z** сохраняются до завершения 

Например, мы можем стартовать с любой суммы и рассчитать, сколько будет на счету через 3 месяца, если каждый месяц сумма будет увеличиваться на 10%:

________________________________

◘◘![ico-20 cap] **Пример 24**◘◘

~~~js
function * testArgGenerator (x) {
  const roundSum = sum => Math.round(sum * 100) / 100

  console.log('x: ', x)
  const y = yield roundSum(x * 1.1)
  console.log(`Previous state: ${x}\nCurrent state: ${y}`)
  const z = yield roundSum(y * 1.1)
  console.log(`Previous state: ${y}\nCurrent state: ${z}`)
  return roundSum(z * 1.1)
}

const testArg = testArgGenerator(100)


const total = testArg.next(testArg.next(testArg.next().value).value).value

console.log('Result: ', total)
~~~

{{{generators-24.js}}}

_______________________________________________________

## ![ico-25 icon] Аргументы метода next

Вычисление факториала

◘◘![ico-20 cap] Пример 25◘◘

~~~js
function* generator (arg) {
  let result = arg
  while (true) {
    result *= yield result
  }
}

const iterator = generator(2)

for (const x of [2, 3, 4, 5, 6, 7])
    console.log(iterator.next(x))
~~~

Можно и так:

~~~js
function* generator () {
  let result = 2
  while (true) result *= yield result
}

const iterator = generator()

for (const x of [, 3, 4, 5, 6, 7]) console.log(iterator.next(x).value)
~~~

_______________________________________________________

◘◘![ico-20 cap] Пример 26◘◘

~~~js
iterator = (function* gen (arg) {
  let ind = 0, ret = arg, d = new Date().getTime(), key

  while (true) {
    key = d === new Date().getTime()
      ? `${d}[${ind++}]`
      : new Date().getTime()
    d = new Date().getTime()
    ret = yield { [key]: ret }
  }
})('Hello')

;['', 'Welcome', 'Who are you?', 'Bye-bye...']
  .forEach(item => console.log(iterator.next(item)))
~~~



~~~console
▼ {value: {…}, done: false}
    done: false
  ► value: {1572850855950[0]: "Hello"}
  ► __proto__: Object
  
▼ {value: {…}, done: false}
    done: false
  ► value: {1572850855951: "Welcome"}
  ► __proto__: Object

▼ {value: {…}, done: false}
    done: false
  ► value: {1572850855951[1]: "Who are you?"}
  ► __proto__: Object

▼ {value: {…}, done: false}
    done: false
  ► value: {1572850855951[2]: "Bye-bye..."}
  ► __proto__: Object
~~~

{{{generators-26.js}}}

_________________________________________________________

[![ico-30 hw] **Тесты**](https://garevna.github.io/js-quiz/#gen)
