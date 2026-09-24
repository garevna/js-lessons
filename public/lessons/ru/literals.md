# ![ico-30 study] Темплейтные литералы⟪Template_literals⟫

••![ico-20 warn] Литерал строки заворачивается в символы обратных кавычек **_`...`_**.••

Смарт-строки (умные строки)
Можно сказать, что это _динамические строки_, поскольку в большинстве случаев их содержимое компилируется в процессе выполнения кода.

## ![ico-25 icon] Многострочный текст⟪Multi-line_text⟫

Если обычный текстовую строку попытаться записать в нескольких строчках, то будет сгенерировано исключение:

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

В любую строку можно вставлять символ перевода строки (~\n~), однако в этом случае строка может оказаться неприятно длинной и не очень читабельной.

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

Литерал позволяет записывать многострочный текст в более удобной форме:

![ico-25 cap] **Пример 1**

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

Давайте проверим, какой символ стоит в самом начале литерала **~lit~**:

~~~js
lit[0]  // '\n'
~~~

~~~js
console.log(lit.charCodeAt(0)) // 10
~~~

^^10 - это код символа перевода строки.^^

Обратите внимание, что в обычной строке (**~str~**) нам пришлось вставлять перевод строки с помощью ~\n~.

В литерале (**~lit~**) мы просто набираем многострочный текст, что улучшает читабельность кода.

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

Но это не все достоинства литерала.

__________________________________________________________________

## ![ico-25 icon] Переменные в литералах⟪Variables_in_literals⟫

Конструкция **~${varName}~** позволяет вставлять значения переменных непосредственно в литерал строки.

{{{template-literals.js}}}

![ico-25 cap] **Пример 2**

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

Можно использовать выражения, значения которых будут вычислены и вставлены в литерал:

![ico-25 cap] **Пример 3**

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

![ico-25 cap] **Пример 4**

Можно сгенерировать случайное значение цвета в шестнадцатеричном формате

Используем встроенную библиотеку математических функций **~Math~**

Для получения случайного числа от нуля до единицы используем функцию **~Math.random()~**

Значение цвета в каждом канале может быть от 0 до 255

Чтобы получить число в это диапазоне, умножим случайное число на 255

Значение цветового канала должно быть целым числом, поэтому округлим результат с помощью функции **~Math.round()~**

~~~js
var red = Math.round(Math.random() * 255).toString(16)
var green = Math.round(Math.random() * 255).toString(16)
var blue = Math.round(Math.random() * 255).toString(16)

var color = `#${red}${green}${blue}`
~~~

Теперь в переменной **~color~** будет строка, содержащая значение цвета в шестнадцатеричном формате

______________________________________________________________________________

![ico-25 cap] **Пример 5**

Можно сгенерировать случайное значение цвета с использованием функции **~rgb()~**

~~~js
var red = Math.round(Math.random() * 255)
var green = Math.round(Math.random() * 255)
var blue = Math.round(Math.random() * 255)

var color = `rgb(${red},${green},${blue})`
~~~

{{{template-literals-color.js}}}

Теперь в переменной **~color~** будет строка, содержащая значение цвета в модели **~rgb~** с десятичными значениями цвета в каналах
