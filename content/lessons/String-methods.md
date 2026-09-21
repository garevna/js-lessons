# ![ico-30 study] String

{{p1}}

{{p2}}

{{p3}}

## ![ico-25 icon] {{p4}}

{{p5}}
{{p6}}

~~~js
var message = 'We aRe the champions'

console.log(message[4])  // R
~~~

{{p7}}

{{p8}}

^^{{common.c15}}^^

~~~js
var  message = 'Привет', user = 'студент'

console.log(message + ', ' + user)
~~~

{{p9}}

## ![ico-25 icon] {{p10}}

{{p11}}

### indexOf

{{p12}}
{{p13}}
{{p14}}

^^^[indexOf()]

{{p15}}

~~~js
console.log('My new book'.indexOf('new'))
~~~

{{p16}}

^^{{common.c12}}^^

~~~js
var mainString = 'Дела идут неплохо'
var pos = mainString.indexOf('идут')
console.log(pos)
~~~

{{p17}}

^^^

### slice

{{p18}}
{{p19}}

{{p20}}
{{p21}}
{{p22}}

{{p23}}

^^^[slice()]

^^{{common.c15}}^^

~~~js
var name = 'Меня зовут Мария'.slice(11, 16)
console.log(name)
~~~

{{p24}}

|^^ 0 ^^|^^ 1 ^^|^^ 2 ^^|^^ 3 ^^|^^ 4 ^^|^^ 5 ^^|^^ 6 ^^|^^ 7 ^^|^^ 8 ^^|^^ 9 ^^|^^ 10 ^^|^^ 11 ^^|^^ 12 ^^|^^ 13 ^^|^^ 14 ^^|^^ 15 ^^|
{{p25}}

{{p26}}

~~~js
var str = 'Меня зовут Мария'
var name = str.slice(11, str.length)
console.log(name)
~~~

{{p27}}

{{p28}}

{{p29}}

|^^-16^^|^^-15^^|^^-14^^|^^-13^^|^^-12^^|^^-11^^|^^-10^^|^^-9^^|^^-8^^|^^-7^^|^^-6^^|^^-5^^|^^-4^^|^^-3^^|^^-2^^|^^-1^^|
{{p30}}
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

{{p31}}

~~~js
str.slice(-str.length)   // вернет  "Меня зовут Мария" ( всю строку )
str.slice(5)             // вернет  "зовут Мария" ( до конца строки )
~~~

^^^

### substring

{{p32}}
{{p33}}
{{p34}}

^^^[substring()]

~~~js
'Хорошего дня'.substring(9, 15) // "дня"
~~~

{{p35}}

~~~js
'Хорошего дня'.substring(9)    // "дня"
~~~

^^^

### substr

{{p36}}
{{p37}}
{{p38}}

^^^[substr()]

![ico-25 cap] ** 1 **

~~~js
var str = 'Веселый денек был сегодня'
console.log(str.substr(8, 5))
~~~

{{p39}}

![ico-25 cap] ** 2 **

~~~js
var str = 'Веселый денек был сегодня'
console.log(str.substr(0, 7))
~~~

{{p40}}

^^^

### toLowerCase

{{p41}}

^^^[toLowerCase()]

![ico-25 cap]

~~~js
var str = 'ВЕСЕЛЫЙ ДЕНЕК БЫЛ СЕГОДНЯ'
console.log(str.toLowerCase ())
~~~

{{p42}}

^^^

### toUpperCase

{{p43}}

^^^[toUpperCase()]

![ico-25 cap]

~~~js
var str = 'веселый денек был сегодня'
console.log(str.toUpperCase())
~~~

{{p44}}

^^^

### split

{{p45}}
{{p46}}
{{p47}}
{{p48}}

^^^[split()]

![ico-25 cap] ** 1 **

~~~js
var str = 'веселый денек был сегодня'
console.log(str.split('е'))
~~~

{{p49}}

_______________________

![ico-25 cap] ** 2 **

~~~js
var str = 'one &#124; two &#124; three &#124; four &#124; five &#124; six'
console.log(str.split(' &#124; '))
~~~

{{p50}}

^^^

### trim

{{p51}}

^^^[trim()]

![ico-25 cap]

~~~js
var str = '   54   '
console.log(str.length)         // 8
console.log(str.trim().length)  // 2
~~~

^^^

### charAt

{{p52}}

^^^[charAt()]

![ico-25 cap]

~~~js
var str = 'ХОРОШО'
console.log(str.charAt(4))   //  Ш
~~~

^^^

### charCodeAt

{{p53}}

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

{{p54}}

^^^[repeat()]

![ico-25 cap]

~~~js
var str = 'ХОРОШО! '
console.log(str.repeat(4))
~~~

{{p55}}

^^^

### replace

{{p56}}
{{p57}}

^^^[replace()]

![ico-25 cap]

~~~js
var str = 'Ты проиграл! '
console.log(str.replace('проиграл', 'победил'))
~~~

{{p58}}

^^^

### padStart | padEnd

**^^ES8 (2017)^^**

{{p59}}
{{p60}}
{{p61}}
{{p62}}
{{p63}}
{{p64}}
{{p65}}

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

~~~console
City: Naples           (0)
City: Washington       (1)
City: Geneva           (2)
~~~

^^^

___________________________________________________________________________

※※※tests ⟦f9⟧※※※

___________________________________________________________________________

[^^![ico-20 link] MDN^^](external/mdn-string)
[^^![ico-20 link] String Methods^^](external/w3-string-methods)
[^^![ico-20 link] String Reference^^](external/w3-string)
