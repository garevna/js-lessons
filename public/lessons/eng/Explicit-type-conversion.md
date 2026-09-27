# ![ico-30 study] Приведение типов⟪pryvedenye_typov⟫

The fact that the engine allows us to use different data types in expressions leads to undesirable consequences: we can never be certain of the data type of the result. Such ambiguity leads to errors and application failures.
One of the most troublesome consequences of such ambiguity is the appearance of the insidious value **~NaN~** (~Not a Number~) in our calculations.

~~~demo
> var x = 10, y = '***'
< undefined
> x * y
< NaN
~~~

Given the specific behaviour of the logical operators **~&&~** and **~||~**, we can never be absolutely certain of the result of expressions constructed using them.
Indeed, if the operands of an expression constructed using the logical operators **~&&~** and **~||~** have different data types, what data type will the result have?

~~~demo
> var x = 10, y = '***'
< undefined
> x && y
< '***'
> x || y
< 10
> typeof (x && y)
< 'string'
> typeof (x || y)
< 'number'
~~~

______________________________________

## ![ico-25 icon] Explicit type coercion⟪Explicit_type_coercion⟫

••Explicit data type coercion allows us to avoid ambiguity in the results of expressions.••

The simplest way to explicitly cast data of any type to the type ~string~, ~number~ or ~boolean~ is to use the built-in functions of the same name: **~String()~**, **~Number()~**,  **~Boolean()~**.

~~~demo
> Number('10')
< 10
> Number('***')
< NaN
> Number(undefined)
< NaN
> String(50)
< '50'
> String(false)
< 'false'
> String(undefined)
< 'undefined'
> Boolean('50')
< true
> Boolean(50)
< true
~~~

The special value **~NaN~** (~Not a Number~) means that the result of the operation is not a number, but the result will still be of type **~number~**.

___________________________________________________________________

### ![ico-20 icon] Explicit type coercion to number⟪Explicit_type_coercion_to_number⟫

Arithmetic operations such as subtraction, multiplication, division and modulo always return a result of type **~number~**, but it is not guaranteed that this result will be a number.

Similarly, explicit coercion to the **~number~** type using the constructor function **~Number()~** will always return a result of type **~number~**, but this result is not necessarily a number.

![ico-20 pin] Please note the cases in which explicit type coercion to **~number~** using the constructor function **~Number()~** will return **~0~**:

~~~demo
> Number(null)
< 0
> Number(false)
< 0
> Number('')
< 0
> Number(' ')
< 0
> Number([])
< 0
> Number([0])
< 0
> Number([''])
< 0
> Number([' '])
< 0
> Number('\n')
< 0
> Number('\t')
< 0
> Number('\r')
< 0
> Number('\v')
< 0
> Number('\f')
< 0
~~~

••Coercion 'space' characters to the **_number_** type always returns 0.••

^^^[Space characters]

^^'Space' characters include special characters with the following codes:^^

| Symbol    | Code | Description |
| **~\t~**  |   9  | horizontal tab     |
| **~\n~**  |  10  | line feed     |
| **~\v~**  |  11  | vertical tab     |
| **~\f~**  |  12  | form feed     |
| **~\r~**  |  13  | carriage return     |

^^Different OS use different combinations of the characters **~\r~** and **~\n~** to move text to a new line:^^
^^• **Windows**: Uses the character pair **~\r~** + **~\n~**.^^
^^• **Linux / macOS**: Uses only the character **~\n~**.^^

^^^

Let’s see in which cases an explicit coercion to the **~number~** type using the **~Number()~** constructor function will return **~NaN~**:

~~~demo
> Number(undefined)
< NaN
> Number({})
< NaN
> Number(NaN)
< NaN
> Number('5 + 3')
< NaN
> Number('40px')
< NaN
> Number([5, 7])
< NaN
~~~

The constructor function **~Number()~** converts only primitive values to the **~number~** type, i.e. strings, numbers, booleans, **~null~**, **~NaN~** and **~undefined~**.
The engine evaluates the expression passed to the **~Number()~** constructor function within round brackets. If the result is a primitive value, that value is passed to the **~Number()~** constructor function.
If, however, the result is an array or an object, the engine will use the **_built-in mechanism to evaluate the primitive value_** of that object.
By default, to obtain the primitive value of an array or object, it is coerced to **~string~**, [►►► ^^but this behaviour can be changed^^ ►►►](page/value-of).

