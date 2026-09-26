# ![ico-30 study] Приведение типов⟪pryvedenye_typov⟫

______________________________________

## ![ico-25 icon] Explicit type coercion⟪Explicit_type_coercion⟫

The simplest way to explicitly cast data of any type to the type ~string~, ~number~ or ~boolean~ is to use the built-in functions of the same name: **~String()~**, **~Number()~**,  **~Boolean()~**.

◘◘![ico-25 cap] **1**◘◘

~~~js
var x = '10'
Number(x)    // 10
~~~

returns the number 10.

◘◘![ico-25 cap] **2**◘◘

~~~js
Number('hero')
~~~

returns the special value **~NaN~** (^^_Not  a  Number_^^), which means that the string 'fog' cannot be converted to a number.



◘◘![ico-25 cap] **3**◘◘

~~~js
String(50)   // "50"
~~~

returns the string '50'.

◘◘![ico-25 cap] **4**◘◘

~~~js
Boolean('50')  // true
~~~

returns the boolean value ~true~.

___________________________________________________________________

### ![ico-20 icon] Explicit coercion to ~number~⟪Explicit_coercion_to_~number~⟫

![ico-20 warn] In all the cases listed below, the result will be ** 0**:

~~~js
Number(null)    // 0
Number(false)   // 0
Number('')      // 0
Number(' ')     // 0
Number([])      // 0
Number('\n')    // 0
Number('\t')    // 0
~~~

^^'space' characters ~""~, ~"   "~, ~"\n"~, ~"\t"~ are always converted to 0.^^

~~~js
Number(String.fromCharCode(9))   // 0
Number(String.fromCharCode(10))  // 0
Number(String.fromCharCode(11))  // 0
Number(String.fromCharCode(12))  // 0
Number(String.fromCharCode(13))  // 0
~~~

^^~String.fromCharCode(cod)~ returns the character whose code is **cod**.^^

![ico-20 warn] ~Number(true)~  will return 1

![ico-20 warn] In cases where it is impossible to convert an expression to a number, the result will be  **~NaN~** (^^Not a Number^^):

◘◘![ico-25 cap] **5**◘◘

~~~js
Number(undefined)   // NaN
Number(' 12s ')     // NaN
Number('4+8')       // NaN
Number([5, 7, 4])   // NaN
Number(NaN)         // NaN
Number({})          // NaN
~~~

![ico-20 warn]  In all other cases, the result will be  a number.

◘◘![ico-25 cap] **6**◘◘

~~~js
Number(57)            // вернет 57
Number(4 * '8')       // вернет 32
Number([5])           // вернет 5
Number([5] + [8])     // вернет 58
Number(null - true)   // вернет -1
~~~

______________________________

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

![ico-20 warn] In all other cases, the result will be ~true~

When casting a string to a Boolean type, a simple rule applies:

if the length of the string is 0, ~false~ is returned; otherwise, ~true~ is returned

____________________________________________________________________

### ![ico-20 icon] Explicit coercion to ~string~⟪Explicit_coercion_to_~string~⟫

◘◘![ico-25 cap] **8**◘◘

~~~js
var str = String(5 + 8 + false)  //  "13"

var object = {}
String(object)  //  "[object Object]"

var array = [5, true, 'hello', 11]
String(array)  //  "5,true,hello,11"
~~~

When casting a number to the type ~string~, you can use the method **~toString()~**, which takes a single argument – the decimal number 2, 8 or 16 (base).
^^The decimal number system is implied by default, so the argument can be omitted in this case.^^
^^To obtain the string representation of a number in the binary number system, pass the argument 2 to the method **~toString()~**; for octal, pass 8; for hexadecimal, pass 16.^^

◘◘![ico-25 cap] **9**◘◘

~~~js
Number(2).toString(2)    // "10"
Number(58).toString(2)   // "111010"
Number(8).toString(8)    // "10"
Number(58).toString(8)   // "72"
Number(16).toString(16)  // "10"
Number(58).toString(16)  // "3a"
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
