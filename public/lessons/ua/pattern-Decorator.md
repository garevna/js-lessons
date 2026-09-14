# ![ico-30 study] Design Patterns

_____________________________________

## ![ico-20 icon] Decorator

Паттерн «Декоратор» дозволяє додати специфічні «риси» до цільового об’єкта

Прикладом реалізації паттерна Decorator є метод **bind**

_____________________________________

Припустимо, ми хочемо керувати викликами деяких функцій

### ![ico-20 icon] Одноразовий виклик

Декоратор, що забезпечує одноразове використання функції
(повторні виклики ігноруватимуться)

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

У наступному прикладі ми застосуємо ту саму функцію-декоратор,
але вже до іншої функції, що обчислює суму двох аргументів:

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

А тепер оголосимо функцію-декоратор **decoratorThrottling**,
яка «наділяє» передану їй функцію
здатністю контролювати частоту викликів
шляхом визначення часового інтервалу
від моменту останнього виклику

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

...і «декоруємо» функцію **showTime**

~~~js
decoratedShowTime = decoratorThrottling(showTime, 2000)

document.body.onclick = event => decoratedShowTime()
~~~
