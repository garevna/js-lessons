# ![ico-35 study] While and do...while loops

Very often the number of loop iterations is unknown in advance and it depends on the fulfilment of some condition.
As the army saying goes, ‘dig from the fence to lunch’.

That is why we cannot use the iteration counter because we cannot set a limit on its value.

In this case, we use one of the **~while~** or **~do...while~** loop operators.

## ![ico-30 icon] while

Syntactically, the **~while~** operator includes three mandatory parts: the word **~while~** itself, followed by parentheses in which the logical expression (the loop condition) will be written, and then the body of the loop enclosed in curly braces:

~~~js
while (condition) {
  ...loop body
}
~~~

What will the engine do when faced with such an expression?

1. First, it will calculate the value of the boolean expression in parentheses and convert it to a boolean type.
2. If the condition is satisfied (i.e. the calculated value is ~true~), the code inside the curly brackets will be executed (the next iteration of the loop).
After that the engine will return to point 1.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var n = 5

while (n < 5) {
  console.log(n)
}
~~~

^^This loop will not be executed once because the condition ~n < 5~ is not fulfilled initially, i.e. the value ~false~ will be obtained when evaluating the expression in parentheses.^^

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var res = 0, n = 1

while (n) {
  n = prompt('Enter the number')
  res += (n - 0) || 0
}
~~~

^^The loop will sum the numbers entered by the user until the ~Cancel~ button is pressed in the ~prompt~ modal window.^^
^^Since the values entered in the modal window will be of string type, we convert them to a number by subtracting ~(n - 0)~.^^
^^If the subtraction ~(n - 0)~ results in the value ~NaN~, then 0 will be added to the ~res~ variable.^^

In the following example, we will use the **~random~** function of the **~Math~** library, which generates a pseudo-random number from 0 to 1:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var res = 0, n = 0

while (n < 0.5) {
  n = Math.random()
  res += n
}
~~~

Obviously, this loop will not be infinite, because sooner or later the value of **~Math.random()~** will be greater than 0.5.

______________________

## ![ico-30 icon] do...while

This loop first executes the code in curly braces and then checks if the condition is fulfilled.

~~~js
do {
  ...
} while (условие)
~~~

^^The loop will be executed at least 1 time, because the condition is checked after the next iteration of the loop.^^

When is this loop preferable to the previous loop?
For example, in a case like this:

◘◘![ico-25 cap] ** 4**◘◘

~~~js
do {
  var rand = Math.random()
  console.log(rand)
} while (rand < .5)
~~~

______________________________________________________

## ![ico-30 icon] Tests

◘◘![ico-25 hw]** 1**◘◘
~~~js
do {
  var rand = Math.random()
  if (rand > .5) break
} while (true)
~~~

→→→ Will the loop be infinite? | 'yes', 'no' | no→→→

◘◘![ico-25 hw]** 2**◘◘
~~~js
var num = 1

while (Math.random() < .5) {
  num *= (num + 1)
}
~~~

→→→ Will the loop be infinite? | 'yes', 'no' | no→→→

◘◘![ico-25 hw]** 3**◘◘
~~~js
var num = prompt('Enter the integer') - 0
var res = 0

while (true) {
  num >= 2 && res++
  num /= 2
  if (num < 2) {
    console.log(`2 ** ${res} = ${2 ** res}`)
    break
  }
}
~~~

→→→ What will be displayed in console if you type 8 in the modal window? | '', '2 ** 1 = 2', '2 ** 2 = 4', '2 ** 3 = 8', '2 ** 4 = 16' | 2 ** 3 = 8→→→

◘◘![ico-25 hw]** 4**◘◘
~~~js
var num = prompt('Enter the integer') - 0
var res = 1

while (true) {
  res *= num--
  if (num < 2) {
    console.log(`Factorial: ${res}`)
    break
  }
}
~~~

→→→ What will be displayed in console if you type 5 in the modal window? | 24, 0, 120, 20 | 120→→→

________________

[![ico-30 hw] **Quiz**](quiz/while)
