## ![ico-25 icon] BigInt

**ES10 (2019)**

**~BigInt~** - новый тип данных (числа произвольной точности)

Ранее максимально возможным числом было **~Number.MAX_SAFE_INTEGER~** (2**53, или ~9007199254740992~)

Теперь это ограничение снято

__________________________________________________________

### ![ico-20 icon] Создание BigInt

Для создания числа типа **~BigInt~** нужно просто добавить **~ n ~**:

~~~js
var bigNumber = 78n
~~~

или использовать конструктор нового типа данных:

~~~js
var bigNumber = Number.MAX_SAFE_INTEGER + 5003  // 9007199254745994
bigNumber = BigInt(bigNumber) // 9007199254745994n
~~~

Теперь оператор **~typeof~** будет возвращать новый тип данных:

~~~js
typeof bigNumber // 'bigint'
~~~

_____________________________________________________________

### ![ico-20 icon] Приведение типов

**~NaN~**, **~null~**, **~Infinity~** не могут быть конвертированы в **~bigint~**

#### Infinity

~~~js
BigInt(Infinity)
~~~

будет сгенерировано исключение **RangeError**

![ico-20 err]

~~~error
    Uncaught RangeError: The number Infinity cannot be converted to a BigInt because it is not an integer
~~~

#### NaN

~~~js
BigInt(NaN)
~~~

будет сгенерировано исключение **RangeError**

![ico-20 err]

~~~error
    Uncaught RangeError: The number NaN cannot be converted to a BigInt because it is not an integer
~~~

#### null

~~~js
BigInt(null)
~~~

будет сгенерировано исключение **TypeError**

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot convert null to a BigInt
~~~

_____________________________________________________

#### Boolean → BigInt

~~~js
BigInt(false)  // 0n
BigInt(true)   // 1n
~~~

#### [] → BigInt

~~~js
BigInt([])   // 0n
~~~

#### String → BigInt

~~~js
BigInt('45')        // 45n
BigInt('45' + 11)   // 4511n
BigInt('45' - 11)   // 34n

BigInt('45' - true) // 44n
~~~

а вот такое приведение:

~~~js
BigInt('45 + 8')
~~~

![ico-20 err]

~~~error
    Uncaught SyntaxError: Cannot convert 45 + 8 to a BigInt
~~~

_____________________________________________________________

### ![ico-20 icon] Арифметические операции

^^^[Арифметические операции]

Арифметические операции с участием данных типа **~bigint~** возможны только при условии, что оба операнда имеют тип данных **~bigint~**

При попытке выполнить арифметическую операцию с операндами различного типа

~~~js
bigNumber * 2
~~~

будет сгенерировано исключение

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

При попытке применить функции библиотеки Math к данным типа **~bigint~**

~~~js
Math.sin(bigNumber)
~~~

будет сгенерировано исключение

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot convert a BigInt value to a number
~~~

Однако можно привести данное типа **~bigint~** к обычному типу **~number~**

~~~js
Number(bigNumber) // 9007199254745994
~~~

При приведении к строке оба типа (**~bigint~** и **~number~**) будут возвращать одинаковый результат:

~~~js
bigNumber = bigNumber * bigNumber // 81129638414696789717133459048036n
bigNumber.toString() // "81129638414696789717133459048036"

Number(bigNumber) // 8.112963841469679e+31
bigNumber.toString() // "81129638414696789717133459048036"
~~~

Данные типа **~bigint~** можно использовать в качестве индексов элементов массива:

~~~js
let bigArray = [
  BigInt(Number.MAX_SAFE_INTEGER + 2),
  BigInt(Number.MAX_SAFE_INTEGER + 3),
  BigInt(Number.MAX_SAFE_INTEGER + 4),
  BigInt(Number.MAX_SAFE_INTEGER + 5)
]

bigArray[BigInt(1)]  // 9007199254740994n
~~~

^^^

____________________________________________________________

### ![ico-20 icon] Битовые операции

Битовые операции работают с данными типа **~bigint~** и возвращают результат типа **~bigint~**:

~~~js
bigArray[0] ^ bigArray[1]  // 2n

bigArray[0] | bigArray[1]  // 9007199254740994n

~~~
