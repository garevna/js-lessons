# ![ico-30 study] Оператор in

Первым операндом оператора **~in~** является _имя свойства_ (строка)

Второй операнд - _объект_, проверяемый на наличие такого свойства

Оператор **~in~** возвращает логическое значение

• ~true~ если такое свойство есть у объекта
• ~false~ если такого свойства нет

Наличие указанного первым операндом свойства проверяется по всей цепочке прототипов

~~~js
var sample = {
  type: 'figure',
  class: 'circle',
  color: 'red'
}
console.log('type' in sample)     // true

console.log('valueOf' in sample)  // true
~~~

В данном примере метод **_~valueOf~_** является унаследованным, однако оператор **~in~** возвращает ~true~

___________________________________

## ![ico-25 icon] Массивы

~~~js
var arr = [1, 2, 3]
'valueOf' in arr  // true

'valueOf' in [1, 2, 3] // true

0 in [1, 2, 3] // true
5 in [1, 2, 3] // false
~~~

_________________________________

## ![ico-25 icon] Строки, числа и логические значения

Их нужно "завернуть" в объект так:

~~~js
var sample = String('Welcome to the hell')
'length' in sample   // true

var number = new Number(5)
'valueOf' in number  // true

var bool = new Boolean('5')
'valueOf' in bool  // true
~~~

или так:

~~~js
var sample = Object('Welcome to the hell')
'length' in sample   // true

var number = Object(5)
'valueOf' in number  // true

var bool = Object(false)
'valueOf' in bool  // true
~~~

![ico-20 warn] Если не "завернуть" строку, число или логическое значение в объект, то при попытке использовать оператор **~in~** будет сгенерировано исключение ![ico-20 err] **~TypeError~**

~~~js
var sample = 'Welcome to the hell'
'length' in sample   // TypeError

var number = 5
'valueOf' in number  // TypeError

var bool = true
'valueOf' in bool   // TypeError
~~~

__________________________________

## ![ico-25 icon] null | undefined

"Завернуть" в объект можно также **_~null~_** и **_~undefined~_**

~~~js
var sample = Object(null)
'valueOf' in sample  // true

var sample = Object(undefined)
'valueOf' in sample  // true
~~~
