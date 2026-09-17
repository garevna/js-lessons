# ![ico-30 study] Design Patterns

_____________________________________

## ![ico-20 icon] Decorator

{{p1}}

{{p2}}

_____________________________________

{{p3}}

### ![ico-20 icon] {{p4}}

{{p5}}
{{p6}}

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

{{p7}}
{{p8}}

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

{{p9}}
{{p10}}
{{p11}}
{{p12}}
{{p13}}

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

{{p14}}

~~~js
decoratedShowTime = decoratorThrottling(showTime, 2000)

document.body.onclick = event => decoratedShowTime()
~~~