~~~demo
> String({})
< '[object Object]'
> Number('[object Object]')
< NaN
> String([5, 4, 8])
< '5,4,8'
> Number('5,4,8')
< NaN
~~~

So, the constructor function **~Number()~** accepts only primitive values; therefore, the engine first converts the expression within the parentheses of the constructor function **~Number()~** to a primitive data type, and only then does the coercion of this primitive type to the **~number~** type take place.

| **~x~**     | **~Number(x)~**       |
| ~number~    | **~x~**               |
| ~string~    | If the string contains only digits and a digit separator, the result will be a number; otherwise, it will be **~NaN~**.               |
| ~boolean~   | ~true~ → 1<br />~false~ → 0    |
| ~array~     | An array is coerced to a string: ~[a, b, c]~ → ~'a,b,c'~. If the array is empty, the string will be empty. See above for converting a string to a numeric type.               |
| ~object~    | An object is coerced to the string ~'[object Object]'~, so the result of the type conversion will be **~NaN~**.               |

![ico-25 hw] Tests

→→→ Number(57) | NaN, 57, undefined | 57 →→→
→→→ Number(4 * '8') | NaN, 32, 0 | 32 →→→
→→→ Number([8]) | NaN, 8, 0 | 8 →→→
→→→ Number([5] + [8]) | NaN, 13, 8, 5 | 13 →→→
→→→ Number(null - true) | NaN, null, true, 1, -1, 0 | -1 →→→

______________________________

As we have seen, the constructor function **~Number()~** does not offer sufficient flexibility for converting strings to the **~number~** type.

Fortunately, there are more flexible alternatives.

#### ![ico-20 icon] parseInt & parseFloat⟪parseInt_&_parseFloat⟫

To convert to an integer or a floating-point number (with decimal places), you can use the built-in functions ~parseInt~ and ~parseFloat~.
Unlike the **~Number~** constructor, these functions parse the string even if it contains ‘leading’ characters after the number – these characters will simply be ignored:

◘◘![ico-25 cap] **7**◘◘

~~~js
Number('3.14abc')      // NaN
parseFloat('3.14abc')  // 3.14
parseInt('3.14abc')    // 3

Number('3.14/5')        // NaN
parseFloat('3.14/5')    // 3.14
~~~

~~~demo
> var sample = '3.14abc'
< undefined
> Number(sample)
< NaN
> parseFloat(sample)
< 3.14
> parseInt(sample)
< 3
> Number('3.14 / 5')
< NaN
> parseFloat('3.14 / 5')
< 3.14
> Number('3.14 * 5')
< NaN
> parseFloat('3.14 * 5')
< 3.14
~~~

However, if the string begins with characters that cannot be converted to a number, these functions will return **~NaN~**.

____________________________________________________________________

### ![ico-20 icon] Explicit conversion to ~boolean~⟪Explicit_conversion_to_~boolean~⟫

![ico-20 warn] In all the cases listed below, the result will be ~false~:

~~~js
Boolean('')
Boolean(0)     
Boolean(-0)  
Boolean(NaN)
Boolean(null)
Boolean(undefined)
Boolean(false)
~~~

~~~demo
> Boolean('')
< false
> Boolean(0)
< false
> Boolean(-0)
< false
> Boolean(NaN)
< false
> Boolean(null)
< false
> Boolean(undefined)
< false
> Boolean(false)
< false
~~~

![ico-20 warn] In all other cases, the result will be ~true~

When casting a string to a Boolean type, a simple rule applies:

if the length of the string is 0, ~false~ is returned; otherwise, ~true~ is returned

____________________________________________________________________

### ![ico-20 icon] Explicit coercion to ~string~⟪Explicit_coercion_to_~string~⟫

~~~demo
> var str = String(5 + 8 + false)
< undefined
> str
< "13"
> var object = {}
< undefined
> String(object)
< "[object Object]"
> var array = [5, true, 'hello', 11]
< undefined
> String(array)
< "5,true,hello,11"
~~~

When casting a number to the type ~string~, you can use the method **~toString()~**, which takes a single argument – the decimal number 2, 8 or 16 (base).
^^The decimal number system is implied by default, so the argument can be omitted in this case.^^
^^To obtain the string representation of a number in the binary number system, pass the argument 2 to the method **~toString()~**; for octal, pass 8; for hexadecimal, pass 16.^^

