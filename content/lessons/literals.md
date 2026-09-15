# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}

![ico-25 cap] **{{common.c0}} 1**

~~~js
var str = "\nПривет,\nменя зовут Дима\n"

var lit = `
    Привет,
    меня зовут Дима

`

console.log(str)
console.log(lit)
console.log(str.charCodeAt(0))
console.log(lit.charCodeAt(0))
~~~

^^{{common.c2}}^^

![](createPath("illustrations", "string-methods-01.png"))

{{s1.p6}}

{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

__________________________________________________________________

{{s1.p10}}

![ico-25 cap] **{{common.c0}} 2**

~~~js
var cities = ['Неаполь', 'Вашингтон', 'Женева']

for (var i = 0; i < cities.length; i++) {
  console.log(`${ i + 1 }: ${ cities [ i ] }`)
}
~~~

^^{{common.c2}}^^

{{s1.p13}}

____________________________________________________________________

{{s1.p14}}

![ico-25 cap] **{{common.c0}} 3**

~~~js
var cities = [
  'Киев',
  'Львов',
  'Харьков',
  'Одесса',
  'Днепропетровск'
]

var str = ''

for (var x = 0; x < cities.length; x++) {
  str += `${cities[x].charCodeAt(0)}: ${cities[x]}\n`
}

console.log(str)
~~~

^^{{common.c2}}^^

![](createPath("illustrations", "string-methods-02.png"))

______________________________________________________________________

![ico-25 cap] **{{common.c0}} 4**

{{s1.p18}}

{{s1.p19}}

{{s1.p20}}

{{s1.p21}}

{{s1.p22}}

{{s1.p23}}

~~~js
var red = Math.round(Math.random() * 255).toString(16)
var green = Math.round(Math.random() * 255).toString(16)
var blue = Math.round(Math.random() * 255).toString(16)

var color = `#${red}${green}${blue}`
~~~

{{s1.p24}}

______________________________________________________________________________

![ico-25 cap] **{{common.c0}} 5**

{{s1.p26}}

~~~js
var red = Math.round(Math.random() * 255)
var green = Math.round(Math.random() * 255)
var blue = Math.round(Math.random() * 255)

var color = `rgb(${red},${green},${blue})`
~~~

{{s1.p27}}
