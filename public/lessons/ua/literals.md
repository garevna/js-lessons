# ![ico-30 study] Шаблонні літерали⟪Template_literals⟫

••![ico-20 warn] Літерал рядка обводиться символами зворотних лапок **_`...`_**.••

Смарт-рядки (розумні рядки)
Можна сказати, що це _динамічні рядки_, оскільки в більшості випадків їхній вміст компілюється під час виконання коду.

## ![ico-25 icon] Багаторядковий текст⟪Multi-line_text⟫

Якщо спробувати записати звичайний текстовий рядок у декількох рядках, то буде згенеровано виняток:

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

У будь-який рядок можна вставляти символ перенесення рядка (~\n~), однак у цьому випадку рядок може виявитися надто довгим і не дуже зручним для читання.

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

Літерал дає змогу записувати багаторядковий текст у зручнішій формі:

![ico-25 cap] **Приклад 1**

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

Давайте перевіримо, який символ стоїть на самому початку літералу **~lit~**:

~~~js
lit[0]  // '\n'
~~~

~~~js
console.log(lit.charCodeAt(0)) // 10
~~~

^^10 — це код символу перенесення рядка.^^

Зверніть увагу, що у звичайному рядку (**~str~**) нам довелося вставляти символ перенесення рядка за допомогою ~\n~.

У літералі (**~lit~**) ми просто вводимо багаторядковий текст, що покращує читабельність коду.

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

Але це не всі переваги літералу.

__________________________________________________________________

## ![ico-25 icon] Змінні в літералах⟪Variables_in_literals⟫

Конструкція **~${varName}~** дозволяє вставляти значення змінних безпосередньо в літерал рядка.

{{{template-literals.js}}}

![ico-25 cap] **Приклад 2**

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

Можна використовувати вирази, значення яких будуть обчислені та вставлені в літерал:

![ico-25 cap] **Приклад 3**

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

![ico-25 cap] **Приклад 4**

Можна згенерувати випадкове значення кольору у шістнадцятковому форматі

Використовуємо вбудовану бібліотеку математичних функцій **~Math~**

Для отримання випадкового числа від нуля до одиниці використовуємо функцію **~Math.random()~**

Значення кольору в кожному каналі може бути від 0 до 255

Щоб отримати число в цьому діапазоні, помножимо випадкове число на 255

Значення колірного каналу має бути цілим числом, тому округлимо результат за допомогою функції **~Math.round()~**

~~~js
var red = Math.round(Math.random() * 255).toString(16)
var green = Math.round(Math.random() * 255).toString(16)
var blue = Math.round(Math.random() * 255).toString(16)

var color = `#${red}${green}${blue}`
~~~

Тепер у змінній **~color~** буде рядок, що містить значення кольору у шістнадцятковому форматі

______________________________________________________________________________

![ico-25 cap] **Приклад 5**

Можна згенерувати випадкове значення кольору за допомогою функції **~rgb()~**

~~~js
var red = Math.round(Math.random() * 255)
var green = Math.round(Math.random() * 255)
var blue = Math.round(Math.random() * 255)

var color = `rgb(${red},${green},${blue})`
~~~

{{{template-literals-color.js}}}

Тепер у змінній **~color~** буде рядок, що містить значення кольору в моделі **~rgb~** з десятковими значеннями кольору в каналах
