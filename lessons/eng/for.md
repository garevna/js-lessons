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

## ![ico-30 icon] Syntax

The **~for~** loop statement requires a counter variable (loop variable) that must:
1. have a start value. That is, it must be declared and assigned a start value;
2. the variable must change its value after each iteration of the loop (otherwise the loop will be infinite);
3. at each iteration, the loop variable's value must be checked to see if the constraint is met (otherwise the loop will be infinite).

For the **~for~** loop statement, everything about the loop variable (initialisation, modification, checking) is placed in parentheses:

~~~js
for (initialization; checking; modification) {
  ...body od the loop
}
~~~

Например:
~~~js
// initialization:
var index = 0
// checking:
index < 10
// modification:
index++
~~~

Then we get the following picture:

~~~js
for (var index = 0; index < 10; index++) {
  ...body of the loop
}
~~~

It remains to fill the loop body with code.

_____________________________________________________________________

## ![ico-30 icon] Directive break

Interrupts the loop execution.

The point is that none of the phases (initialisation; condition; update) for a loop variable is mandatory.
Theoretically, you can organise a loop in which all three phases will be skipped:

~~~js
for (; ;) {
  console.log('Iteration')
  if (Math.random() < 0.5) break
}
~~~

^^Here we used the **~random~** function of the built-in library <a href="#byblyoteka_Math">**Math**</a>.^^

In this case, the loop control is transferred to the loop body.
Not a very nice solution, is it?
If you don't want to mess with the loop variable, you'd better use the **~while~** loop operator, which will be discussed later.
But purely out of sporting interest, this option is worth considering.

For example, if you want to print all numbers from 1 to 10 to the console, you can do it this way:

~~~js
for (var i = 1; ; i++) {
  if (i > 10) break
  console.log(i)
}
~~~

The condition on the loop variable is omitted here, which would result in an infinite loop if we didn't put the loop interrupt ~break~ inside its body.

_____________________________________________________________________

## ![ico-25 icon] Directive continue

Interrupts the execution of the current loop iteration.

For example, if you want to print only even numbers up to 10 to the console, you can do this:

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 === 0) console.log(i)
}
~~~

Or you can do it this way:

~~~js
for (var i = 1; i < 10; i++) {
  if (i % 2 !== 0) continue
  console.log(i)
}
~~~

^^Since there is only one operation in the body of the conditional operator ~if~, we have omitted the curly brackets.^^

^^~ %~ is an operation to take the remainder of division (~4 % 2~ will be 0, ~5 % 2~ will be 1).^^

^^~x !== y~ the value or data type of the variable ** x** does not match the value or data type of the variable ** y**.^^

_________________________________________________

## ![ico-30 icon] Examples

◘◘![ico-25 cap]** 1**◘◘

~~~js
var res = 0

for (var i = 0; i < 10; i++) {
  res += i * 2
}
~~~

Explanation of the expression in parentheses:

~~~js
(var i = 0; i < 10; i++)
~~~

| ~var i = 0~ | ^^initialise the loop variable, i.e. declare it and assign it the initial value 0.^^ |
| ~i++~ | ^^method of changing the loop variable at each iteration<br>in this case, after each iteration the loop variable will be incremented by one.^^ |
| ~i < 10~ | ^^set a limit on the number of loop iterations<br>( the loop variable value will be incremented as long as it is less than 10).^^ |

• ^^In this example, the value of the evaluated expression ~i * 2~ will be added to the value of the ~res~ variable 10 times.^^
• ^^On the first iteration of the loop, the value of the loop variable ** i** will be 0, so the value of the ~res~ variable will not change.^^
• ^^After the first iteration, the value of the loop variable ** i** will be incremented by one, and will become equal to 1.^^
• ^^On the second iteration of the loop, the value of the expression ~i * 2~ will already be equal to 2. This value will be added to the value of the ~res~ variable, which will be equal to 2.^^
• ^^After iteration the value of the loop variable ** i** will again increase by 1 and become equal to 2.^^
• ^^At the third iteration the expression ~i * 2~ will take the value 4.^^
• ^^This value will be added to the value of the ~res~ variable, which will become ~2 + 4 = 6~.^^

^^And so on...^^

_________________________________________________________________

◘◘![ico-25 cap]** 2**◘◘

~~~js
for (var i = 1; i < 10;) {
  console.log(i++)
}
~~~

In this example, the loop variable is incremented inside the loop body.
However, I do not recommend doing it this way.
It requires extra care and may cause errors.
Such ‘tricks’ are good for **~while~** and **~do...while~** loop operators, but if you use the **~for~** operator, it is better not to show off and make all the settings for the loop variable in parentheses. It is more clear and easier to debug.

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

Console output of powers of two.
____________________________________________________________________

◘◘![ico-25 cap] Массив◘◘

~~~js
var res = 0, arr = [2, 1, 5, 3], i

for (i = 0; i < arr.length; i++) {
  res += arr[i]
}
~~~

^^We use the length of the array ~arr.length~ as a limit on the number of iterations of the loop:^^

~~~js
i < arr.length
~~~

^^i.e. as long as the loop variable is less than the array length, the loop will be repeated.^^

^^The result of the loop will be the sum of the elements of the array ~arr~ in the variable ~res~.^^

^^![ico-20 warn] You can change the value of a loop variable at each iteration by a number other than one.^^

^^The following code will print all odd numbers from 1 to 20 to the console:^^

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

→→→ What will be the value of the variable number after the loop completes? | 1, 2, 3, 4, 5, 6 | 2→→→


◘◘![ico-25 hw] **2-3**◘◘
~~~js
var x = 0, y = 0, numbers = [1, 2, 3, 4]

var res_x = 0, res_y = 0

for (var i = 0; i < arr.length-1; i++) {
  res_x += numbers[x++]
  res_y += numbers[++y]
}
~~~

→→→ What will be the value of the variable res_x after the loop completes? | 1, 3, 5, 6, 9, 10 | 6→→→
→→→ What will be the value of the variable res_y after the loop completes? | 1, 3, 5, 6, 9, 10 | 9→→→

◘◘![ico-25 hw]** 4**◘◘

~~~js
for (var number = 11; number > 2; number -= 2) {
  number++
}
~~~

→→→ What will be the value of the variable number after the loop completes? | 1, 2, 3, 4, 5, 6, 7 | 2→→→

◘◘![ico-25 hw]** 5**◘◘

~~~js
for (var number = 7; number > 2; --number) {
  number--
}
~~~

→→→ What will be the value of the variable number after the loop completes? | 1, 2, 3, 4, 5, 6, 7 | 1→→→

◘◘![ico-25 hw]** 6**◘◘

~~~js
for (var number = -1; number-- > -11; number *= 2) {}
~~~

→→→ What will be the value of the variable number after the loop completes? | 0, -1, -9, -11, -12, -20, -21, -22, -23 | -23→→→

◘◘![ico-25 hw]** 7**◘◘

~~~js
var messages = ['Hi! ', 'Welcome! ', 'Nice to see you. ', 'How are you?']

var message = ''

for (var index = -1; index < messages.length; index += 2) {
  message += messages[index] || ''
}
~~~

→→→ What will be in the message variable after the loop completes? | 'Hi! Welcome! Nice to see you. How are you?', 'Hi! How are you?', 'Hi! Welcome! ', 'Hi! Nice to see you.', 'Welcome! Nice to see you. How are you?', 'Welcome! How are you?', 'Nice to see you. How are you?', 'How are you?' | Welcome! How are you?→→→
____________________________________________________________________

[![ico-20 link] MDN](external/mdn-for)
