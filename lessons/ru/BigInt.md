## ![ico-25 icon] BigInt⟪BigInt⟫

**ES10 (2019)**

**~BigInt~** - новый тип данных (числа произвольной точности).

Ранее максимально возможным числом было **~Number.MAX_SAFE_INTEGER~** (~2**53~, или ~9007199254740992~).

Теперь это ограничение снято.

___

### ![ico-20 icon] Создание BigInt⟪Creating_a_BigInt⟫

Для создания числа типа **~BigInt~** нужно просто добавить **~ n ~**:

~~~js
var bigNumber = 78n
~~~

или использовать конструктор нового типа данных:

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

### ![ico-20 icon] Приведение типов⟪Type_coercion⟫

**~NaN~**, **~null~**, **~Infinity~** не могут быть конвертированы в **~bigint~**

~~~demo
> BigInt(Infinity)
! Uncaught RangeError: The number Infinity cannot be converted to a BigInt because it is not an integer
> BigInt(NaN)
! Uncaught RangeError: The number NaN cannot be converted to a BigInt because it is not an integer
> BigInt(null)
! Uncaught TypeError: Cannot convert null to a BigInt
~~~

___

а вот такое приведение:

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

### ![ico-20 icon] Арифметические операции⟪Arithmetic_operations⟫

Арифметические операции с участием данных типа **~bigint~** возможны только при условии, что оба операнда имеют тип данных **~bigint~**

При попытке выполнить арифметическую операцию с операндами различного типа будет сгенерировано исключение **^^TypeError^^**

~~~demo
> bigNumber = 9007199254745994n
< 9007199254745994n
> bigNumber * 2
! Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

При попытке применить функции библиотеки Math к данным типа **~bigint~** будет сгенерировано исключение **^^TypeError^^**.
Однако можно привести данное типа **~bigint~** к обычному типу **~number~**.

~~~demo
> bigNumber = 9007199254745994n
< 9007199254745994n
> Math.sin(bigNumber)
! Uncaught TypeError: Cannot convert a BigInt value to a number
> Math.sin(Number(bigNumber))
< -0.9996177925388726
~~~

При приведении к строке оба типа (**~bigint~** и **~number~**) будут возвращать одинаковый результат:

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

Данные типа **~bigint~** можно использовать в качестве индексов элементов массива:

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

### ![ico-20 icon] Битовые операции⟪Bitwise_operations⟫

Битовые операции работают с данными типа **~bigint~** и возвращают результат типа **~bigint~**:

~~~demo
> bigArray[0]^bigArray[1]
< 2n
> bigArray[0]|bigArray[1]
< 9007199254740994n
~~~
