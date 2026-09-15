# ![ico-30 study] JSON

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}

{{s0.p4}}

![ico-20 green-ok] **JSON.stringify()**
![ico-20 green-ok] **JSON.parse()**

~~~~console
▼ JSON
    ► parse: ƒ parse()
    ► stringify: ƒ stringify()
      Symbol(Symbol.toStringTag): "JSON"
    ▼ __proto__:
        ► constructor: ƒ Object()
        ► hasOwnProperty: ƒ hasOwnProperty()
        ► isPrototypeOf: ƒ isPrototypeOf()
        ► propertyIsEnumerable: ƒ propertyIsEnumerable()
        ► toLocaleString: ƒ toLocaleString()
        ► toString: ƒ toString()
        ► valueOf: ƒ valueOf()
        ► __defineGetter__: ƒ __defineGetter__()
        ► __defineSetter__: ƒ __defineSetter__()
        ► __lookupGetter__: ƒ __lookupGetter__()
        ► __lookupSetter__: ƒ __lookupSetter__()
        ► get __proto__: ƒ __proto__()
        ► set __proto__: ƒ __proto__()
~~~~

_____________________

## ![ico-25 icon] JSON.stringify()

{{s0.p5}}
{{s0.p6}}
{{s0.p7}}

![ico-25 cap] ** 1**

~~~js
var obj = {
  name: 'sample',
  type: 'figure',
  color: 'green',
  size: 200,
  position: [250, 250]
}

JSON.stringify(obj)
~~~

~~~console
'{"name":"sample","type":"figure","color":"green","size":200,"position":[250,250]}'
~~~

![ico-25 cap] ** 2**

{{s0.p8}}

~~~js
var obj = {
  name: 'sample',
  type: 'figure',
  color: 'green',
  size: 200,
  position: [250, 250]
}

JSON.stringify(obj, ['name', 'type', 'color'])
~~~

~~~console
'{"name":"sample","type":"figure","color":"green"}'
~~~

![ico-25 cap] ** 3**

{{s0.p9}}

~~~js
var obj = {
  name: 'sample',
  type: 'figure',
  color: 'green',
  size: 200,
  position: [250, 250]
}

console.log(JSON.stringify(obj, null, 2))
~~~

~~~console
{
  "name": "sample",
  "type": "figure",
  "color": "green",
  "size": 200,
  "position": [
    250,
    250
  ]
}
~~~

### {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

{{s1.p3}}

![ico-25 cap] ** 4**

~~~js
console.log(JSON.stringify(window, null, 2))
~~~

••![ico-20 error] Uncaught TypeError: Converting circular structure to JSON••

{{s1.p4}}

![ico-25 cap] ** 5**

~~~js
var user = {
  name: 'Jack',
  age: Infinity,
  hobby: 'football',
  [Symbol.for('user-pay')]: 45,
  job: undefined,
  getName () {
    console.log(this.name)
  }
}

console.log(JSON.stringify(user, null, 2))
~~~

~~~console
{
  "name": "Jack",
  "age": 25,
  "hobby": "football"
}
~~~

{{s1.p5}}

_____________________

## ![ico-25 icon] JSON.parse()

{{s1.p6}}
{{s1.p7}}

{{s1.p8}}
{{s1.p9}}

![ico-25 cap] ** 6**

~~~js
var x = `{
  "name": "sample",
  "type": "figure",
  "attrs": {
    "color": "green",
    "size": 200,
    "position": [250, 250]
  }
}`

JSON.parse(x)
~~~

~~~console
▼ {name: "sample", type: "figure", attrs: {…}}
  ▼ attrs:
        color: "green"
      ► position: (2) [250, 250]
        size: 200
      ► __proto__: Object
    name: "sample"
    type: "figure"
  ► __proto__: Object
~~~

___________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

![ico-25 cap] ** 7**

~~~js
var obj = {
  name: 'sample',
  type: 'figure',
  color: 'green',
  size: 200,
  position: [250, 250]
}
var sample = JSON.parse(JSON.stringify(obj))
~~~

{{s2.p5}}

{{s2.p6}}

~~~js
var test = Object.assign({}, obj)
~~~

{{common.c39}}

~~~js
test.position === obj.position
~~~
{{s2.p8}}

{{s2.p9}}

~~~js
sample.position === obj.position
~~~

{{s2.p10}}

------------------------------------

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

![ico-25 cap] ** 8**

{{s3.p2}}

~~~js
Function.prototype.toJSON = function () {
  return this.toString()
}
~~~

{{s3.p3}}

~~~js
var user = {
  name: 'Jack',
  age: 25,
  hobby: 'football',
  getName () {
    console.log(this.name)
  }
}

console.log(JSON.stringify(user, null, 2))
~~~

~~~console
{
  "name": "Jack",
  "age": 25,
  "hobby": "football",
  "getName": "getName () {\n    console.log(this.name)\n  }"
}
~~~

{{s3.p4}}

~~~js
var user = {
  name: 'Jack',
  age: 25,
  hobby: 'football',
  getName: function getName () {
    console.log(this.name)
  }
}
~~~

{{s3.p5}}

~~~js
JSON.parseFuncs = function (obj) {
  const result = this.parse(obj)
  Object.keys(result)
    .filter(key => typeof result[key] === 'string' && !result[key].indexOf('function'))
    .forEach(key => Object.assign(result, { [key]: new Function(result[key]) }))

  return result
}
~~~

{{s3.p6}}

~~~js
const piter = JSON.parseFuncs(JSON.stringify(user))

console.log(piter)
~~~

~~~console
{name: 'Jack', age: 25, hobby: 'football', getName: ƒ}
~~~
