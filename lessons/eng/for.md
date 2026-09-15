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

The **~for~** loop operator requires a counter variable (loop variable), which must:
1. have an initial value. In other words, it must be declared and assigned an initial value;
2. the variable must change its value after each iteration of the loop (otherwise the loop will be infinite);
3. at each iteration, the value of the loop variable must be checked against the condition (otherwise the loop will be infinite).

We begin our journey through loops with the **~for~** loop statement.

## ![ico-30 icon] Syntax

For the **~for~** loop statement, everything relating to the loop variable (initialisation, modification, checking) is placed within round brackets:

~~~js
for (initialization; condition; update) {
  ...body od the loop
}
~~~

For example:
~~~js
// initialization:
var index = 0
// condition:
index < 10
// update:
index++
~~~

This gives us the following picture:

~~~js
for (var index = 0; index < 10; index++) {
  ...body of the loop
}
~~~

All that remains is to fill the loop body with code.

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
But purely out of curiosity, it is worth considering this option.

For example, if you need to print all numbers from 1 to 10 to the console, you can do it like this:

~~~js
for (var i = 1; ; i++) {
  if (i > 10) break
  console.log(i)
}
~~~

Here, the condition on the loop variable has been omitted, which would lead to an infinite loop if we hadn’t placed the loop termination condition ~break~ inside its body.

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

• ^^In this example, the value of the variable ~res~ will be incremented 10 times by the value of the expression ~i * 2~^^
• ^^On the first iteration of the loop, the value of the loop variable **i** will be 0, so the value of the variable ~res~ will not change^^
• ^^After the first iteration, the value of the loop variable ** i** will be incremented by one and will become 1^^
• ^^On the second iteration of the loop, the value of the expression  ~i * 2~ will already be 2; this value will be added to the value of the variable ~res~, which will then become 2^^
• ^^After the iteration, the value of the loop variable ** i** will again be incremented by 1 and will become 2^^
• ^^On the third iteration, the expression  ~i * 2~ will take the value 4^^
• ^^This value will be added to the value of the variable ~res~, which will then become ~2 + 4 = 6~^^

^^And so on...^^

_________________________________________________________________

◘◘![ico-25 cap]** 2**◘◘

~~~js
for (var i = 1; i < 10;) {
  console.log(i++)
}
~~~

In this example, the loop variable is incremented within the body of the loop.
However, I do not recommend doing this.
It requires extra care and can lead to errors.
Such ‘tricks’ work well for the **~while~** and **~do...while~** loop statements, but if you’re using the **~for~** statement, it’s best not to show off and to put all the settings for the loop variable inside round brackets. This is clearer and easier to debug.

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

Printing powers of two to the console.
____________________________________________________________________

◘◘![ico-25 cap] Array◘◘

~~~js
var res = 0, arr = [2, 1, 5, 3], i

for (i = 0; i < arr.length; i++) {
  res += arr[i]
}
~~~

^^Arrays, just like text strings, have the ~length~ property.^^

^^This property contains the number of elements in the array (or the number of characters in the string).^^

^^We use the length of the array^^ ~arr.length~ as the limit on the number of loop iterations:

~~~js
i < arr.length
~~~

^^i.e. as long as the loop variable is less than the length of the array, the loop will repeat.^^

^^As a result of executing the loop, the variable ~res~ will contain the sum of the elements of the array ~arr~.^^

^^![ico-20 warn] You can change the value of the loop variable to a number other than one at each iteration.^^

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

→→→ What will be the value of the variable `number` once the loop has finished? | 1, 2, 3, 4, 5, 6 | 2→→→


◘◘![ico-25 hw] **2-3**◘◘
~~~js
var x = 0, y = 0, numbers = [1, 2, 3, 4]

var res_x = 0, res_y = 0

for (var i = 0; i < arr.length-1; i++) {
  res_x += numbers[x++]
  res_y += numbers[++y]
}
~~~

→→→ What will be the value of the variable `res_x` once the loop has finished? | 1, 3, 5, 6, 9, 10 | 6→→→
→→→ What value will the variable `res_y` have after the loop has finished? | 1, 3, 5, 6, 9, 10 | 9→→→

◘◘![ico-25 hw]** 4**◘◘

~~~js
for (var number = 11; number > 2; number -= 2) {
  number++
}
~~~

→→→ What value will the variable `number` have after the loop has finished? | 1, 2, 3, 4, 5, 6, 7 | 2→→→

◘◘![ico-25 hw]** 5**◘◘

~~~js
for (var number = 7; number > 2; --number) {
  number--
}
~~~

→→→ What value will the variable `number` have after the loop has finished? | 1, 2, 3, 4, 5, 6, 7 | 1→→→

◘◘![ico-25 hw]** 6**◘◘

~~~js
for (var number = -1; number-- > -11; number *= 2) {}
~~~

→→→ What value will the variable `number` have after the loop has finished? | 0, -1, -9, -11, -12, -20, -21, -22, -23 | -23→→→

◘◘![ico-25 hw]** 7**◘◘

~~~js
var messages = ['Hi! ', 'Welcome! ', 'Nice to see you. ', 'How are you?']

var message = ''

for (var index = -1; index < messages.length; index += 2) {
  message += messages[index] || ''
}
~~~

→→→ What will the variable `message` contain after the loop has finished? | 'Hi! Welcome! Nice to see you. How are you?', 'Hi! How are you?', 'Hi! Welcome! ', 'Hi! Nice to see you.', 'Welcome! Nice to see you. How are you?', 'Welcome! How are you?', 'Nice to see you. How are you?', 'How are you?' | Welcome! How are you?→→→
____________________________________________________________________

[![ico-20 link] MDN](external/mdn-for)
