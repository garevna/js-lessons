## ![ico-25 icon] BigInt

**ES10 (2019)**

{{s0.p1}}

{{s0.p2}}

{{s0.p3}}

__________________________________________________________

### ![ico-20 icon] {{s1.h1}}

{{s1.p1}}

~~~js
var bigNumber = 78n
~~~

{{s1.p2}}

~~~js
var bigNumber = Number.MAX_SAFE_INTEGER + 5003  // 9007199254745994
bigNumber = BigInt(bigNumber) // 9007199254745994n
~~~

{{s1.p3}}

~~~js
typeof bigNumber // 'bigint'
~~~

_____________________________________________________________

### ![ico-20 icon] {{common.c32}}

{{s2.p1}}

#### Infinity

~~~js
BigInt(Infinity)
~~~

{{common.c55}}

![ico-20 err]

~~~error
    Uncaught RangeError: The number Infinity cannot be converted to a BigInt because it is not an integer
~~~

#### NaN

~~~js
BigInt(NaN)
~~~

{{common.c55}}

![ico-20 err]

~~~error
    Uncaught RangeError: The number NaN cannot be converted to a BigInt because it is not an integer
~~~

#### null

~~~js
BigInt(null)
~~~

{{s2.p4}}

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

{{s2.p5}}

~~~js
BigInt('45 + 8')
~~~

![ico-20 err]

~~~error
    Uncaught SyntaxError: Cannot convert 45 + 8 to a BigInt
~~~

_____________________________________________________________

### ![ico-20 icon] {{common.c56}}

^^^[{{common.c56}}]

{{s3.p1}}

{{s3.p2}}

~~~js
bigNumber * 2
~~~

{{common.c33}}

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

{{s3.p4}}

~~~js
Math.sin(bigNumber)
~~~

{{common.c33}}

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot convert a BigInt value to a number
~~~

{{s3.p6}}

~~~js
Number(bigNumber) // 9007199254745994
~~~

{{s3.p7}}

~~~js
bigNumber = bigNumber * bigNumber // 81129638414696789717133459048036n
bigNumber.toString() // "81129638414696789717133459048036"

Number(bigNumber) // 8.112963841469679e+31
bigNumber.toString() // "81129638414696789717133459048036"
~~~

{{s3.p8}}

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

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

~~~js
bigArray[0] ^ bigArray[1]  // 2n

bigArray[0] | bigArray[1]  // 9007199254740994n

~~~
