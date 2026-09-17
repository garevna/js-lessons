# ![ico-30 study] JSON

{{p1}}

{{p2}}

{{p3}}

{{p4}}

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

{{p5}}
{{p6}}
{{p7}}

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

{{p8}}

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

{{p9}}

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

### {{p10}}

{{p11}}
{{p12}}

{{p13}}

![ico-25 cap] ** 4**

~~~js
console.log(JSON.stringify(window, null, 2))
~~~

••![ico-20 error] Uncaught TypeError: Converting circular structure to JSON••

{{p14}}

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

{{p15}}

_____________________

## ![ico-25 icon] JSON.parse()

{{p16}}
{{p17}}

{{p18}}
{{p19}}

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

## ![ico-25 icon] {{p20}}

{{p21}}

{{p22}}

{{p23}}

{{p24}}

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

{{p25}}

{{p26}}

~~~js
var test = Object.assign({}, obj)
~~~

{{topic.t11}}

~~~js
test.position === obj.position
~~~
{{p27}}

{{p28}}

~~~js
sample.position === obj.position
~~~

{{p29}}

------------------------------------

## ![ico-25 icon] {{p30}}

{{p31}}

![ico-25 cap] ** 8**

{{p32}}

~~~js
Function.prototype.toJSON = function () {
  return this.toString()
}
~~~

{{p33}}

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

{{p34}}

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

{{p35}}

~~~js
JSON.parseFuncs = function (obj) {
  const result = this.parse(obj)
  Object.keys(result)
    .filter(key => typeof result[key] === 'string' && !result[key].indexOf('function'))
    .forEach(key => Object.assign(result, { [key]: new Function(result[key]) }))

  return result
}
~~~

{{p36}}

~~~js
const piter = JSON.parseFuncs(JSON.stringify(user))

console.log(piter)
~~~

~~~console
{name: 'Jack', age: 25, hobby: 'football', getName: ƒ}
~~~
