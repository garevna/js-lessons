# ![ico-30 study] Design Patterns

_____________________________________

## ![ico-20 icon] Decorator

The ‘Decorator’ pattern allows specific ‘features’ to be added to a target object

An example of the Decorator pattern in action is the **bind** method

_____________________________________

Suppose we want to control calls to certain functions

### ![ico-20 icon] A single call

A decorator that ensures a function is used only once
(repeated calls will be ignored)

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

In the following example, we will apply the same decorator function,
but to a different function that calculates the sum of two arguments:

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

Now let’s declare the decorator function **decoratorThrottling**,
which ‘endows’ the function passed to it
with the ability to control the frequency of calls
by defining a time interval
from the moment of the last call

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

…and ‘decorate’ the function **showTime**

~~~js
decoratedShowTime = decoratorThrottling(showTime, 2000)

document.body.onclick = event => decoratedShowTime()
~~~
