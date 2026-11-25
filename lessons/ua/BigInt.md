## ![ico-25 icon] BigInt⟪BigInt⟫

**ES10 (2019)**

**~BigInt~** — новий тип даних (числа довільної точності).

Раніше максимально можливим числом було **~Number.MAX_SAFE_INTEGER~** (~2**53~, або ~9007199254740992~).

Тепер це обмеження знято.

___

### ![ico-20 icon] Створення BigInt⟪Creating_a_BigInt⟫

Для створення числа типу **~BigInt~** потрібно просто додати **~ n ~**:

~~~js
var bigNumber = 78n
~~~

або використати конструктор нового типу даних:

~~~demo
> var bigNumber=Number.MAX_SAFE_INTEGER+5003
< undefined
> bigNumber
< 9007199254745994
> bigNumber=BigInt(bigNumber)
< 9007199254745994n
> typeof bigNumber
< 'bigint'
~~~

___

### ![ico-20 icon] Приведення типів⟪Type_coercion⟫

**~NaN~**, **~null~**, **~Infinity~** не можуть бути перетворені на **~bigint~**

~~~demo
> BigInt(Infinity)
! Uncaught RangeError: The number Infinity cannot be converted to a BigInt because it is not an integer
> BigInt(NaN)
! Uncaught RangeError: The number NaN cannot be converted to a BigInt because it is not an integer
> BigInt(null)
! Uncaught TypeError: Cannot convert null to a BigInt
~~~

___

а ось таке приведення:

~~~demo
> BigInt(false)
< 0n
> BigInt(true)
< 1n
> BigInt([])
< 0n
> BigInt('45')
< 45n
> BigInt('45' + 11)
< 4511n
> BigInt('45' - 11)
< 34n
> BigInt('45' - true)
< 44n
> BigInt('45 + 8')
! Uncaught SyntaxError: Cannot convert 45 + 8 to a BigInt
~~~

___

### ![ico-20 icon] Арифметичні операції⟪Arithmetic_operations⟫

Арифметичні операції з даними типу **~bigint~** можливі лише за умови, що обидва операнди мають тип даних **~bigint~**

При спробі виконати арифметичну операцію з операндами різного типу

~~~js
bigNumber * 2
~~~

буде згенеровано виняток

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

При спробі застосувати функції бібліотеки Math до даних типу **~bigint~**

~~~js
Math.sin(bigNumber)
~~~

буде згенеровано виняток

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot convert a BigInt value to a number
~~~

Однак можна привести дані типу **~bigint~** до звичайного типу **~number~**

~~~js
Number(bigNumber) // 9007199254745994
~~~

При приведенні до рядка обидва типи (**~bigint~** і **~number~**) повертатимуть однаковий результат:

~~~js
bigNumber = bigNumber * bigNumber // 81129638414696789717133459048036n
bigNumber.toString() // "81129638414696789717133459048036"

Number(bigNumber) // 8.112963841469679e+31
bigNumber.toString() // "81129638414696789717133459048036"
~~~

Дані типу **~bigint~** можна використовувати як індекси елементів масиву:

~~~js
let bigArray = [
  BigInt(Number.MAX_SAFE_INTEGER + 2),
  BigInt(Number.MAX_SAFE_INTEGER + 3),
  BigInt(Number.MAX_SAFE_INTEGER + 4),
  BigInt(Number.MAX_SAFE_INTEGER + 5)
]

bigArray[BigInt(1)]  // 9007199254740994n
~~~

___

### ![ico-20 icon] Бітові операції⟪Bitwise_operations⟫

Бітові операції працюють з даними типу **~bigint~** і повертають результат типу **~bigint~**:

~~~js
bigArray[0] ^ bigArray[1]  // 2n

bigArray[0] | bigArray[1]  // 9007199254740994n

~~~
