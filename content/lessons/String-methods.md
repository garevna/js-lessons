# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}
{{s2.p2}}

~~~js
var message = 'We aRe the champions'

console.log(message[4])  // R
~~~

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

~~~js
var  message = 'Привет', user = 'студент'

console.log(message + ', ' + user)
~~~

{{s2.p6}}


## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

### {{s4.h1}}

{{s4.p1}}
{{s4.p2}}
{{s4.p3}}

^^^[{{s4.spoiler1}}]

{{s4.p4}}

~~~js
console.log('My new book'.indexOf('new'))
~~~

{{s4.p5}}

{{s4.p6}}

~~~js
var mainString = 'Дела идут неплохо'
var pos = mainString.indexOf('идут')
console.log(pos)
~~~

{{s4.p7}}

^^^

### {{s5.h1}}

{{s5.p1}}
{{s5.p2}}

{{s5.p3}}
{{s5.p4}}
{{s5.p5}}

{{s5.p6}}

^^^[{{s5.spoiler1}}]

{{s5.p7}}

~~~js
var name = 'Меня зовут Мария'.slice(11, 16)
console.log(name)
~~~

{{s5.p8}}

|^^ 0 ^^|^^ 1 ^^|^^ 2 ^^|^^ 3 ^^|^^ 4 ^^|^^ 5 ^^|^^ 6 ^^|^^ 7 ^^|^^ 8 ^^|^^ 9 ^^|^^ 10 ^^|^^ 11 ^^|^^ 12 ^^|^^ 13 ^^|^^ 14 ^^|^^ 15 ^^|
{{s5.p9}}

{{s5.p10}}

~~~js
var str = 'Меня зовут Мария'
var name = str.slice(11, str.length)
console.log(name)
~~~

{{s5.p11}}

{{s5.p12}}

{{s5.p13}}

|^^-16^^|^^-15^^|^^-14^^|^^-13^^|^^-12^^|^^-11^^|^^-10^^|^^-9^^|^^-8^^|^^-7^^|^^-6^^|^^-5^^|^^-4^^|^^-3^^|^^-2^^|^^-1^^|
{{s5.p14}}
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

{{s5.p15}}

~~~js
str.slice(-str.length)   // вернет  "Меня зовут Мария" ( всю строку )
str.slice(5)             // вернет  "зовут Мария" ( до конца строки )
~~~

^^^

### {{s6.h1}}

{{s6.p1}}
{{s6.p2}}
{{s6.p3}}

^^^[{{s6.spoiler1}}]

~~~js
'Хорошего дня'.substring(9, 15) // "дня"
~~~

{{s6.p4}}

~~~js
'Хорошего дня'.substring(9)    // "дня"
~~~

^^^

### {{s7.h1}}

{{s7.p1}}
{{s7.p2}}
{{s7.p3}}

^^^[{{s7.spoiler1}}]

{{s7.p4}}

~~~js
var str = 'Веселый денек был сегодня'
console.log(str.substr(8, 5))
~~~

{{s7.p5}}


{{s7.p6}}

~~~js
var str = 'Веселый денек был сегодня'
console.log(str.substr(0, 7))
~~~

{{s7.p7}}

^^^

### {{s8.h1}}

{{s8.p1}}

^^^[{{s8.spoiler1}}]

{{s8.p2}}

~~~js
var str = 'ВЕСЕЛЫЙ ДЕНЕК БЫЛ СЕГОДНЯ'
console.log(str.toLowerCase ())
~~~

{{s8.p3}}

^^^

### {{s9.h1}}

{{s9.p1}}

^^^[{{s9.spoiler1}}]

{{s9.p2}}

~~~js
var str = 'веселый денек был сегодня'
console.log(str.toUpperCase())
~~~

{{s9.p3}}

^^^

### {{s10.h1}}

{{s10.p1}}
{{s10.p2}}
{{s10.p3}}
{{s10.p4}}


^^^[{{s10.spoiler1}}]

{{s10.p5}}

~~~js
var str = 'веселый денек был сегодня'
console.log(str.split('е'))
~~~

{{s10.p6}}

_______________________

{{s10.p7}}

~~~js
var str = 'one &#124; two &#124; three &#124; four &#124; five &#124; six'
console.log(str.split(' &#124; '))
~~~

{{s10.p8}}

^^^

### {{s11.h1}}

{{s11.p1}}

^^^[{{s11.spoiler1}}]

{{s11.p2}}

~~~js
var str = '   54   '
console.log(str.length)         // 8
console.log(str.trim().length)  // 2
~~~

^^^

### {{s12.h1}}

{{s12.p1}}

^^^[{{s12.spoiler1}}]

{{s12.p2}}

~~~js
var str = 'ХОРОШО'
console.log(str.charAt(4))   //  Ш
~~~

^^^

### {{s13.h1}}

{{s13.p1}}

^^^[{{s13.spoiler1}}]

{{s13.p2}}

~~~js
var str = 'ХОРОШО'
console.log(str.charCodeAt(4))   //  1064
~~~

{{s13.p3}}

~~~js
var str = '1234567'
console.log(str.charCodeAt(4))  //  53
~~~

^^^

### {{s14.h1}}

{{s14.p1}}

^^^[{{s14.spoiler1}}]

{{s14.p2}}

~~~js
var str = 'ХОРОШО! '
console.log(str.repeat(4))
~~~

{{s14.p3}}

^^^

### {{s15.h1}}

{{s15.p1}}
{{s15.p2}}

^^^[{{s15.spoiler1}}]

{{s15.p3}}

~~~js
var str = 'Ты проиграл! '
console.log(str.replace('проиграл', 'победил'))
~~~

{{s15.p4}}

^^^

### {{s16.h1}}

{{s16.p1}}

{{s16.p2}}
{{s16.p3}}
{{s16.p4}}
{{s16.p5}}
{{s16.p6}}
{{s16.p7}}
{{s16.p8}}

^^^[{{s16.spoiler1}}]

{{s16.p9}}

~~~js
'Google'.padStart(5)               //  "Google"
'Google'.padStart(10)              //  "    Google"
'Google'.padStart(10).padEnd(15)   //  "    Google     "
'Google'
  .padStart(10, '789')
  .padEnd(15, '45')                //  "7897Google45454"
~~~

{{s16.p10}}

~~~js
var cities = ['Naples', 'Washington', 'Geneva']

for (var city of cities) {
  console.log(`City: ${city.padEnd(16)} (${cities.indexOf(city)})`)
}
~~~

{{s16.p11}}

~~~console
City: Naples           (0)
City: Washington       (1)
City: Geneva           (2)
~~~

^^^

___________________________________________________________________________

{{s16.p12}}

___________________________________________________________________________

{{s16.p13}}
{{s16.p14}}
{{s16.p15}}
