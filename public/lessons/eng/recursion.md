# ![ico-30 study] Recursion

Recursion is a process in which a function calls itself, either directly or indirectly

In functional programming, a recursive function is a ‘purer’ alternative to a loop

![ico-20 warn] Every recursive function must have a condition to terminate the recursion
Otherwise, calling the function will result in an infinite loop

**Tail recursion** is when the last statement executed by a recursive function is the **_return_** statement, which calls the function itself

The simplest (classic) example of recursion is calculating a factorial

^^^[Calculating a factorial]

![ico-25 cap] ** 1**

~~~js
function factorial (num, result) {
  result = (!result ? 1 : res) * num--
  return num < 2 ? result : factorial(num, result)
}
~~~

![ico-25 cap] ** 2**

~~~js
function factorial (n, result = 1) {
  result *= n--
  return n < 2 ? result : factorial(n, result)
}
~~~

![ico-25 cap] ** 3**

~~~js
function factorial (n, result) {
  while (n > 1)
    return factorial(n - 1, n * (!result ? 1 : result))
  return result
}
~~~

![ico-25 cap] ** 4**

~~~js
function factorial (n, result = 1) {
  return n < 2 ? result : factorial(n - 1, n * result)
}
~~~

^^^

To get rid of the optional parameter, we use closure:

◘◘![ico-25 cap] ** 5**◘◘

~~~js
function factor (num) {
  var res = 1
  return (function fact () {
    res *= num
    return num < 2 ? res : fact (--num)
  })()
}
~~~

In JavaScript, every function call adds a call frame to the stack

When the call completes, the frame is removed from the stack

However, a recursive function does not terminate immediately

It will return a recursive call to itself

[![ico-70 youtube]](https://www.youtube.com/watch?time_continue=2&v=nbqLBlanSMk)

If tail recursion is deep enough, this can lead to a stack overflow and the generation of an exception ![ico-20 err] **~RangeError~**
^^The **~RangeError~** exception occurs when the depth of recursion exceeds 10,000^^

## ![ico-25 hw] Exercise

Analyse the code for the **circle** function

~~~js
var circle = function (radius) {
  var elem = document.createElement('div')
        document.body.appendChild ( elem )
        elem.style = `
             position: absolute;
             width: ${radius}px;
             height: ${radius}px;
             border-radius: 50%;
             border: solid 1px green;
        `
        if ( radius < 300 ) circle ( radius += 20 )
}
~~~
Call the **circle** function

____________________________

[![ico-30 hw] **Tests**](https://garevna.github.io/js-quiz/#recursion)
