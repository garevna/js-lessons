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

## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

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

{{s3.p4}}

{{s3.p5}}

{{s3.p6}}

{{s3.p7}}

____________________________________________

### ![ico-25 cap] {{s4.h1}}

~~~js
var iteratedArray = [10, 20, 30]

for (var num of iteratedArray) {
  num /= 10
  console.log(num)
}
~~~

{{s4.p1}}

_________________________

### ![ico-25 cap] {{s5.h1}}

~~~js
var iteratedString = 'ABCDEF'

for (var char of iteratedString) {
  console.log(char)
}
~~~

{{s5.p1}}

________________________

{{s5.p2}}
{{s5.p3}}

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

### ![ico-25 cap] {{s6.h1}}

~~~js
function showArguments () {
  for (var arg of arguments) {
    console.log(arg)
  }
}

showArguments('begemot', false, 3)
~~~

{{s6.p1}}

___________________________

### ![ico-25 icon] {{s7.h1}}

{{s7.p1}}

{{s7.p2}}

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

{{s7.p3}}

~~~js
Киев
Львов
Харьков
Одесса
Монреаль
Вена
Лондон
~~~

{{s7.p4}}

~~~js
for (var city of cities) {
  if (city === 'Копенгаген') break
  console.log(city)
}
~~~

{{s7.p5}}

~~~js
Киев
Львов
Харьков
Одесса
Монреаль
~~~

{{s7.p6}}

{{s7.p7}}

_____________________

## ![ico-25 icon] {{s8.h1}}

{{s8.p1}}

{{s8.p2}}

{{s8.p3}}

### ![ico-25 cap] {{s9.h1}}

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

{{s9.p1}}

{{s9.p2}}

~~~js
for (var propName in iteratedObject) {
  console.log(iteratedObject[propName])
}
~~~

{{s9.p3}}

~~~js
Begemot, true, 3
~~~

{{s9.p4}}

~~~js
for (var propName in iteratedObject) {
    console.log(propName, ' : ',  iteratedObject[propName])
}
~~~

{{s9.p5}}

~~~js
name  :  Begemot
animal  :  true
age  :  3
~~~

_____________________________

### ![ico-20 icon] {{s10.h1}}

{{s10.p1}}

{{s10.p2}}

### ![ico-25 cap] {{s11.h1}}

~~~js
var iteratedArray = [7, 8, 9]

for (var index in iteratedArray) {
  console.log(index, ' : ', iteratedArray[index])
}
~~~

{{s11.p1}}

~~~js
0  :  7
1  :  8
2  :  9
~~~

__________________________

### ![ico-20 icon] {{s12.h1}}

~~~js
iteratedString = 'Котенок'
for (var index in iteratedString) {
  console.log(index, ' : ', iteratedString[index])
}
~~~

{{s12.p1}}

~~~js
0  :  К
1  :  о
2  :  т
3  :  е
4  :  н
5  :  о
6  :  к
~~~

{{s12.p2}}

{{s12.p3}}
{{s12.p4}}

_____________________________________________

### ![ico-25 cap] {{s13.h1}}

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

{{s13.p1}}
{{s13.p2}}
{{s13.p3}}

_______________________________

### ![ico-25 cap] {{s14.h1}}

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

{{s14.p1}}

~~~js
false

Now we haven't looked at the actual pixels of our canvas

Canvas
~~~

_________________________________

### ![ico-25 cap] {{s15.h1}}

{{s15.p1}}

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

{{s15.p2}}

~~~js
11
05
~~~

{{s15.p3}}

__________________________

### ![ico-25 cap] {{s16.h1}}

{{s16.p1}}

~~~js
for (var prop in obj) {
  if (prop == 1) break
  console.log(prop)
}
~~~

{{s16.p2}}

{{s16.p3}}

---------------------------------

## ![ico-25 icon] {{s17.h1}}

{{s17.p1}}

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

{{s17.p2}}

{{s17.p3}}

{{s17.p4}}

{{s17.p5}}

{{s17.p6}}

{{s17.p7}}

~~~js
cities.whereYouLive = 'Париж'
~~~

{{s17.p8}}

~~~js
console.log(cities)
~~~

{{s17.p9}}

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

{{s17.p10}}

{{s17.p11}}

~~~js
for (var city of cities) {
  console.log(city)
}
~~~

{{s17.p12}}

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

{{s17.p13}}

~~~js
for (var index in cities) {
  console.log(index)
}
~~~

{{s17.p14}}

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

{{s17.p15}}

{{s17.p16}}

{{s17.p17}}

{{s17.p18}}

{{s17.p19}}

~~~js
cities['whereYouLive']
~~~

{{s17.p20}}

________________

{{s17.p21}}
