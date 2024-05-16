# ![ico-30 study] Design Patterns

_____________________________________

## ![ico-20 icon] Decorator

Паттерн "Декоратор" позволяет добавить специфические "черты" целевому объекту

Примером реализации паттерна Decorator является метод **bind**

_____________________________________

Предположим, мы хотим управлять вызовами некоторых функций

### ![ico-20 icon] Одиночный вызов

Декоратор, обеспечивающий одноразовое использование функции
( повторные вызовы будут игнорироваться )

◘◘![ico-20 cap] ** 1**◘◘

~~~js
function sayHello (name = 'user') {
  alert('Hello, ' + name + '!')
}

const decoratorOnce = function (func) {
  let counter = 0
  return function () {
    return counter++ === 0 ? func.call(null, ...arguments) : null
  }
}


const sayHelloOnce = decoratorOnce(sayHello)

sayHelloOnce('Sasha')
sayHelloOnce('Mary')
~~~

В следующем примере мы применим ту же функцию-декоратор,
но уже к другой функции, вычисляющей сумму двух аргументов:

◘◘![ico-20 cap] ** 2**◘◘

~~~js
function calcSum ( x, y ) {
  return Math.round((x + y) * 10) / 10
}

const calcSumOnce = decoratorOnce(calcSum)

calcSumOnce(0.1, 0.2)
~~~

__________________________________________

### ![ico-20 icon] Debounce

◘◘![ico-20 cap] ** 3**◘◘

~~~js
function showTime () {
  console.log(new Date().getTime())
}

document.body.onclick = event => showTime()
~~~

А теперь объявим функцию-декоратор **decoratorThrottling**,
которая "снабжает" переданную ей функцию
способностью контролировать частоту вызовов
путем определения временного интервала
с момента последнего вызова

~~~js
decoratorThrottling = function (func, interval) {
  let lastCall = new Date().getTime()

  return function () {
    if (new Date().getTime() - lastCall < interval) return null
    lastCall = new Date().getTime()
    return func.call(null, ...arguments)
  }
}
~~~

...и "декорируем" функцию **showTime**

~~~js
decoratedShowTime = decoratorThrottling(showTime, 2000)

document.body.onclick = event => decoratedShowTime()
~~~
