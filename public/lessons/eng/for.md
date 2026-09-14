# ![ico-35 study] Operator for

Well, now we have reached the third fundamental principle of structural programming - loops.
As I hope we already know, a loop is a repetition of the same actions several times.
That is, there is some code that must be executed repeatedly.
This code is placed in curly braces **~{}~** and is called the **body of the loop**.

Each repetition of the loop is called a **loop iteration**.

Thus, any loop statement will have a body, and this body is always enclosed in curly braces.
But every loop has one important task: to stop at the right time.

We cannot endlessly repeat the execution of the code in curly braces.
An endless loop means a browser tab freezing. We certainly don't need it.
So, we need to stop the loop at the right time.

To do this, determine when the loop should be stopped.
There are options:

- Directly specify how many times the loop should be executed;
- Set some condition that the loop will be repeated if it is fulfilled. Such a condition (some expression) is always placed in parentheses.
The loop condition can be any evaluated expression (i.e. syntactically correct), but after evaluating the value of this expression, the engine will always cast it to a boolean type (**~true~** or **~false~**).
So, any loop operator has three mandatory parts: **the operator name** (keyword), a **condition** in parentheses, and a **body** in curly braces.

We begin our journey through loops with the **~for~** loop statement.

Для оператора цикла **~for~** нужна переменная-счетчик (переменная цикла), которая должна:
1. иметь стартовое значение. Т.е. ее нужно объявить и присвоить ей начальное значение;
2. переменная должна менять свое значение после каждой итерации цикла (иначе цикл будет бесконечным);
3. на каждой итерации значение переменной цикла должно проверяться на предмет выполнения ограничения (иначе цикл будет бесконечным).

Мы начинаем наше путешествие по циклам с оператора цикла **~for~**.

## ![ico-30 icon] Syntax

Для оператора цикла **~for~** все, что касается переменной цикла (инициализация, изменение, проверка) помещается в круглые скобки:

~~~js
for (initialization; condition; update) {
  ...body od the loop
}
~~~

Например:
~~~js
// initialization:
var index = 0
// condition:
index < 10
// update:
index++
~~~

Тогда получаем во такую картину:

~~~js
for (var index = 0; index < 10; index++) {
  ...body of the loop
}
~~~

Осталось наполнить тело цикла кодом.

_____________________________________________________________________

## ![ico-30 icon] Syntax

The **~for~** loop statement requires a counter variable (loop variable) that must:

1. have a start value. That is, it must be declared and assigned a start value;
2. the variable must change its value after each iteration of the loop (otherwise the loop will be infinite);

~~~js
for (; ;) {
  console.log('Iteration')
  if (Math.random() < 0.5) break
}
~~~

3. at each iteration, the loop variable's value must be checked to see if the constraint is met (otherwise the loop will be infinite).

Например:
Then we get the following picture:
It remains to fill the loop body with code.
Но чисто из спортивного интереса такой вариант рассмотреть стоит.

Например, если нужно вывести в консоль все числа от 1 до 10, то можно сделать так:

~~~js
for (var i = 1; ; i++) {
  if (i > 10) break
  console.log(i)
}
~~~

Здесь условие на переменную цикла пропущено, что привело бы к бесконечному циклу, если бы мы не поставили прерывание цикла ~break~ внутри его тела.

_____________________________________________________________________

## ![ico-25 icon] Directive break

Interrupts the loop execution.

The point is that none of the phases (initialisation; condition; update) for a loop variable is mandatory.

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 === 0) console.log(i)
}
~~~

Theoretically, you can organise a loop in which all three phases will be skipped:

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 !== 0) continue
  console.log(i)
}
~~~

^^Here we used the **~random~** function of the built-in library <a href="#byblyoteka_Math">**Math**</a>.^^

In this case, the loop control is transferred to the loop body.

Not a very nice solution, is it?

______________________________________________________

## ![ico-30 icon] Examples

◘◘![ico-25 cap]** 1**◘◘

~~~js
var res = 0

for (var i = 0; i < 10; i++) {
  res += i * 2
}
~~~

If you don't want to mess with the loop variable, you'd better use the **~while~** loop operator, which will be discussed later.

~~~js
(var i = 0; i < 10; i++)
~~~

But purely out of sporting interest, this option is worth considering.
For example, if you want to print all numbers from 1 to 10 to the console, you can do it this way:
The condition on the loop variable is omitted here, which would result in an infinite loop if we didn't put the loop interrupt ~break~ inside its body.

• ^^В данном примере к значению переменной ~res~ 10 раз будет добавлено значение вычисляемого выражения  ~i * 2~^^
• ^^На первой итерации цикла значением переменной цикла ** i** будет 0, поэтому значение переменной ~res~ не изменится^^
• ^^После первой итерации значение переменной цикла ** i** будет увеличено на единицу, и станет равно 1^^
• ^^На второй итерации цикла значение выражения  ~i * 2~ уже будет равно 2, это значение будет добавлено к значению переменной ~res~, которое станет равно 2^^
• ^^После итерации значение переменной цикла ** i** опять увеличится на 1 и станет равно 2^^
• ^^На третьей итерации выражение  ~i * 2~ примет значение 4^^
• ^^Это значение будет добавлено к значению переменной ~res~, которое станет равно ~2 + 4 = 6~^^

