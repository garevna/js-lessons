# ![ico-30 study] Приведение типов⟪pryvedenye_typov⟫

______________________________________

## ![ico-25 icon] Явне приведення типів⟪Explicit_type_coercion⟫

Найпростіший спосіб явного приведення даних довільного типу до типу ~string~, ~number~ або ~boolean~ — використання вбудованих однойменних функцій **~String()~**, **~Number()~**, **~Boolean()~**.

![ico-25 cap] ** 1**

~~~js
var x = '10'
Number(x)    // 10
~~~

поверне число 10.

![ico-25 cap] ** 2 **

~~~js
Number('туман')
~~~

поверне спеціальне значення **~NaN~** (^^_Not  a  Number_^^), що означає, що рядок «туман» не може бути перетворений на число.



![ico-25 cap] ** 3**

~~~js
String(50)   // "50"
~~~

поверне рядок «50».

![ico-25 cap] ** 4 **

~~~js
Boolean('50')  // true
~~~

поверне логічне значення  ~true~.

___________________________________________________________________

### ![ico-20 icon] Явне приведення до ~number~⟪Explicit_coercion_to_~number~⟫

![ico-20 warn] У всіх наведених нижче випадках результат буде ** 0**:

~~~js
Number(null)    // 0
Number(false)   // 0
Number('')      // 0
Number(' ')     // 0
Number([])      // 0
Number('\n')    // 0
Number('\t')    // 0
~~~

^^«пробільні» символи ~""~, ~"   "~, ~"\n"~, ~"\t"~ завжди приводяться до 0.^^

~~~js
Number(String.fromCharCode(9))   // 0
Number(String.fromCharCode(10))  // 0
Number(String.fromCharCode(11))  // 0
Number(String.fromCharCode(12))  // 0
Number(String.fromCharCode(13))  // 0
~~~

^^~String.fromCharCode(cod)~ повертає символ, код якого дорівнює **cod**.^^

![ico-20 warn] ~Number(true)~  поверне 1.

![ico-20 warn] У випадках, коли перетворити вираз на число неможливо, результат буде **~NaN~** (^^Not a Number^^):

![ico-25 cap] ** 5 **

~~~js
Number(undefined)   // NaN
Number(' 12s ')     // NaN
Number('4+8')       // NaN
Number([5, 7, 4])   // NaN
Number(NaN)         // NaN
Number({})          // NaN
~~~

![ico-20 warn]  У всіх інших випадках результат буде  числом.

![ico-25 cap] ** 6 **

~~~js
Number(57)            // вернет 57
Number(4 * '8')       // вернет 32
Number([5])           // вернет 5
Number([5] + [8])     // вернет 58
Number(null - true)   // вернет -1
~~~

______________________________

#### ![ico-20 icon] parseInt & parseFloat⟪parseInt_&_parseFloat⟫

Для приведення до цілого числа або до числа з плаваючою комою (з десятковими знаками) можна використовувати вбудовані функції ~parseInt~ та ~parseFloat~.
На відміну від конструктора **~Number~**, ці функції аналізують рядок, навіть якщо в ньому є «лівобічні» символи після числа — ці символи просто будуть проігноровані:

~~~js
Number('3.14abc')      // NaN
parseFloat('3.14abc')  // 3.14
parseInt('3.14abc')    // 3

Number('3.14/5')        // NaN
parseFloat('3.14/5')    // 3.14
~~~

Однак якщо рядок починається з символів, які не можуть бути зведені до числа, ці функції повернуть **~NaN~**.

____________________________________________________________________

### ![ico-20 icon] Явне зведення до ~boolean~⟪Explicit_conversion_to_~boolean~⟫

![ico-20 warn] Во всех нижеперечисленных случаях результат будет  ~false~:

~~~js
Boolean('')
Boolean(0)     
Boolean(-0)  
Boolean(NaN)
Boolean(null)
Boolean(undefined)
Boolean(false)
~~~

![ico-20 warn] Во всех остальных случаях результат будет  ~true~

При приведении строки к булевому типу действует простое правило:

если длина строки равна 0, то возвращается ~false~, в противном случае - ~true~

____________________________________________________________________

### ![ico-20 icon] Явное приведение к ~string~⟪yavnoe_pryvedenye_k_~string~⟫


~~~js
var str = String(5 + 8 + false)  //  "13"

var object = {}
String(object)  //  "[object Object]"

var array = [5, true, 'hello', 11]
String(array)  //  "5,true,hello,11"
~~~

При приведении числа к типу ~string~ можно использовать метод **_~toString()~_**, который принимает один аргумент - десятичное число 2, 8 или 16 (система исчисления).
^^Десятичная система исчисления подразумевается по умолчанию, поэтому аргумент при этом можно опустить.^^
^^Для того, чтобы получить строчное значение числа в двоичной системе исчисления, нужно передать методу **_~toString()~_** аргумент 2, в восьмеричной - 8, в шестнадцатеричной - 16.^^

~~~js
Number(2).toString(2)    // "10"
Number(58).toString(2)   // "111010"
Number(8).toString(8)    // "10"
Number(58).toString(8)   // "72"
Number(16).toString(16)  // "10"
Number(58).toString(16)  // "3a"
~~~

____________________________________________________________________

### ![ico20] Явное приведение к ~object~⟪yavnoe_pryvedenye_k_~object~⟫

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

Преобразования не будет, поскольку тип данных переменной ** y** уже ~object~

____________________________________________________________________

※※※exercises external/explicit-type-covertion※※※

____________________________________________________________________

[![ico-20 link] ^^Infinity^^](external/w3-infinity)

[![ico-20 link] ^^JavaScript Equality Table^^](external/equality-in-table)
