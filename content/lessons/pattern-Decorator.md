# ![ico-30 study] {{s1.h1}}

_____________________________________

## ![ico-20 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

_____________________________________

{{s2.p3}}

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

{{s3.p3}}

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

{{s3.p4}}
{{s3.p5}}

{{s3.p6}}

~~~js
function calcSum ( x, y ) {
  return Math.round((x + y) * 10) / 10
}

const calcSumOnce = decoratorOnce(calcSum)

calcSumOnce(0.1, 0.2)
~~~

__________________________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

~~~js
function showTime () {
  console.log(new Date().getTime())
}

document.body.onclick = event => showTime()
~~~

{{s4.p2}}
{{s4.p3}}
{{s4.p4}}
{{s4.p5}}
{{s4.p6}}

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

{{s4.p7}}

~~~js
decoratedShowTime = decoratorThrottling(showTime, 2000)

document.body.onclick = event => decoratedShowTime()
~~~
