# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}
{{s1.p6}}

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

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

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

{{s2.p5}}

{{s2.p6}}

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

{{s2.p7}}

{{s2.p8}}

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

### {{s3.h1}}

{{s3.p1}}
{{s3.p2}}

{{s3.p3}}

{{s3.p4}}

~~~js
console.log(JSON.stringify(window, null, 2))
~~~

{{s3.p5}}

{{s3.p6}}

{{s3.p7}}

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

{{s3.p8}}

_____________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}

{{s4.p3}}
{{s4.p4}}

{{s4.p5}}

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

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

{{s5.p3}}

{{s5.p4}}

{{s5.p5}}

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

{{s5.p6}}

{{s5.p7}}

~~~js
var test = Object.assign({}, obj)
~~~

{{s5.p8}}

~~~js
test.position === obj.position
~~~
{{s5.p9}}

{{s5.p10}}

~~~js
sample.position === obj.position
~~~

{{s5.p11}}

------------------------------------

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}

~~~js
Function.prototype.toJSON = function () {
  return this.toString()
}
~~~

{{s6.p4}}

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

{{s6.p5}}

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

{{s6.p6}}

~~~js
JSON.parseFuncs = function (obj) {
  const result = this.parse(obj)
  Object.keys(result)
    .filter(key => typeof result[key] === 'string' && !result[key].indexOf('function'))
    .forEach(key => Object.assign(result, { [key]: new Function(result[key]) }))

  return result
}
~~~

{{s6.p7}}

~~~js
const piter = JSON.parseFuncs(JSON.stringify(user))

console.log(piter)
~~~

~~~console
{name: 'Jack', age: 25, hobby: 'football', getName: ƒ}
~~~
