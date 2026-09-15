# ![ico-30 study] String

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}

## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

~~~js
var message = 'We aRe the champions'

console.log(message[4])  // R
~~~

{{s1.p3}}

{{s1.p4}}

^^{{common.c15}}^^

~~~js
var  message = 'Привет', user = 'студент'

console.log(message + ', ' + user)
~~~

{{s1.p6}}


## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

### indexOf

{{s2.p2}}
{{s2.p3}}
{{s2.p4}}

^^^[indexOf()]

{{s2.p5}}

~~~js
console.log('My new book'.indexOf('new'))
~~~

{{s2.p6}}

^^{{common.c12}}^^

~~~js
var mainString = 'Дела идут неплохо'
var pos = mainString.indexOf('идут')
console.log(pos)
~~~

{{s2.p8}}

^^^

### slice

{{s2.p9}}
{{s2.p10}}

{{s2.p11}}
{{s2.p12}}
{{s2.p13}}

{{s2.p14}}

^^^[slice()]

^^{{common.c15}}^^

~~~js
var name = 'Меня зовут Мария'.slice(11, 16)
console.log(name)
~~~

{{s2.p16}}

|^^ 0 ^^|^^ 1 ^^|^^ 2 ^^|^^ 3 ^^|^^ 4 ^^|^^ 5 ^^|^^ 6 ^^|^^ 7 ^^|^^ 8 ^^|^^ 9 ^^|^^ 10 ^^|^^ 11 ^^|^^ 12 ^^|^^ 13 ^^|^^ 14 ^^|^^ 15 ^^|
{{s2.p17}}

{{s2.p18}}

~~~js
var str = 'Меня зовут Мария'
var name = str.slice(11, str.length)
console.log(name)
~~~

{{s2.p19}}

{{s2.p20}}

{{s2.p21}}

|^^-16^^|^^-15^^|^^-14^^|^^-13^^|^^-12^^|^^-11^^|^^-10^^|^^-9^^|^^-8^^|^^-7^^|^^-6^^|^^-5^^|^^-4^^|^^-3^^|^^-2^^|^^-1^^|
{{s2.p22}}
|^^ 0 ^^|^^ 1 ^^|^^ 2 ^^|^^ 3 ^^|^^ 4 ^^|^^ 5 ^^|^^ 6 ^^|^^ 7 ^^|^^ 8 ^^|^^ 9 ^^|^^ 10 ^^|^^ 11 ^^|^^ 12 ^^|^^ 13 ^^|^^ 14 ^^|^^ 15 ^^|

~~~js
str.slice(-11, -6)                  // вернет  "зовут"
str.slice(-str.length, str.length)  // вернет  "Меня зовут Мария"
str.slice(-11, str.length)          // вернет  "зовут Мария"
str.slice(-13, str.length)          // вернет  "я зовут Мария"
str.slice(-15, -1)                  // вернет  "еня зовут Мари"
str.slice(-16, -1)                  // вернет  "Меня зовут Мари"
str.slice(-16,  0)                  // вернет  "" ( пустую строку )
~~~

{{s2.p23}}

~~~js
str.slice(-str.length)   // вернет  "Меня зовут Мария" ( всю строку )
str.slice(5)             // вернет  "зовут Мария" ( до конца строки )
~~~

^^^

### substring

{{s2.p24}}
{{s2.p25}}
{{s2.p26}}

^^^[substring()]

~~~js
'Хорошего дня'.substring(9, 15) // "дня"
~~~

{{s2.p27}}

~~~js
'Хорошего дня'.substring(9)    // "дня"
~~~

^^^

### substr

{{s2.p28}}
{{s2.p29}}
{{s2.p30}}

^^^[substr()]

![ico-25 cap] ** 1 **

~~~js
var str = 'Веселый денек был сегодня'
console.log(str.substr(8, 5))
~~~

{{s2.p31}}


![ico-25 cap] ** 2 **

~~~js
var str = 'Веселый денек был сегодня'
console.log(str.substr(0, 7))
~~~

{{s2.p32}}

^^^

### toLowerCase

{{s2.p33}}

^^^[toLowerCase()]

![ico-25 cap]

~~~js
var str = 'ВЕСЕЛЫЙ ДЕНЕК БЫЛ СЕГОДНЯ'
console.log(str.toLowerCase ())
~~~

{{s2.p34}}

^^^

### toUpperCase

{{s2.p35}}

^^^[toUpperCase()]

![ico-25 cap]

~~~js
var str = 'веселый денек был сегодня'
console.log(str.toUpperCase())
~~~

{{s2.p36}}

^^^

### split

{{s2.p37}}
{{s2.p38}}
{{s2.p39}}
{{s2.p40}}


^^^[split()]

![ico-25 cap] ** 1 **

~~~js
var str = 'веселый денек был сегодня'
console.log(str.split('е'))
~~~

{{s2.p41}}

_______________________

![ico-25 cap] ** 2 **

~~~js
var str = 'one &#124; two &#124; three &#124; four &#124; five &#124; six'
console.log(str.split(' &#124; '))
~~~

{{s2.p42}}

^^^

### trim

{{s2.p43}}

^^^[trim()]

![ico-25 cap]

~~~js
var str = '   54   '
console.log(str.length)         // 8
console.log(str.trim().length)  // 2
~~~

^^^

### charAt

{{s2.p44}}

^^^[charAt()]

![ico-25 cap]

~~~js
var str = 'ХОРОШО'
console.log(str.charAt(4))   //  Ш
~~~

^^^

### charCodeAt

{{s2.p45}}

^^^[charCodeAt()]

![ico-25 cap] ** 1 **

~~~js
var str = 'ХОРОШО'
console.log(str.charCodeAt(4))   //  1064
~~~

![ico-25 cap] ** 2 **

~~~js
var str = '1234567'
console.log(str.charCodeAt(4))  //  53
~~~

^^^

### repeat

{{s2.p46}}

^^^[repeat()]

![ico-25 cap]

~~~js
var str = 'ХОРОШО! '
console.log(str.repeat(4))
~~~

{{s2.p47}}

^^^

### replace

{{s2.p48}}
{{s2.p49}}

^^^[replace()]

![ico-25 cap]

~~~js
var str = 'Ты проиграл! '
console.log(str.replace('проиграл', 'победил'))
~~~

{{s2.p50}}

^^^

### padStart | padEnd

**^^ES8 (2017)^^**

{{s2.p51}}
{{s2.p52}}
{{s2.p53}}
{{s2.p54}}
{{s2.p55}}
{{s2.p56}}
{{s2.p57}}

^^^[padStart & padEnd]

![ico-25 cap] ** 1 **

~~~js
'Google'.padStart(5)               //  "Google"
'Google'.padStart(10)              //  "    Google"
'Google'.padStart(10).padEnd(15)   //  "    Google     "
'Google'
  .padStart(10, '789')
  .padEnd(15, '45')                //  "7897Google45454"
~~~

![ico-25 cap] ** 2 **

~~~js
var cities = ['Naples', 'Washington', 'Geneva']

for (var city of cities) {
  console.log(`City: ${city.padEnd(16)} (${cities.indexOf(city)})`)
}
~~~

^^{{common.c2}}^^

~~~console
City: Naples           (0)
City: Washington       (1)
City: Geneva           (2)
~~~

^^^

___________________________________________________________________________

{{s2.p59}}

___________________________________________________________________________

[^^![ico-20 link] MDN^^](external/mdn-string)
[^^![ico-20 link] String Methods^^](external/w3-string-methods)
[^^![ico-20 link] String Reference^^](external/w3-string)
