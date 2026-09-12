## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}

{{s1.p3}}

{{s1.p4}}

__________________________________________________________

### ![ico-20 icon] {{s2.h1}}

{{s2.p1}}

~~~js
var bigNumber = 78n
~~~

{{s2.p2}}

~~~js
var bigNumber = Number.MAX_SAFE_INTEGER + 5003  // 9007199254745994
bigNumber = BigInt(bigNumber) // 9007199254745994n
~~~

{{s2.p3}}

~~~js
typeof bigNumber // 'bigint'
~~~

_____________________________________________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

#### {{s4.h1}}

~~~js
BigInt(Infinity)
~~~

{{s4.p1}}

{{s4.p2}}

~~~error
    Uncaught RangeError: The number Infinity cannot be converted to a BigInt because it is not an integer
~~~

#### {{s5.h1}}

~~~js
BigInt(NaN)
~~~

{{s5.p1}}

{{s5.p2}}

~~~error
    Uncaught RangeError: The number NaN cannot be converted to a BigInt because it is not an integer
~~~

#### {{s6.h1}}

~~~js
BigInt(null)
~~~

{{s6.p1}}

{{s6.p2}}

~~~error
    Uncaught TypeError: Cannot convert null to a BigInt
~~~

_____________________________________________________

#### {{s7.h1}}

~~~js
BigInt(false)  // 0n
BigInt(true)   // 1n
~~~

#### {{s8.h1}}

~~~js
BigInt([])   // 0n
~~~

#### {{s9.h1}}

~~~js
BigInt('45')        // 45n
BigInt('45' + 11)   // 4511n
BigInt('45' - 11)   // 34n

BigInt('45' - true) // 44n
~~~

{{s9.p1}}

~~~js
BigInt('45 + 8')
~~~

{{s9.p2}}

~~~error
    Uncaught SyntaxError: Cannot convert 45 + 8 to a BigInt
~~~

_____________________________________________________________

### ![ico-20 icon] {{s10.h1}}

^^^[{{s10.spoiler1}}]

{{s10.p1}}

{{s10.p2}}

~~~js
bigNumber * 2
~~~

{{s10.p3}}

{{s10.p4}}

~~~error
    Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

{{s10.p5}}

~~~js
Math.sin(bigNumber)
~~~

{{s10.p6}}

{{s10.p7}}

~~~error
    Uncaught TypeError: Cannot convert a BigInt value to a number
~~~

{{s10.p8}}

~~~js
Number(bigNumber) // 9007199254745994
~~~

{{s10.p9}}

~~~js
bigNumber = bigNumber * bigNumber // 81129638414696789717133459048036n
bigNumber.toString() // "81129638414696789717133459048036"

Number(bigNumber) // 8.112963841469679e+31
bigNumber.toString() // "81129638414696789717133459048036"
~~~

{{s10.p10}}

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

### ![ico-20 icon] {{s11.h1}}

{{s11.p1}}

~~~js
bigArray[0] ^ bigArray[1]  // 2n

bigArray[0] | bigArray[1]  // 9007199254740994n

~~~