^^И так далее...^^

_________________________________________________________________

◘◘![ico-25 cap]** 2**◘◘

~~~js
for (var i = 1; i < 10;) {
  console.log(i++)
}
~~~

В этом примере приращение переменной цикла осуществляется внутри тела цикла.
Однако делать так я не рекомендую.
Это требует повышенной внимательности и может приводить к ошибкам.
Такие "финты" хороши для операторов цикла **~while~** и **~do...while~**, а уж если вы используете оператор **~for~**, то лучше не выпендриваться и все настроки для переменной цикла делать в круглых скобках. Это нагляднее и проще в отладке.

_________________________________________________________________

◘◘![ico-25 cap]** 3**◘◘

~~~js
var res = 0

for (var i = 100; i > 0; i--) {
  res += i % 2
}

console.log(res)
~~~
_________________________________________________________________

◘◘![ico-25 cap]** 4**◘◘

~~~js
for (var i = 2; i < 100; i *= 2) {
  console.log(i)
}
~~~

Вывод в консоль степеней двойки.
____________________________________________________________________

◘◘![ico-25 cap] Массив◘◘

~~~js
var res = 0, arr = [2, 1, 5, 3], i

for (i = 0; i < arr.length; i++) {
  res += arr[i]
}
~~~

^^У массивов, так же, как у текстовых строк, есть свойство ~length~.^^

^^Это свойство содержит число элементов массива (или число символов в строке).^^

^^В качестве ограничения на число итераций цикла мы используем длину массива^^ ~arr.length~:

~~~js
i < arr.length
~~~

^^т.е. пока переменная цикла меньше длины массива, цикл будет повторяться.^^

^^В результате выполнения цикла в переменной ~res~ будет сумма элементов массива ~arr~.^^

^^![ico-20 warn] Можно изменять значение переменной цикла на каждой итерации на число, отличное от единицы.^^

^^Следующий код выведет в консоль все нечетные числа от 1 до 20:^^

~~~js
for (var i = 1; i < 20; i += 2) {
  console.log(i)
}
~~~

______________________________________________________

## ![ico-30 icon] Tests

◘◘![ico-25 hw]** 1**◘◘

~~~js
var number = 5

for (; number > 2; number -= 2) {
  ++number
}
~~~

→→→ Какое значение будет у переменной number после завершения цикла? | 1, 2, 3, 4, 5, 6 | 2→→→


◘◘![ico-25 hw] **2-3**◘◘
~~~js
var x = 0, y = 0, numbers = [1, 2, 3, 4]

var res_x = 0, res_y = 0

for (var i = 0; i < arr.length-1; i++) {
  res_x += numbers[x++]
  res_y += numbers[++y]
}
~~~

→→→ Какое значение будет у переменной res_x после завершения цикла? | 1, 3, 5, 6, 9, 10 | 6→→→
→→→ Какое значение будет у переменной res_y после завершения цикла? | 1, 3, 5, 6, 9, 10 | 9→→→

◘◘![ico-25 hw]** 4**◘◘

~~~js
for (var number = 11; number > 2; number -= 2) {
  number++
}
~~~

→→→ Какое значение будет у переменной number после завершения цикла? | 1, 2, 3, 4, 5, 6, 7 | 2→→→

◘◘![ico-25 hw]** 5**◘◘

~~~js
for (var number = 7; number > 2; --number) {
  number--
}
~~~

→→→ Какое значение будет у переменной number после завершения цикла? | 1, 2, 3, 4, 5, 6, 7 | 1→→→

◘◘![ico-25 hw]** 6**◘◘

~~~js
for (var number = -1; number-- > -11; number *= 2) {}
~~~

→→→ Какое значение будет у переменной number после завершения цикла? | 0, -1, -9, -11, -12, -20, -21, -22, -23 | -23→→→

◘◘![ico-25 hw]** 7**◘◘

~~~js
var messages = ['Hi! ', 'Welcome! ', 'Nice to see you. ', 'How are you?']

var message = ''

for (var index = -1; index < messages.length; index += 2) {
  message += messages[index] || ''
}
~~~

→→→ Что будет в переменной message после завершения цикла? | 'Hi! Welcome! Nice to see you. How are you?', 'Hi! How are you?', 'Hi! Welcome! ', 'Hi! Nice to see you.', 'Welcome! Nice to see you. How are you?', 'Welcome! How are you?', 'Nice to see you. How are you?', 'How are you?' | Welcome! How are you?→→→
____________________________________________________________________

[![ico-20 link] MDN](external/mdn-for)
