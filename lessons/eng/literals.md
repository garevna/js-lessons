# ![ico-30 study] Template literals⟪Template_literals⟫

••![ico-20 warn] A string literal is enclosed in backticks **_`...`_**.••

Smart strings
It could be said that these are _dynamic strings_, as in most cases their content is compiled whilst the code is being executed.

## ![ico-25 icon] Multi-line text⟪Multi-line_text⟫

If you try to write a normal text string across several lines, an exception will be thrown:

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

You can insert a line break character (~\n~) into any line; however, this may result in the line becoming uncomfortably long and rather difficult to read.

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

A literal allows you to write multi-line text in a more convenient format:

![ico-25 cap] **Example 1**

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

Let’s check which character appears at the very start of the literal **~lit~**:

~~~js
lit[0]  // '\n'
~~~

~~~js
console.log(lit.charCodeAt(0)) // 10
~~~

^^10 is the code for the line feed character.^^

Note that in a normal string (**~str~**) we had to insert a line break using ~\n~.

In a literal (**~lit~**) we simply type multi-line text, which improves the readability of the code.

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

But these are not the only advantages of literals.

__________________________________________________________________

## ![ico-25 icon] Variables in literals⟪Variables_in_literals⟫

The **~${varName}~** construct allows you to insert variable values directly into a string literal.

{{{template-literals.js}}}

![ico-25 cap] **Example 2**

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

You can use expressions whose values will be evaluated and inserted into the literal:

![ico-25 cap] **Example 3**

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

![ico-25 cap] **Example 4**

You can generate a random colour value in hexadecimal format

We’ll use the built-in library of mathematical functions **~Math~**

To generate a random number between zero and one, we’ll use the function **~Math.random()~**

The colour value in each channel can range from 0 to 255

To obtain a number within this range, we multiply the random number by 255

The colour channel value must be an integer, so we round the result using the function **~Math.round()~**

~~~js
var red = Math.round(Math.random() * 255).toString(16)
var green = Math.round(Math.random() * 255).toString(16)
var blue = Math.round(Math.random() * 255).toString(16)

var color = `#${red}${green}${blue}`
~~~

The variable **~color~** will now contain a string representing the colour value in hexadecimal format

______________________________________________________________________________

![ico-25 cap] **Example 5**

You can generate a random colour value using the function **~rgb()~**

~~~js
var red = Math.round(Math.random() * 255)
var green = Math.round(Math.random() * 255)
var blue = Math.round(Math.random() * 255)

var color = `rgb(${red},${green},${blue})`
~~~

{{{template-literals-color.js}}}

The variable **~color~** will now contain a string representing a colour value in the **~rgb~** model, with decimal colour values for each channel
