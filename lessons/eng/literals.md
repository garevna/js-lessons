# ![ico-30 study] Variables in literals⟪Variables_in_literals⟫

![ico-20 warn] A string literal is enclosed in backticks **~`...`~**

A literal can contain multi-line text,
i.e. a line feed character can be inserted into a literal

![ico-25 cap] **Example 1**

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

^^Result in the console:^^

![](createPath("illustrations", "string-methods-01.png"))

^^10 is the code for the line feed character^^

Note that in a normal string (**str**) we had to insert a line break using ~\n~

In a literal (**lit**) we simply type multi-line text, which improves the readability of the code

But these are not the only advantages of literals

__________________________________________________________________

The **~${ имя_переменной }~** construct allows you to insert variable values directly into a string literal

![ico-25 cap] **Example 2**

~~~js
var cities = ['Неаполь', 'Вашингтон', 'Женева']

for (var i = 0; i < cities.length; i++) {
  console.log(`${ i + 1 }: ${ cities [ i ] }`)
}
~~~

^^Result in the console:^^

•••• none
1: Naples
2: Washington
3: Geneva
••••

____________________________________________________________________

You can use expressions whose values will be evaluated and inserted into the literal:

![ico-25 cap] **Example 3**

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

^^Result in the console:^^

![](createPath("illustrations", "string-methods-02.png"))

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

The variable **~color~** will now contain a string representing a colour value in the **~rgb~** model, with decimal colour values for each channel
