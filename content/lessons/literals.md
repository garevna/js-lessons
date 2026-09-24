# ![ico-30 study] {{p1}}

{{p2}}

{{p25}}
{{p26}}

## ![ico-25 icon] {{p21}}

{{p22}}

~~~js
var str = "
  Welcome, ladies and gentlemen
  we hope you enjoy learning JS!
  Remember the golden rule:
  not a day without writing a line of code!
"
~~~

~~~console
<p class="error-message">Uncaught SyntaxError&colon; Invalid or unexpected token</p>
~~~

{{p3}}

~~~js
var str = "Welcome, ladies and gentlemen,\nwe hope you enjoy learning JS!\nRemember the golden rule:\nnot a day without writing a line of code!"

console.log(str)
~~~

~~~console
Welcome, ladies and gentlemen,
we hope you enjoy learning JS!
Remember the golden rule&colon;
not a day without writing a line of code!
~~~

{{p23}}

![ico-25 cap] **{{common.c0}} 1**

~~~js
var lit = `
Welcome, ladies and gentlemen,
we hope you enjoy learning JS!
Remember the golden rule:
not a day without writing a line of code!
`

console.log(lit)
~~~

~~~console
    
Welcome, ladies and gentlemen,
we hope you enjoy learning JS!
Remember the golden rule&colon;
not a day without writing a line of code!
~~~

{{p4}}

~~~js
lit[0]  // '\n'
~~~

~~~js
console.log(lit.charCodeAt(0)) // 10
~~~

{{p5}}

{{p6}}

{{p7}}

~~~js
var style = `
width: 100px;
height: 100px;
background: #dde;
padding: 16px;
`

console.log(style)
~~~

~~~console
width&colon; 100px;
height&colon; 100px;
background&colon; #dde;
padding&colon; 16px;
~~~

{{p8}}

__________________________________________________________________

## ![ico-25 icon] {{p24}}

{{p9}}

{{{template-literals.js}}}

![ico-25 cap] **{{common.c0}} 2**

~~~js
var cities = ['Naples', 'Washington', 'Geneva']

console.log(`1: ${cities[0]}`)
console.log(`2: ${cities[1]}`)
console.log(`3: ${cities[2]}`)
~~~

~~~console
1&colon; Naples
2&colon; Washington
3&colon; Geneva
~~~

____________________________________________________________________

{{p11}}

![ico-25 cap] **{{common.c0}} 3**

~~~js
var cities = ['Kyiv', 'Lviv', 'Kharkiv', 'Odesa', 'Dnipro']

var str = `Cities: ${cities.length}\n`

str += `First: ${cities[0]} (${cities[0].length} letters)\n`
str += `Last: ${cities[cities.length - 1]} (${cities[cities.length - 1].length} letters)`

console.log(str)
~~~

~~~console
Cities&colon; 5
First&colon; Kyiv (4 letters)
Last&colon; Dnipro (6 letters)
~~~

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

{{{template-literals-color.js}}}

{{p20}}
