## ![ico-25 icon] BigInt

**ES10 (2019)**

{{p1}}

{{p2}}

{{p3}}

___

### ![ico-20 icon] {{p4}}

{{p5}}

~~~js
var bigNumber = 78n
~~~

{{p6}}

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

### ![ico-20 icon] {{common.type_coercion}}

{{p8}}

~~~demo
> BigInt(Infinity)
! Uncaught RangeError: The number Infinity cannot be converted to a BigInt because it is not an integer
> BigInt(NaN)
! Uncaught RangeError: The number NaN cannot be converted to a BigInt because it is not an integer
> BigInt(null)
! Uncaught TypeError: Cannot convert null to a BigInt
~~~

___

{{p12}}

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

### ![ico-20 icon] {{p13}}

{{p15}}

{{p16}}

~~~js
bigNumber * 2
~~~

{{common.exception}}

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

{{p17}}

~~~js
Math.sin(bigNumber)
~~~

{{common.exception}}

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot convert a BigInt value to a number
~~~

{{p18}}

~~~js
Number(bigNumber) // 9007199254745994
~~~

{{p19}}

~~~js
bigNumber = bigNumber * bigNumber // 81129638414696789717133459048036n
bigNumber.toString() // "81129638414696789717133459048036"

Number(bigNumber) // 8.112963841469679e+31
bigNumber.toString() // "81129638414696789717133459048036"
~~~

{{p20}}

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

### ![ico-20 icon] {{p21}}

{{p22}}

~~~js
bigArray[0] ^ bigArray[1]  // 2n

bigArray[0] | bigArray[1]  // 9007199254740994n

~~~
