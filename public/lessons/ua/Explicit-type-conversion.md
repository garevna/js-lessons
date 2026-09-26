# ![ico-30 study] Приведение типов⟪pryvedenye_typov⟫

______________________________________

## ![ico-25 icon] Явне приведення типів⟪Explicit_type_coercion⟫

Найпростіший спосіб явного приведення даних довільного типу до типу ~string~, ~number~ або ~boolean~ — використання вбудованих однойменних функцій **~String()~**, **~Number()~**, **~Boolean()~**.

◘◘![ico-25 cap] **1**◘◘

~~~js
var x = '10'
Number(x)    // 10
~~~

поверне число 10.

◘◘![ico-25 cap] **2**◘◘

~~~js
Number('hero')
~~~

поверне спеціальне значення **~NaN~** (^^_Not  a  Number_^^), що означає, що рядок «туман» не може бути перетворений на число.



◘◘![ico-25 cap] **3**◘◘

~~~js
String(50)   // "50"
~~~

поверне рядок «50».

◘◘![ico-25 cap] **4**◘◘

~~~js
Boolean('50')  // true
~~~

поверне логічне значення ~true~.

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

◘◘![ico-25 cap] **5**◘◘

~~~js
Number(undefined)   // NaN
Number(' 12s ')     // NaN
Number('4+8')       // NaN
Number([5, 7, 4])   // NaN
Number(NaN)         // NaN
Number({})          // NaN
~~~

![ico-20 warn]  У всіх інших випадках результат буде  числом.

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

Для приведення до цілого числа або до числа з плаваючою комою (з десятковими знаками) можна використовувати вбудовані функції ~parseInt~ та ~parseFloat~.
На відміну від конструктора **~Number~**, ці функції аналізують рядок, навіть якщо в ньому є «лівобічні» символи після числа — ці символи просто будуть проігноровані:

◘◘![ico-25 cap] **7**◘◘

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

![ico-20 warn] У всіх наведених нижче випадках результат буде ~false~:

~~~js
Boolean('')
Boolean(0)     
Boolean(-0)  
Boolean(NaN)
Boolean(null)
Boolean(undefined)
Boolean(false)
~~~

![ico-20 warn] У всіх інших випадках результат буде ~true~

При приведенні рядка до булевого типу діє просте правило:

якщо довжина рядка дорівнює 0, то повертається ~false~, в іншому випадку — ~true~

____________________________________________________________________

### ![ico-20 icon] Явне приведення до ~string~⟪Explicit_coercion_to_~string~⟫

◘◘![ico-25 cap] **8**◘◘

~~~js
var str = String(5 + 8 + false)  //  "13"

var object = {}
String(object)  //  "[object Object]"

var array = [5, true, 'hello', 11]
String(array)  //  "5,true,hello,11"
~~~

При приведенні числа до типу ~string~ можна використовувати метод **~toString()~**, який приймає один аргумент — десяткове число 2, 8 або 16 (система числення).
^^Десяткова система числення передбачається за замовчуванням, тому аргумент при цьому можна опустити.^^
^^Щоб отримати рядкове значення числа в двійковій системі числення, потрібно передати методу **~toString()~** аргумент 2, у вісімковій — 8, у шістнадцятковій — 16.^^

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

### ![ico20 icon] Явне приведення до ~object~⟪Explicit_coercion_to_~object~⟫

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

Перетворення не відбудеться, оскільки тип даних змінної **~y~** вже ~object~

____________________________________________________________________

## ![ico-25 hw] Тести⟪Tests⟫

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