~~~demo
> Number(2).toString(2)
< "10"
> Number(58).toString(2)
< "111010"
> Number(8).toString(8)
< "10"
> Number(58).toString(8)
< "72"
> Number(16).toString(16)
< "10"
> Number(58).toString(16)
< "3a"
~~~

____________________________________________________________________

### ![ico20 icon] Explicit coercion to ~object~⟪Explicit_coercion_to_~object~⟫

~~~js
Object(5 + 8 + false)
~~~

~~~console
▼ Number {13}
  ► [[Prototype]]: Number
    [[PrimitiveValue]]: 13
~~~

~~~js
var num = 10
Object(num)
~~~

~~~console
▼ Number {10}
  ► [[Prototype]]: Number
    [[PrimitiveValue]]: 10
~~~

~~~js
var array = [5, true, 'hello', 11]
Object(array)
~~~

No conversion will take place, as the data type of the variable **~y~** is already ~object~

____________________________________________________________________

## ![ico-25 hw] Tests⟪Tests⟫

→→→ var x = '10'; var y = x + 5; y = ? | 15, '105', NaN | 105 →→→
→→→ var x = '10'; var y = x > 5; y = ? | 10, false, true | true →→→
→→→ var x = null; var y = x < 1; y = ? | null, false, true | true →→→
→→→ var x = '10'; var y = x - 5; y = ? | NaN, '10', false, 5 | 5 →→→
→→→ var x = '$$'; var y = x * 5; y = ? | '$$5', NaN, 5, undefined | NaN →→→
→→→ var x = '$$'; var y = x * false; y = ? | '$$false', NaN, '$$', false, undefined | NaN →→→
→→→ var x = '$$'; var y = x ? 5 : 0; y = ? | 0, 5, NaN, undefined | 5 →→→
→→→ var x = NaN; var y = x ? 5 : 0; y = ? | 0, 5, NaN, undefined | 0 →→→
→→→ var x = undefined; var y = x ? 5 : 0; y = ? | 0, 5, NaN, undefined | 0 →→→
→→→ var x = null; var y = x ? 5 : 0; y = ? | 0, 5, NaN, null, undefined | 0 →→→
→→→ var x = ''; var y = x ? 5 : 0; y = ? | 0, 5, NaN, null, undefined | 0 →→→
→→→ var x = {}; var y = x ? 5 : 0; y = ? | 0, 5, NaN, {}, undefined | 5 →→→
→→→ var x = []; var y = x ? 5 : 0; y = ? | 0, 5, NaN, [], undefined | 5 →→→
→→→ var x = []; var y = 5 + x; y = ? | 0, '5', NaN, [], undefined | 5 →→→
→→→ var x = []; var y = 5 + (+x); y = ? | 0, 5, NaN, [], undefined | 5 →→→
→→→ var x = 'hero'; var y = 5 && x; y = ? | 0, 5, NaN, 'hero' | hero →→→
→→→ var x = 'hero'; var y = 5 || x; y = ? | 0, 5, NaN, 'hero' | 5 →→→
→→→ +[] - 5 | 0, '5', -5, NaN | -5 →→→
→→→ !![] - 5 | 0, '5', -5, -4, NaN | -4 →→→
→→→ !!{} | null, undefined, false, true, NaN | true →→→
→→→ +!!{} | null, 1, undefined, false, true, NaN | 1 →→→
→→→ 1 + [] - true | 0, 1, false, true, NaN | 0 →→→
→→→ '1' + [] - true | 0, 1, false, true, NaN | 1 →→→
→→→ [] - false + null | 0, 1, false, true, null, NaN | 0 →→→
→→→ [] - true + null | 0, 1, -1, true, null | -1 →→→
→→→ [5] - true + null | 0, 5, 4, true, null | 4 →→→
→→→ [3, 5] - true + null | 0, 3, 4, 5, true, null, NaN | NaN →→→
→→→ 1 / null | 1, null, undefined, Infinity, NaN | Infinity →→→
→→→ 1 / [] | 1, null, undefined, Infinity, NaN | Infinity →→→
→→→ 1 / '' | 1, null, undefined, Infinity, NaN | Infinity →→→
→→→ !!5 && !![] | 5, [], undefined, Infinity, false, true | true →→→

____________________________________________________________________

[![ico-20 link] ^^Infinity^^](external/w3-infinity)

[![ico-20 link] ^^JavaScript Equality Table^^](external/equality-in-table)
