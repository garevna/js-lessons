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
> BigInt([5])
< 5n
> BigInt([5, 8])
! Uncaught SyntaxError: Cannot convert 5,8 to a BigInt
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

При спробі виконати арифметичну операцію з операндами різного типу буде згенеровано виняток **^^TypeError^^**

~~~demo
> bigNumber = 9007199254745994n
< 9007199254745994n
> bigNumber * 2
! Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

При спробі застосувати функції бібліотеки Math до даних типу **~bigint~** буде згенеровано виняток **^^TypeError^^**.
Однак можна привести дані типу **~bigint~** до звичайного типу **~number~**.

~~~demo
> bigNumber = 9007199254745994n
< 9007199254745994n
> Math.sin(bigNumber)
! Uncaught TypeError: Cannot convert a BigInt value to a number
> Math.sin(Number(bigNumber))
< -0.9996177925388726
~~~

При приведенні до рядка обидва типи (**~bigint~** і **~number~**) повертатимуть однаковий результат:

~~~demo
> bigNumber = bigNumber * bigNumber
< 81129638414696789717133459048036n
> bigNumber.toString()
< "81129638414696789717133459048036"
> Number(bigNumber)
< 8.112963841469679e+31
> bigNumber.toString()
< "81129638414696789717133459048036"
~~~

Дані типу **~bigint~** можна використовувати як індекси елементів масиву:

~~~js
var bigArray = [
  BigInt(10),
  15n,
  BigInt(10) + 10n,
  BigInt(Number.MAX_SAFE_INTEGER)
]
~~~

~~~demo
> var bigIndex = 1n
< undefined
> bigArray[bigIndex - 1n]
< 10n
> bigArray[bigIndex]
< 15n
> bigArray[bigIndex + 1n]
< 20n
> bigArray[bigIndex + 2n]
< 9007199254740991n
~~~

___

### ![ico-20 icon] Бітові операції⟪Bitwise_operations⟫

Бітові операції працюють з даними типу **~bigint~** і повертають результат типу **~bigint~**:

~~~demo
> bigArray[0]^bigArray[1]
< 2n
> bigArray[0]|bigArray[1]
< 9007199254740994n
~~~
