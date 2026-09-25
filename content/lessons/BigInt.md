## ![ico-25 icon] BigInt

**ES10 (2019)**

{{p1}}

{{p2}}

{{p3}}

__________________________________________________________

### ![ico-20 icon] {{p4}}

{{p5}}

~~~js
var bigNumber = 78n
~~~

{{p6}}

~~~js
var bigNumber = Number.MAX_SAFE_INTEGER + 5003  // 9007199254745994
bigNumber = BigInt(bigNumber) // 9007199254745994n
~~~

{{p7}}

~~~js
typeof bigNumber // 'bigint'
~~~

_____________________________________________________________

### ![ico-20 icon] {{common.c22}}

{{p8}}

#### Infinity

~~~js
BigInt(Infinity)
~~~

{{p9}}

![ico-20 err]

~~~error
    Uncaught RangeError: The number Infinity cannot be converted to a BigInt because it is not an integer
~~~

#### NaN

~~~js
BigInt(NaN)
~~~

{{p10}}

![ico-20 err]

~~~error
    Uncaught RangeError: The number NaN cannot be converted to a BigInt because it is not an integer
~~~

#### null

~~~js
BigInt(null)
~~~

{{p11}}

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

{{p12}}

~~~js
BigInt('45 + 8')
~~~

![ico-20 err]

~~~error
    Uncaught SyntaxError: Cannot convert 45 + 8 to a BigInt
~~~

_____________________________________________________________

### ![ico-20 icon] {{p13}}

^^^[{{p14}}]

{{p15}}

{{p16}}

~~~js
bigNumber * 2
~~~

{{common.c5}}

![ico-20 err]

~~~error
    Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

{{p17}}

~~~js
Math.sin(bigNumber)
~~~

{{common.c5}}

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

^^^

____________________________________________________________

### ![ico-20 icon] {{p21}}

{{p22}}

~~~js
bigArray[0] ^ bigArray[1]  // 2n

bigArray[0] | bigArray[1]  // 9007199254740994n

~~~
