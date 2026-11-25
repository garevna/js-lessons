## ![ico-25 icon] BigInt⟪BigInt⟫

**ES10 (2019)**

**~BigInt~** – a new data type (numbers of arbitrary precision).

Previously, the largest possible number was **~Number.MAX_SAFE_INTEGER~** (~2**53~, or ~9007199254740992~).

This restriction has now been removed.

___

### ![ico-20 icon] Creating a BigInt⟪Creating_a_BigInt⟫

To create a number of type **~BigInt~**, simply add **~ n ~**:

~~~js
var bigNumber = 78n
~~~

or use the constructor for the new data type:

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

### ![ico-20 icon] Type coercion⟪Type_coercion⟫

**~NaN~**, **~null~** and **~Infinity~** cannot be converted to **~bigint~**

~~~demo
> BigInt(Infinity)
! Uncaught RangeError: The number Infinity cannot be converted to a BigInt because it is not an integer
> BigInt(NaN)
! Uncaught RangeError: The number NaN cannot be converted to a BigInt because it is not an integer
> BigInt(null)
! Uncaught TypeError: Cannot convert null to a BigInt
~~~

___

whereas this type coercion:

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

### ![ico-20 icon] Arithmetic operations⟪Arithmetic_operations⟫

Arithmetic operations involving data of type **~bigint~** are only possible provided that both operands are of type **~bigint~**

When attempting to perform an arithmetic operation with operands of different types

~~~js
bigNumber * 2
~~~

an exception will be thrown

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

When attempting to apply functions from the Math library to data of type **~bigint~**

~~~js
Math.sin(bigNumber)
~~~

an exception will be thrown

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot convert a BigInt value to a number
~~~

However, it is possible to cast data of type **~bigint~** to the standard type **~number~**

~~~js
Number(bigNumber) // 9007199254745994
~~~

When cast to a string, both types (**~bigint~** and **~number~**) will return the same result:

~~~js
bigNumber = bigNumber * bigNumber // 81129638414696789717133459048036n
bigNumber.toString() // "81129638414696789717133459048036"

Number(bigNumber) // 8.112963841469679e+31
bigNumber.toString() // "81129638414696789717133459048036"
~~~

Data of type **~bigint~** can be used as indices for array elements:

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

### ![ico-20 icon] Bitwise operations⟪Bitwise_operations⟫

Bitwise operations operate on data of type **~bigint~** and return a result of type **~bigint~**:

~~~js
bigArray[0] ^ bigArray[1]  // 2n

bigArray[0] | bigArray[1]  // 9007199254740994n

~~~
