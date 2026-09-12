# ![ico-30 study] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}

{{s1.p4}}

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

{{s1.p5}}

{{s1.p6}}

{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

{{s1.p10}}

__________________________________________________________________

{{s1.p11}}

{{s1.p12}}

~~~js
var cities = ['Неаполь', 'Вашингтон', 'Женева']

for (var i = 0; i < cities.length; i++) {
  console.log(`${ i + 1 }: ${ cities [ i ] }`)
}
~~~

{{s1.p13}}

{{s1.p14}}

____________________________________________________________________

{{s1.p15}}

{{s1.p16}}

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

{{s1.p17}}

{{s1.p18}}

______________________________________________________________________

{{s1.p19}}

{{s1.p20}}

{{s1.p21}}

{{s1.p22}}

{{s1.p23}}

{{s1.p24}}

{{s1.p25}}

~~~js
var red = Math.round(Math.random() * 255).toString(16)
var green = Math.round(Math.random() * 255).toString(16)
var blue = Math.round(Math.random() * 255).toString(16)

var color = `#${red}${green}${blue}`
~~~

{{s1.p26}}

______________________________________________________________________________

{{s1.p27}}

{{s1.p28}}

~~~js
var red = Math.round(Math.random() * 255)
var green = Math.round(Math.random() * 255)
var blue = Math.round(Math.random() * 255)

var color = `rgb(${red},${green},${blue})`
~~~

{{s1.p29}}
