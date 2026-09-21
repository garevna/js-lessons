# ![ico-30 study] {{p1}}

_____________________________________________

## ![ico-25 icon] {{p2}}

{{p3}}

{{p4}}

^^^[{{p5}}]

**{{common.c18}}**
     ^^Math^^
     ^^JSON^^
{{p6}}
     ^^Array^^
     ^^Boolean^^
     ^^Number^^
     ^^String^^
     ^^Function^^
     ^^Object^^
     ^^Date^^
     ^^Error^^
     ^^Map^^
     ^^Set^^
     ^^FormData^^
     ^^Promise^^
     ^^Proxy^^
     ^^RegExp^^
     ...
^^^

{{p7}}

~~~js
var obj = {
  name: 'Google',
  show: false
}
~~~

{{p8}}

{{p9}}

^^^[{{p10}}]
**{{common.c18}}**
     ^^window^^
     ^^document^^
     ^^history^^
     ^^location^^
     ^^console^^
     ...
{{p11}}
     ^^Event^^
     ^^HTMLElement^^
     ^^XMLHttpRequest^^
     ...
^^^

{{p12}}

~~~js
console.dir(Promise)
console.dir(XMLHttpRequest)
~~~

{{p13}}

{{p14}}
{{p15}}

_________________________________

## ![ico-25 icon] {{p16}}

{{p17}}

![ico-25 cap]

~~~js
var figure = {
  type: 'circle',
  radius: 100,
  color: 'red'
}
~~~

{{p18}}

~~~js
console.log(figure.type)
console.log(figure.radius)
console.log(figure.color)
~~~

{{common.c9}}

~~~js
console.log(figure['type'])
console.log(figure['radius'])
console.log(figure['color'])
~~~

{{p19}}

{{p20}}

^^^[Closure]

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

{{p21}}

{{p22}}

{{p23}}

{{p24}}

^^^

____________________________________________

### ![ico-20 icon] {{p25}}

{{p26}}

{{p27}}

{{p28}}

◘◘![ico-25 cap] 1◘◘

~~~js
var figure2 = {
  type: 'triangle',
  size: 150,
  color: 'blue'
}
~~~

{{p29}}

{{p30}}

{{p31}}

{{p32}}

~~~js
figure.type       // "circle"
figure2.type      // "triangle"
~~~

__________________________________________

### ![ico-20 icon] {{p33}}

{{p34}}

{{p35}}
{{p36}}

~~~js
for (var prop in figure) console.log(prop)
~~~

{{p37}}

~~~console
type
size
color
~~~

{{p38}}

{{p39}}

{{p40}}
{{p41}}
{{p42}}

________________________

### ![ico-20 icon] {{p43}}

◘◘![ico-25 cap] 2◘◘

~~~js
var figure = {
  type: 'circle',
  radius: 100,
  color: 'red'
}
~~~

{{p44}}

~~~console
▼{ type: "Окружность", radius: 100, color: "red" }
    color:"red"
    radius:100
    type:"Окружность"
  ► [[Prototype]]:Object
~~~

{{p45}}

{{p46}}

{{p47}}

{{p48}}

^^^[__proto__]

~~~console
▼ [[Prototype]]
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

^^^

{{p49}}

~constructor: ƒ Object()~

{{p50}}

{{p51}}

{{p52}}

{{p53}}

{{p54}}

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

{{p55}}

{{p56}}

{{p57}}

{{p58}}

{{p59}}

~~~js
var obj = {}
~~~

{{p60}}

{{p61}}

{{p62}}

{{p63}}

{{p64}}

{{p65}}

{{p66}}

~~~js
console.dir(Array)
~~~

{{p67}}

{{p68}}

~~~js
console.dir(Array.__proto__.__proto__)  // Object
~~~

{{p69}}

{{p70}}

{{p71}}

____________________________

![ico-25 hw] **{{common.c3}}**

{{p72}}

_________________________

## ![ico-25 icon] {{common.c7}}

{{p73}}

{{p74}}
{{p75}}
{{p76}}
{{p77}}
{{p78}}
{{p79}}
{{p80}}

{{p81}}

___________________________________

◘◘![ico-25 cap] 3◘◘

~~~js
function Sample (params) {}

var obj = new Sample()
~~~

{{p82}}

~~~console
▼ Sample {}
    ▼ [[Prototype]]:
        ► constructor: ƒ Sample( params )
        ► [[Prototype]]: Object
~~~

{{p83}}
{{p84}}
{{p85}}
{{p86}}
{{p87}}
{{p88}}
{{p89}}
{{p90}}

~~~js
Sample.prototype
~~~

~~~console
▼ {constructor: ƒ}
    ► constructor: ƒ Sample(params)
    ► [[Prototype]]: Object
~~~

{{p91}}

~~~js
Sample
  .prototype
  .setNewProperty = function (propName, propValue) {
    this[propName] = propValue
  }
~~~

{{p92}}

{{p93}}

~~~js
obj.setNewProperty('name', 'Petro')
~~~

{{p94}}

{{p95}}

{{p96}}

___________________________________________

{{p97}}

◘◘![ico-20 cap] 4◘◘

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

## ![ico-25 icon] {{p98}}

{{p99}}
{{p100}}

{{p101}}

{{p102}}

{{p103}}

{{p104}}

{{p105}}
{{p106}}

{{p107}}

{{p108}}

◘◘![ico-25 cap] 5◘◘

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

{{p109}}

{{p110}}

{{p111}}

{{p112}}

{{p113}}

___________________________________

◘◘![ico-25 cap] 6◘◘

~~~js
var girls = []

girls[0] = new Girl('Helen', 18)
girls[1] = new Girl('Mary', 20)
~~~

◘◘![ico-25 cap] 7◘◘

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

{{p114}}

{{p115}}

{{p116}}

{{p117}}

{{p118}}

{{p119}}

{{p120}}

{{p121}}

{{p122}}

{{p123}}

{{p124}}
{{p125}}

{{p126}}

~~~js
console.log(myCase.payment(2000))
~~~

{{p127}}

{{p128}}

{{p129}}

~~~js
myCase.rummage ()
~~~

{{p130}}

{{p131}}

~~~js
console.log(myCase.content)
~~~

_________________________________________

{{p132}}

{{p133}}

{{p134}}

{{p135}}
