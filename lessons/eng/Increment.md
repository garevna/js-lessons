## ![ico-25 icon] Increment⟪Increment⟫

An increment is an increase in the value of a numeric variable by one.

Postfix form: **~y++~**

Prefix form: **~++y~**

The postfix form means that the variable will be incremented after the operation in which it is involved.

![ico-25 cap]

~~~javascript
var x = 0, y = 2
var z = y + x++
~~~

^^After the operation:^^

~~~javascript
var z = y + x++
~~~

^^the value of the variable **z** will be ~2 + 0 = 2~^^
^^and the value of the variable **x** will be ~1~^^.

^^But after an operation like this:^^

~~~javascript
var x = 0, y = 2
var z = y + ++x
~~~

^^first, the value of the variable **x** will become ~0 + 1 = 1~^^
^^and then the value of the variable **z** will be calculated: ~2 + 1 = 3~^^.

________________________________________________________

## ![ico-25 icon] Decrement⟪Decrement⟫

It’s exactly the same, except that the value isn’t increased by 1, but decreased! [ico-25 smile]

~~~javascript
var x = 0, y = 2
var z = --y + ++x
~~~

^^First, the value of the variable **y** will become ~2 - 1 = 1~^^
^^the value of the variable **x** will become ~0 + 1 = 1~^^
^^and then the value of the variable **z** will be calculated: ~1 + 1 = 2~^^.

## ![ico-25 hw] Tests⟪Tests⟫

♣♣♣♣
? What will **z** and **x** be after **var x = 0, y = 2; var z = y + x++**?

+ **z = 2**, **x = 1**
= That’s right! **x** entered the expression with its old value, zero, so **z** is two. The increase did happen, but afterwards: **x** became one.

- **z = 3**, **x = 1**
= Incorrect. Three is what the prefix form gives — **y + ++x**: there **x** is increased before it enters the expression.

- **z = 2**, **x = 0**
= Incorrect. **z** is right, but **x** has been forgotten: the postfix form increases the variable too, only later.

- **z = 3**, **x = 0**
= Incorrect. That is both mistakes at once: the new value in the expression and the old one in the variable — neither form does that.

? How do the postfix **x++** and the prefix **++x** differ as expressions?

- In no way: both increase **x** by one.
= Incorrect. They do increase the variable in the same way, but the value of the expression itself differs — which is exactly why the form matters.

+ **x++** returns the old value, **++x** the increased one.
= That’s right! The variable ends up one larger either way, but what goes into the expression differs: the old value with the postfix form, the new one with the prefix. Where the result goes nowhere — **for (let i = 0; i < 10; i++)** — there is no difference. Decrement works the same way.

- **++x** works only with numbers, **x++** with any value.
= Incorrect. Both forms convert the operand to a number in the same way: the string **'5'** gives **6**, and the string **'five'** gives **NaN**.

- **x++** adds one, **++x** adds two.
= Incorrect. The two plus signs are the name of the operation, not its size: both forms add one.

? What will **x** be after **var x = 5; x = x++**?

- **6**
= Incorrect — and this is the commonest mistake with increment. The increase does happen, but its result is overwritten by the assignment right away.

+ **5**
= That’s right! On the right is the postfix form, whose value is the old five. **x** does become six, and is immediately given five back by the assignment. To increase it, **x++** on its own is enough.

- **NaN**
= Incorrect. **NaN** would appear if **x** held something that cannot be converted to a number; here it is a number.

- A syntax error
= Incorrect. The line is perfectly legal — which is what makes it dangerous: the mistake is not in the syntax but in the result quietly disappearing.

? What will **z**, **y** and **x** be after **var x = 0, y = 2; var z = --y + ++x**?

+ **z = 2**, **y = 1**, **x = 1**
= That’s right! Both forms are prefix, so both variables change before the addition: **y** becomes one, **x** becomes one, and the sum is two.

- **z = 3**, **y = 1**, **x = 1**
= Incorrect. Three would come out if **y** entered the sum as the old two — that is, with the postfix **y--**. Here the form is prefix.

- **z = 2**, **y = 2**, **x = 1**
= Incorrect. The sum is right, but **y** did not stay two: the decrement reduced it — otherwise there would be no "one" to add.

- **z = 1**, **y = 1**, **x = 0**
= Incorrect. **x** is increased as well, and before the addition: **++x** makes it one, and that one goes into the sum.

? What will **m** and **n** be after **var n = 3; var m = n-- - --n**?

+ **m = 2**, **n = 1**
= That’s right! Left to right: **n--** gives three to the expression and makes **n** two; then **--n** makes **n** one and gives one. Three minus one is two, and **n** stays one.

- **m = 0**, **n = 1**
= Incorrect. Zero would come out if both terms took the same value of **n**. But **n** changes in the middle of the expression: three is reduced by one.

- **m = 1**, **n = 1**
= Incorrect. One would come from **2 - 1** — that is, if **n--** gave the already reduced value. The postfix form gives the old one, three.

- **m = 2**, **n = 2**
= Incorrect. The difference is right, but **n** was reduced twice, not once: from three to one.

? What ends up in **s**, and of what type, after **var s = '5'; s++**?

- The string **'6'**
= Incorrect. The type is not kept: increment is arithmetic, and its result is always a number.

- The string **'51'**
= Incorrect. Concatenation is what a plus between two values does — **'5' + 1**. Increment glues nothing to a string; it converts it to a number.

+ The number **6**
= That’s right! Increment first converts the operand to a number, and **typeof s** afterwards is **'number'**. If the conversion fails — **var s = 'five'; s++** — the result is **NaN**, which is a number too. Decrement behaves the same way.

- **NaN**
= Incorrect. **NaN** would come from a string that cannot be read as a number. The string **'5'** reads perfectly well.

♣♣♣♣

______________________________________________________________

[![ico-20 link] ^^MDN^^](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators)
