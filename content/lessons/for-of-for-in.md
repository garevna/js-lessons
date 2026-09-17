# ![ico-30 study] {{p1}}

{{p2}}

{{p3}}
{{p4}}
{{p5}}
{{p6}}
{{p7}}

______________________________

## ![ico-25 icon] {{p8}}

{{p9}}

{{p10}}
{{p11}}

{{p12}}

____________________________________

## ![ico-25 icon] for...of

{{p13}}

{{p14}}

{{p15}}

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

{{p16}}

![ico-20 err]  ~Uncaught TypeError: iteratedObject is not iterable~

{{p17}}

{{p18}}

____________________________________________

### ![ico-25 cap] Array

~~~js
var iteratedArray = [10, 20, 30]

for (var num of iteratedArray) {
  num /= 10
  console.log(num)
}
~~~

{{p19}}

_________________________

### ![ico-25 cap] String

~~~js
var iteratedString = 'ABCDEF'

for (var char of iteratedString) {
  console.log(char)
}
~~~

{{p20}}

________________________

{{p21}}
{{p22}}

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

{{p23}}

___________________________

### ![ico-25 icon] ~continue~ | ~break~

{{p24}}

{{p25}}

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

{{p26}}

~~~js
Киев
Львов
Харьков
Одесса
Монреаль
Вена
Лондон
~~~

{{p27}}

~~~js
for (var city of cities) {
  if (city === 'Копенгаген') break
  console.log(city)
}
~~~

{{p28}}

~~~js
Киев
Львов
Харьков
Одесса
Монреаль
~~~

{{p29}}

{{p30}}

_____________________

## ![ico-25 icon] for...in

{{p31}}

{{p32}}

{{p33}}

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

{{p34}}

{{p35}}

~~~js
for (var propName in iteratedObject) {
  console.log(iteratedObject[propName])
}
~~~

{{p36}}

~~~js
Begemot, true, 3
~~~

{{p37}}

~~~js
for (var propName in iteratedObject) {
    console.log(propName, ' : ',  iteratedObject[propName])
}
~~~

{{p38}}

~~~js
name  :  Begemot
animal  :  true
age  :  3
~~~

_____________________________

### ![ico-20 icon] {{p39}}

{{p40}}

{{p41}}

### ![ico-25 cap] {{common.c0}} 1

~~~js
var iteratedArray = [7, 8, 9]

for (var index in iteratedArray) {
  console.log(index, ' : ', iteratedArray[index])
}
~~~

**{{topic.t7}}**

~~~js
0  :  7
1  :  8
2  :  9
~~~

__________________________

### ![ico-20 icon] {{p42}}

~~~js
iteratedString = 'Котенок'
for (var index in iteratedString) {
  console.log(index, ' : ', iteratedString[index])
}
~~~

**{{topic.t7}}**

~~~js
0  :  К
1  :  о
2  :  т
3  :  е
4  :  н
5  :  о
6  :  к
~~~

{{p43}}

{{p44}}
{{p45}}

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

{{p46}}
{{p47}}
{{p48}}

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

{{p49}}

~~~js
false

Now we haven't looked at the actual pixels of our canvas

Canvas
~~~

_________________________________

### ![ico-25 cap] continue

{{p50}}

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

{{p51}}

~~~js
11
05
~~~

{{p52}}

__________________________

### ![ico-25 cap] break

{{p53}}

~~~js
for (var prop in obj) {
  if (prop == 1) break
  console.log(prop)
}
~~~

{{p54}}

{{p55}}

---------------------------------

## ![ico-25 icon] for...of vs for...in

{{p56}}

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

{{p57}}

{{p58}}

{{p59}}

{{p60}}

{{p61}}

{{p62}}

~~~js
cities.whereYouLive = 'Париж'
~~~

{{p63}}

~~~js
console.log(cities)
~~~

{{p64}}

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

{{p65}}

{{p66}}

~~~js
for (var city of cities) {
  console.log(city)
}
~~~

**{{topic.t7}}**

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

{{p67}}

~~~js
for (var index in cities) {
  console.log(index)
}
~~~

**{{topic.t7}}**

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

{{p68}}

{{p69}}

{{p70}}

{{p71}}

{{p72}}

~~~js
cities['whereYouLive']
~~~

{{p73}}

________________

[![ico-30 hw] Quiz](quiz/for-in-for-of)
