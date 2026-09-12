# ![ico-30 study] {{s1.h1}}

_____________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}
{{s2.p5}}
{{s2.p6}}
{{s2.p7}}
{{s2.p8}}
{{s2.p9}}
{{s2.p10}}
{{s2.p11}}
{{s2.p12}}
{{s2.p13}}
{{s2.p14}}
{{s2.p15}}
{{s2.p16}}
{{s2.p17}}
{{s2.p18}}
{{s2.p19}}
{{s2.p20}}
{{s2.p21}}
{{s2.p22}}
{{s2.p23}}

{{s2.p24}}

~~~js
var obj = {
  name: 'Google',
  show: false
}
~~~

{{s2.p25}}

{{s2.p26}}

{{s2.p27}}
{{s2.p28}}
{{s2.p29}}
{{s2.p30}}
{{s2.p31}}
{{s2.p32}}
{{s2.p33}}
{{s2.p34}}
{{s2.p35}}
{{s2.p36}}
{{s2.p37}}
{{s2.p38}}
{{s2.p39}}
{{s2.p40}}

{{s2.p41}}

~~~js
console.dir(Promise)
console.dir(XMLHttpRequest)
~~~

{{s2.p42}}

{{s2.p43}}
{{s2.p44}}

_________________________________

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

~~~js
var figure = {
  type: 'circle',
  radius: 100,
  color: 'red'
}
~~~

{{s3.p3}}

~~~js
console.log(figure.type)
console.log(figure.radius)
console.log(figure.color)
~~~

{{s3.p4}}

~~~js
console.log(figure['type'])
console.log(figure['radius'])
console.log(figure['color'])
~~~

{{s3.p5}}

{{s3.p6}}

{{s3.p7}}

~~~js
var sample = {
  path: 'https://garevna.github.io/js-lessons/icons/',

  testToken: (function (token) {
    return function () {
      return prompt('Input Your Token: ') === token
    }
  })(prompt('Set Your Token: ')),

  page: function () {
    const ico = this.testToken() ? 'green-ok.png' : 'no_entry.png'
    document.write(`<img src="${this.path}${ico}">`)
  }
}

sample.page()
~~~

{{s3.p8}}

{{s3.p9}}

{{s3.p10}}

{{s3.p11}}

{{s3.p12}}

____________________________________________


### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

~~~js
var figure2 = {
  type: 'triangle',
  size: 150,
  color: 'blue'
}
~~~

{{s4.p5}}

{{s4.p6}}

{{s4.p7}}

{{s4.p8}}

~~~js
figure.type       // "circle"
figure2.type      // "triangle"
~~~

__________________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}
{{s5.p3}}

~~~js
for (var prop in figure) console.log(prop)
~~~

{{s5.p4}}

~~~console
type
size
color
~~~

{{s5.p5}}

{{s5.p6}}

{{s5.p7}}
{{s5.p8}}
{{s5.p9}}

________________________

### ![ico-20 icon] {{s6.h1}}

{{s6.p1}}

~~~js
var figure = {
  type: 'circle',
  radius: 100,
  color: 'red'
}
~~~

{{s6.p2}}

~~~console
▼{ type: "Окружность", radius: 100, color: "red" }
    color:"red"
    radius:100
    type:"Окружность"
  ► __proto__:Object
~~~

{{s6.p3}}

{{s6.p4}}

{{s6.p5}}

{{s6.p6}}

{{s6.p7}}

~~~console
▼ __proto__
   ► constructor: ƒ Object()
   ► hasOwnProperty: ƒ hasOwnProperty()
   ► isPrototypeOf: ƒ isPrototypeOf()
   ► propertyIsEnumerable: ƒ propertyIsEnumerable()
   ► toLocaleString: ƒ toLocaleString()
   ► toString: ƒ toString()
   ► valueOf: ƒ valueOf()
   ► __defineGetter__ ƒ __defineGetter__)
   ► __defineSetter__ ƒ __defineSetter__)
   ► __lookupGetter__ ƒ __lookupGetter__)
   ► __lookupSetter__: ƒ __lookupSetter__()
   ► get __proto__: ƒ __proto__()
   ► set __proto__: ƒ __proto__()
~~~

{{s6.p8}}

{{s6.p9}}

{{s6.p10}}

{{s6.p11}}

{{s6.p12}}

{{s6.p13}}

{{s6.p14}}

{{s6.p15}}

~~~console
▼ prototype:
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
~~~

{{s6.p16}}

{{s6.p17}}

{{s6.p18}}

{{s6.p19}}

{{s6.p20}}

~~~js
var obj = {}
~~~

{{s6.p21}}

{{s6.p22}}

