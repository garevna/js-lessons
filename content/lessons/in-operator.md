# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}
{{s1.p5}}

{{s1.p6}}

~~~js
var sample = {
  type: 'figure',
  class: 'circle',
  color: 'red'
}
console.log('type' in sample)     // true

console.log('valueOf' in sample)  // true
~~~

{{s1.p7}}

___________________________________

## ![ico-25 icon] {{s2.h1}}

~~~js
var arr = [1, 2, 3]
'valueOf' in arr  // true

'valueOf' in [1, 2, 3] // true

0 in [1, 2, 3] // true
5 in [1, 2, 3] // false
~~~

_________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

~~~js
var sample = String('Welcome to the hell')
'length' in sample   // true

var number = new Number(5)
'valueOf' in number  // true

var bool = new Boolean('5')
'valueOf' in bool  // true
~~~

{{s3.p2}}

~~~js
var sample = Object('Welcome to the hell')
'length' in sample   // true

var number = Object(5)
'valueOf' in number  // true

var bool = Object(false)
'valueOf' in bool  // true
~~~

{{s3.p3}}

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

{{s3.p4}}

~~~js
var sample = Object(null)
'valueOf' in sample  // true

var sample = Object(undefined)
'valueOf' in sample  // true
~~~
