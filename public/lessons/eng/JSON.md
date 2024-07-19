# ![ico-30 study] JSON

The storing of JS objects in the form of a text string is convenient from the point of view of exchanging data with the server and storing data of a complex structure.

It is a more compact alternative to the **XML** format (e<b>X</b>tensible ** M**arkup ** L**anguage).

**~JSON~** - is a built-in native object (![ico-20 warn] not a constructor).

It has only two methods:

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

The only required argument of the method is a reference to an object or array, and the depth of the data structure is not limited.
^^Two additional formal parameters are optional.^^
Return value is JSON string.

◘◘![ico-25 cap] ** 1**◘◘
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

__________________________________

The second (optional) formal parameter can be used, for example, as follows:

◘◘![ico-25 cap] ** 2**◘◘
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

_________________________________

The third (optional) formal parameter is needed to format the result:

◘◘![ico-25 cap] ** 3**◘◘
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

### ![ico-20 icon] Restrictions

The thing is, object serialization is not always possible.
There are so-called **non-serializable** objects that contain **cyclic references**.

For example, when we try to serialize the **window** object, we will receive a _TypeError_:

◘◘![ico-25 cap] ** 4**◘◘
~~~js
console.log(JSON.stringify(window, null, 2))
~~~

••![ico-20 error] Uncaught TypeError: Converting circular structure to JSON••

Let's try to serialize an object containing the following properties:

◘◘![ico-25 cap] ** 5**◘◘

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

As can be seen from the example, **Infinity**, **undefined** and **Symbol**, as well as object methods, are discarded during serialization.

_____________________

## ![ico-25 icon] JSON.parse()

The only required argument of the method is a JSON string.
The return value is a JS data structure (array or object).

![ico-20 warn] In a JSON string, all string values ​​(including property names) are enclosed in **double quotes**.
![ico-20 warn] Numeric and logical values, arrays and objects are not quoted.

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

## ![ico-25 icon] Deep copy

It is known that arrays and objects are passed by reference.

If an object has a flat structure, then you can get an exact copy of this object using the **~Object.assign()~** method.

However, if the object's properties are objects or arrays, then **~Object.assign()~** will copy references to those nested objects.

If we first execute **~JSON.stringify()~**, and then **~JSON.parse()~**, the result will be the clone of the object, not a reference.

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

The **sample** variable now contains the clone of the **obj** object, including the values ​​of the elements of array **position**, rather than a reference to it.

Let's compare the results of **~Object.assign()~** and **~JSON.stringify()~** → **~JSON.parse ()~**.

~~~js
var test = Object.assign({}, obj)
~~~

Boolean expression:

~~~js
test.position === obj.position
~~~

returns ~true~ because the value of the **test.position** property is a reference, and the value of the **obj.position** property is also a reference, and these references point to the same object.

And here is the logical expression:

~~~js
sample.position === obj.position
~~~

will return ~false~ because **sample.position** is a different object whose reference is not the same as the **obj.position** object reference.

------------------------------------

## ![ico-25 icon] Lifehack

Let's set the task of serializing an object, including its methods.

![ico-25 cap] ** 8**

To do this, first of all, add the **~toJSON~** method to the prototype of constructor **Function**:

~~~js
Function.prototype.toJSON = function () {
  return this.toString()
}
~~~

Now the object will be serialized normally, but the method will be included in the json string as a text string:

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

Let's write the method declaration a little differently:

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

and add the method **~parseFuncs~** to the **JSON** object:

~~~js
JSON.parseFuncs = function (obj) {
  const result = this.parse(obj)
  Object.keys(result)
    .filter(key => typeof result[key] === 'string' && !result[key].indexOf('function'))
    .forEach(key => Object.assign(result, { [key]: new Function(result[key]) }))

  return result
}
~~~

Now we can safely serialize the object **user** and then parse the result using the **~parseFuncs~** method:

~~~js
const piter = JSON.parseFuncs(JSON.stringify(user))

console.log(piter)
~~~

~~~console
{name: 'Jack', age: 25, hobby: 'football', getName: ƒ}
~~~