{{s6.p23}}

{{s6.p24}}

{{s6.p25}}

{{s6.p26}}

{{s6.p27}}

~~~js
console.dir(Array)
~~~

{{s6.p28}}

{{s6.p29}}

~~~js
console.dir(Array.__proto__.__proto__)  // Object
~~~

{{s6.p30}}

{{s6.p31}}

{{s6.p32}}

____________________________

{{s6.p33}}

{{s6.p34}}

_________________________

## ![ico-25 icon] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}
{{s7.p3}}
{{s7.p4}}
{{s7.p5}}
{{s7.p6}}
{{s7.p7}}
{{s7.p8}}

{{s7.p9}}

___________________________________

{{s7.p10}}

~~~js
function Sample (params) {}

var obj = new Sample()
~~~

{{s7.p11}}

~~~console
▼ Sample {}
    ▼ __proto__:
        ► constructor: ƒ Sample( params )
        ► __proto__: Object
~~~

{{s7.p12}}
{{s7.p13}}
{{s7.p14}}
{{s7.p15}}
{{s7.p16}}
{{s7.p17}}
{{s7.p18}}
{{s7.p19}}

~~~js
Sample.prototype
~~~

~~~console
▼ {constructor: ƒ}
    ► constructor: ƒ Sample(params)
    ► __proto__: Object
~~~

{{s7.p20}}

~~~js
Sample
  .prototype
  .setNewProperty = function (propName, propValue) {
    this[propName] = propValue
  }
~~~

{{s7.p21}}

{{s7.p22}}

~~~js
obj.setNewProperty('name', 'Petro')
~~~

{{s7.p23}}

{{s7.p24}}

{{s7.p25}}

___________________________________________

{{s7.p26}}

{{s7.p27}}

~~~js
var funcText = `
  var x = 'Hello'
  var y = 'baby'
  console.log(x + ', ' + y)
`

var func = new Function(funcText)

console.log(func)
func()
~~~

{{s7.p28}}

~~~console
ƒ anonymous(
) {
   var x = 'Hello'
   var y = 'baby'
   console.log(x + ', ' + y)
}
Hello, baby
~~~

___________________________________

## ![ico-25 icon] {{s8.h1}}

{{s8.p1}}
{{s8.p2}}

{{s8.p3}}

{{s8.p4}}

{{s8.p5}}

{{s8.p6}}

{{s8.p7}}
{{s8.p8}}

{{s8.p9}}

{{s8.p10}}

{{s8.p11}}

~~~js
var  Girl = function (name = 'Jane', age = 25) {
  this.name = name
  this.age = age

  function showName (name) {
    console.log(`My name is ${name}`)
  }

  this.changeName = function (newName) {
    this.name = newName
    showName(this.name)
  }
}

var lena = new Girl('Helen', 18)
lena.changeName('Mary')
~~~

{{s8.p12}}

{{s8.p13}}

{{s8.p14}}

{{s8.p15}}

{{s8.p16}}

___________________________________

{{s8.p17}}

~~~js
var girls = []

girls[0] = new Girl('Helen', 18)
girls[1] = new Girl('Mary', 20)
~~~

{{s8.p18}}

~~~js
var Bag = function (keyword) {
  var money = 3000

  var documents = [
    'Passport',
    'Driver license',
    'University Diploma'
  ]

  var accessories = [
    'Keys',
    'Movie tickets',
    'Medicine'
  ]

  this.content = null

  function getMoney (sum) {
    money -= sum
  }

  this.payment = function (sum) {
    if (prompt('Who are you?') !== keyword) return '⛔️'
    getMoney(sum)
    console.info(`Money left in wallet: ${money} uah`)
    return `Paid: ${sum} uah`
  }

  this.rummage = function () {
    this.content = [
      documents,
      accessories,
      money
    ]
    console.log(`Search protocol. Bag contents: ${this.content}`)
  }
}

var myCase = new Bag('it\'s me, your mistress')
~~~

{{s8.p19}}

{{s8.p20}}

{{s8.p21}}

{{s8.p22}}

{{s8.p23}}

{{s8.p24}}

{{s8.p25}}

{{s8.p26}}

{{s8.p27}}

{{s8.p28}}

{{s8.p29}}
{{s8.p30}}

{{s8.p31}}

~~~js
console.log(myCase.payment(2000))
~~~

{{s8.p32}}

{{s8.p33}}

{{s8.p34}}

~~~js
myCase.rummage ()
~~~

{{s8.p35}}

{{s8.p36}}

~~~js
console.log(myCase.content)
~~~

_________________________________________

{{s8.p37}}

{{s8.p38}}

{{s8.p39}}

{{s8.p40}}
