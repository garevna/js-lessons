# ![ico-30 study] {{p1}}

{{p2}}

{{p3}}
{{p4}}

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

{{p5}}

{{p6}}

{{p7}}

{{p8}}

__________________________________________________________________

{{p9}}

![ico-25 cap] **{{common.c0}} 2**

~~~js
var cities = ['Неаполь', 'Вашингтон', 'Женева']

for (var i = 0; i < cities.length; i++) {
  console.log(`${ i + 1 }: ${ cities [ i ] }`)
}
~~~

^^{{common.c2}}^^

•••• none
{{p21}}
{{p22}}
{{p23}}
••••

____________________________________________________________________

{{p11}}

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

{{p12}}

{{p13}}

{{p14}}

{{p15}}

{{p16}}

{{p17}}

~~~js
var red = Math.round(Math.random() * 255).toString(16)
var green = Math.round(Math.random() * 255).toString(16)
var blue = Math.round(Math.random() * 255).toString(16)

var color = `#${red}${green}${blue}`
~~~

{{p18}}

______________________________________________________________________________

![ico-25 cap] **{{common.c0}} 5**

{{p19}}

~~~js
var red = Math.round(Math.random() * 255)
var green = Math.round(Math.random() * 255)
var blue = Math.round(Math.random() * 255)

var color = `rgb(${red},${green},${blue})`
~~~

{{p20}}
