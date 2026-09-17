# ![ico-30 study] {{p1}}

{{p2}}

{{p3}}

{{p4}}

{{p5}}
{{p6}}

{{p7}}

~~~js
var sample = {
  type: 'figure',
  class: 'circle',
  color: 'red'
}
console.log('type' in sample)     // true

console.log('valueOf' in sample)  // true
~~~

{{p8}}

___________________________________

## ![ico-25 icon] {{common.c23}}

~~~js
var arr = [1, 2, 3]
'valueOf' in arr  // true

'valueOf' in [1, 2, 3] // true

0 in [1, 2, 3] // true
5 in [1, 2, 3] // false
~~~

_________________________________

## ![ico-25 icon] {{p9}}

{{p10}}

~~~js
var sample = String('Welcome to the hell')
'length' in sample   // true

var number = new Number(5)
'valueOf' in number  // true

var bool = new Boolean('5')
'valueOf' in bool  // true
~~~

{{common.c9}}

~~~js
var sample = Object('Welcome to the hell')
'length' in sample   // true

var number = Object(5)
'valueOf' in number  // true

var bool = Object(false)
'valueOf' in bool  // true
~~~

{{p11}}

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

{{p12}}

~~~js
var sample = Object(null)
'valueOf' in sample  // true

var sample = Object(undefined)
'valueOf' in sample  // true
~~~
