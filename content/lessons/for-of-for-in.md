# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}
{{s1.p4}}
{{s1.p5}}
{{s1.p6}}

______________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

____________________________________

## ![ico-25 icon] for...of

{{s2.p5}}

{{s2.p6}}

{{s2.p7}}

~~~js
var iteratedObject = {
  name: 'Begemot',
  animal: true,
  age: 3
}

for (var item of iteratedObject) {
  console.log(item)
}
~~~

{{s2.p8}}

![ico-20 err]  ~Uncaught TypeError: iteratedObject is not iterable~

{{s2.p9}}

{{s2.p10}}

____________________________________________

### ![ico-25 cap] Array

~~~js
var iteratedArray = [10, 20, 30]

for (var num of iteratedArray) {
  num /= 10
  console.log(num)
}
~~~

{{s2.p11}}

_________________________

### ![ico-25 cap] String

~~~js
var iteratedString = 'ABCDEF'

for (var char of iteratedString) {
  console.log(char)
}
~~~

{{s2.p12}}

________________________

{{s2.p13}}
{{s2.p14}}

~~~js
function testBrackets ( string ) {
  var brackets = {
    '[': ']',
    '{': '}',
    '(': ')'
  }

  var stack = [], result = ''

  for (var symbol of string) {
    if (!brackets[symbol] && stack.length === 0) return false

    brackets[symbol]
      ? stack.push(symbol)
      : symbol = brackets[stack.pop()]

    result += symbol
  }
    return result === string && stack.length === 0
}
~~~

________________

### ![ico-25 cap] ~arguments~

~~~js
function showArguments () {
  for (var arg of arguments) {
    console.log(arg)
  }
}

showArguments('begemot', false, 3)
~~~

{{s2.p15}}

___________________________

### ![ico-25 icon] ~continue~ | ~break~

{{s2.p16}}

{{s2.p17}}

~~~js
var cities = [
  'Киев',
  'Львов',
  'Харьков',
  'Одесса',
  'Монреаль',
  'Копенгаген',
  'Вена',
  'Лондон'
]

for (var city of cities) {
  if (city === 'Копенгаген') continue
  console.log(city)
}
~~~

{{s2.p18}}

~~~js
Киев
Львов
Харьков
Одесса
Монреаль
Вена
Лондон
~~~

{{s2.p19}}

~~~js
for (var city of cities) {
  if (city === 'Копенгаген') break
  console.log(city)
}
~~~

{{s2.p20}}

~~~js
Киев
Львов
Харьков
Одесса
Монреаль
~~~

{{s2.p21}}

{{s2.p22}}

_____________________

## ![ico-25 icon] for...in

{{s2.p23}}

{{s2.p24}}

{{s2.p25}}

### ![ico-25 cap] {{common.c0}}

~~~js
var iteratedObject = {
  name: 'Begemot',
  animal: true,
  age: 3
}

for (var prop in iteratedObject) {
  console.log(prop)
}
~~~

{{s3.p1}}

{{s3.p2}}

~~~js
for (var propName in iteratedObject) {
  console.log(iteratedObject[propName])
}
~~~

{{s3.p3}}

~~~js
Begemot, true, 3
~~~

{{s3.p4}}

~~~js
for (var propName in iteratedObject) {
    console.log(propName, ' : ',  iteratedObject[propName])
}
~~~

{{s3.p5}}

~~~js
name  :  Begemot
animal  :  true
age  :  3
~~~

_____________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

### ![ico-25 cap] {{common.c0}} 1

~~~js
var iteratedArray = [7, 8, 9]

for (var index in iteratedArray) {
  console.log(index, ' : ', iteratedArray[index])
}
~~~

**{{common.c28}}**

~~~js
0  :  7
1  :  8
2  :  9
~~~

__________________________

### ![ico-20 icon] {{s6.h1}}

~~~js
iteratedString = 'Котенок'
for (var index in iteratedString) {
  console.log(index, ' : ', iteratedString[index])
}
~~~

**{{common.c28}}**

~~~js
0  :  К
1  :  о
2  :  т
3  :  е
4  :  н
5  :  о
6  :  к
~~~

{{s6.p2}}

{{s6.p3}}
{{s6.p4}}

_____________________________________________

### ![ico-25 cap] {{common.c0}} 2

~~~js
var article = {
  title: 'Canvas',
  text: 'We will also look into how image smoothing',
  likes: 0
}

for (var prop in article) {
  console.log(article[prop])
}
~~~

{{s7.p1}}
{{s7.p2}}
{{s7.p3}}

_______________________________

### ![ico-25 cap] {{common.c0}} 3

~~~js
var obj = {
  11: 'Canvas',
  2: 'Now we haven't looked at the actual pixels of our canvas',
  1: false
}

for (var prop in obj) {
  console.log(obj[prop])
}
~~~

{{s8.p1}}

~~~js
false

Now we haven't looked at the actual pixels of our canvas

Canvas
~~~

_________________________________

### ![ico-25 cap] continue

{{s8.p2}}

~~~js
var obj = {
  '11': 'Canvas',
  '01': 'How to save images from your canvas',
  '05': false
}

for (var prop in obj) {
  if (prop == 1) continue
  console.log(prop)
}
~~~

{{s8.p3}}

~~~js
11
05
~~~

{{s8.p4}}

__________________________

### ![ico-25 cap] break

{{s8.p5}}

~~~js
for (var prop in obj) {
  if (prop == 1) break
  console.log(prop)
}
~~~

{{s8.p6}}

{{s8.p7}}

---------------------------------

## ![ico-25 icon] for...of vs for...in

{{s8.p8}}

~~~js
var cities = [
  'Киев',
  'Львов',
  'Харьков',
  'Одесса',
  'Монреаль',
  'Копенгаген',
  'Вена',
  'Лондон'
]
~~~

{{s8.p9}}

{{s8.p10}}

{{s8.p11}}

{{s8.p12}}

{{s8.p13}}

{{s8.p14}}

~~~js
cities.whereYouLive = 'Париж'
~~~

{{s8.p15}}

~~~js
console.log(cities)
~~~

{{s8.p16}}

~~~js
▼ (8) ['Киев', 'Львов', 'Харьков', 'Одесса', 'Монреаль', 'Копенгаген', 'Вена', 'Лондон', whereYouLive: 'Париж']
    0: 'Киев'
    1: 'Львов'
    2: 'Харьков'
    3: 'Одесса'
    4: 'Монреаль'
    5: 'Копенгаген'
    6: 'Вена'
    7: 'Лондон'
    whereYouLive: 'Париж'
    length: 8
  ► __proto__: Array(0)
~~~

{{s8.p17}}

{{s8.p18}}

~~~js
for (var city of cities) {
  console.log(city)
}
~~~

**{{common.c28}}**

~~~console
Киев
Львов
Харьков
Одесса
Монреаль
Копенгаген
Вена
Лондон
~~~

{{s8.p20}}

~~~js
for (var index in cities) {
  console.log(index)
}
~~~

**{{common.c28}}**

~~~console
0
1
2
3
4
5
6
7
whereYouLive
~~~

{{s8.p22}}

{{s8.p23}}

{{s8.p24}}

{{s8.p25}}

{{s8.p26}}

~~~js
cities['whereYouLive']
~~~

{{s8.p27}}

________________

[![ico-30 hw] Quiz](quiz/for-in-for-of)
