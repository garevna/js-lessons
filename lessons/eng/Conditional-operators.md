# ![ico-30 icon] Conditional operators⟪Conditional_operators⟫

The very name ‘conditional operators’ tells us that they differ from all other operators in that they involve some sort of **condition**.

•••• none
Conditions are common in our everyday lives.
‘You’ll go to the cinema provided you do your homework.’
Clearly, this sentence implies two possibilities: either I’ll go to the cinema, or I won’t.
And the choice between these two options depends on whether or not the condition—doing your homework—is met.
••••

Clearly, we are dealing with a [►►►**branch**►►►](page/Block-diagram#Branching).

The usual [►►►sequence►►►](page/Block-diagram#Sequence) of code execution corresponds to the order in which commands are executed:

~~~js
var x = 5            // will be executed first
var y = 11           // will be executed second
var z = x * y + 5    // will be executed third
~~~

A conditional statement allows the script to branch depending on whether a certain condition is met.

_______________________________________________________________________________

## ![ico-25 icon] The if statement⟪The_if_statement⟫

~~~js
If (the homework is done) {
  we’ll go to the cinema
} otherwise {
  we’ll stay at home and do our homework
}
~~~

Whatever expression you place within the round brackets, the engine will evaluate its value and convert it to the type ~boolean~; in other words, the round brackets may contain any syntactically valid expression, but as a result of evaluating this expression, the engine will obtain either ** ~true~** or **~false~**.

~~~js
If (!!expression) {
  then we do this
} otherwise {
  we do something else
}
~~~

All that remains is to replace **~otherwise~** with **~else~**:

Syntax:

~~~js
if (!!expression) {  
  script 1
} else {
  script 2
}
~~~

Two code branches appear in this entry: _~script 1~_ and _~script 2~_. <span class="first-expression">script 1</span> <span class="second-expression">script 2</span>

Which code branch is executed depends on the logical value of the expression in the parentheses of the **~if~** statement.

| the value of the expression in parentheses in the **~if~** operator<br />after being coerced to the **~boolean~** logical type       | will be executed   |
| **~true~**    | <span class="first-expression">script 1</span> |
| **~false~**   | <span class="second-expression">script 2</span> |

^^^[Note:]

^^If there is only one operation in the body of the **~if~** conditional operator, the curly brackets may be omitted:^^

~~~js
if (i % 2 === 0) console.log(i)

if (i % 2 !== 0) continue
~~~

^^**%** – the modulo operation^^

^^^

_________________________________________________________________

◘◘![ico-25 cap] Example 1◘◘

~~~js
if (typeof x === 'number') {
  var z = x * 5
  var y = x / 10 - 3
}
else {
  var z = 0
  var y = 0
}
~~~

^^Here, the code branches: the first ‘branch’ of the code will be executed when the variable **~ x ~** is a number.^^

^^In this case, the variable **~ z ~** will be assigned the value ~x * 5~<br />and the variable **~ y ~** will be assigned the value of the expression ~x / 10 - 3~.^^

^^Otherwise (when **~ x ~** is not a number), the variables **~ z ~** and **~ y ~** will be assigned the value **0**.^^

_________________________________________________________________

## ![ico-25 icon] The ternary operator⟪The_ternary_operator⟫

Syntax:

<span class="condition-expression">Condition</span><span class="ternary-sign">?</span><span class="first-expression">expression 1</span><span class="ternary-sign">:</span><span class="second-expression">expression 2</span>

Correct

Error

![ico-20 warn] The characters **?** and **:** are an integral part of the ternary operator’s syntax.

The value of the ~condition~ is calculated and coerced to a Boolean type.

| <span class="condition-expression">Condition</span> |  the ternary operator evaluates and returns the value of                                                       |
| **~true~**                                                     | <span class="first-expression">expression 1</span>  |
| **~false~**                                                    | <span class="second-expression">expression 2</span> |



_____________________________________________________________

◘◘![ico-25 cap] **1**◘◘

~~~js
var meet = source === 'fruit' ? 'apple' : 'mashroom'
~~~

Here, the first operand of the ternary operator (the condition) is a logical expression: ~sourse === 'fruit'~.

The variable **~source~** is either equal to ~'fruit'~ or it is not. If the variable **~source~** is a string and has the value ~'fruit'~, then this condition will evaluate to ~true~, and the variable **~meet~** will be assigned the value 'apple'.

Otherwise, the variable **~meet~** will be assigned the value 'mushroom'.

~~~demo
> var source = 'fruit'
< undefined
> var meet = source === 'fruit' ? 'apple' : 'mashroom'
< undefined
> meet
< 'apple'
> source = null
< null
> meet = source === 'fruit' ? 'apple' : 'mashroom'
< 'mashroom'
~~~

______________________________________________________________

◘◘![ico-25 cap] **2**◘◘

~~~js
var result = expresion ? 'Correct' : 'Error'
~~~

If ~Boolean(expression)~ evaluates to ~true~, then the value of the variable **~result~** will be the string **~"Correct"~**.

Otherwise, the value of the variable **~result~** will be the string **~"Error"~**.

For example, in the following case, **~result~** will be assigned the value **~"Correct"~**:

~~~js
var expresion = 'Google'
var result = expresion ? 'Correct' : 'Error'
~~~

and in this case, **~result~** will be assigned the value  **~"Error"~**:

~~~js
var expresion = null
var result = expresion ? 'Correct' : 'Error'
~~~

~~~demo
> var x = 8
< undefined
> var expresion = x > 5
< undefined
> var result = expresion ? 'Correct' : 'Error'
< undefined
> meet
< 'Correct'
> expresion = x < 5
< false
> result = expresion ? 'Correct' : 'Error'
< 'Error'
~~~

___

◘◘![ico-25 cap] **3**◘◘

~~~js
var angle = Math.PI / 2

console.log(angle < Math.PI ? Math.sin(angle) : Math.cos(angle))
~~~

In this example, we used the built-in library [%%%**~Math~**%%%](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math), or more specifically, the constant ~Math.PI~ (which is 180° in radians), the functions ~Math.sin~ (sine of an angle) and ~Math.cos~ (cosine of an angle).

___

[![ico-20 link] MDN](external/mdn-expressions-operators)
[![ico-20 link] w3schools](external/w3-if-else)

___

## ![ico-25 hw] Tests⟪Tests⟫

◘◘ ![ico-20 hw] **1** ◘◘

~~~js
if (a > b) {
  console.log(a - b)
}
else {
  console.log(a + b)
}
~~~

What will be displayed in the console if:

~~~tests
→→→ a = 5, b = 7 | 5, 7, -2, 12 | 12 →→→
→→→ a = 5, b = -7 | 5, -7, -2, 12 | 12 →→→
→→→ a = 4, b = null | 4, null, undefined, 0, NaN | 4 →→→
→→→ a = null, b = -7 | null, undefined, -7, 7, NaN | 7 →→→
→→→ a = 8, b = undefined | null, undefined, 8, NaN | NaN →→→
→→→ a = true, b = false | true, false, 1, 0, NaN | 1 →→→
→→→ a = false, b = true | true, false, 1, -1, NaN | 1 →→→
→→→ a = null, b = false | true, false, 1, 0, NaN | 0 →→→
→→→ a = 4, b = true | true, 4, 5, 3, NaN | 3 →→→
~~~

◘◘ ![ico-20 hw] **2** ◘◘

~~~js
if (userName) {
  console.log('Username: ' + userName)
} else {
  console.log('The user is not registered')
}
~~~

What will be displayed in the console if:

~~~tests
→→→ userName === undefined | 'Username: undefined', 'Username:', 'The user is not registered', undefined | The user is not registered →→→
→→→ userName === null | 'Username: null', 'Username:', 'The user is not registered', undefined | The user is not registered →→→
→→→ username === 'Robert' | 'Username: Robert', 'The user is not registered', undefined | Username: Robert →→→
~~~

◘◘ ![ico-20 hw] **3** ◘◘

~~~js
var c = a > b ? a - b : a + b
~~~

What will be displayed in the console if:

~~~tests
→→→ var a = false, b = true | NaN, true, false, 2, 1, -1, 0 | 1 →→→
→→→ var a = true, b = false | NaN, true, false, 2, 1, -1, 0 | 1 →→→
→→→ var a = true, b = true  | NaN, true, false, 2, 1, -1, 0 | 2 →→→
→→→ var a = -true, b = null | NaN, true, false, 2, 1, -1, 0 | -1 →→→
→→→ var a = Infinity, b = Infinity | NaN, 0, 1, -1, Infinity | Infinity →→→
→→→ var a = '$', b = 5 | NaN, 0, 5, -5, '$5' | $5 →→→
→→→ var a = 'welcome ', b = typeof a | NaN, 'welcome', 'welcome string' | NaN →→→
→→→ var a = 'hello ', b = typeof a | NaN, 'hello', 'string', 'number', 'hello string' | hello string →→→
~~~
