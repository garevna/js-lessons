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

### ![ico-20 icon] {{arithmetic_operations}}

{{arithmetic_operations_description_1}}

{{arithmetic_operations_description_2}}

~~~demo
> bigNumber = 9007199254745994n
< 9007199254745994n
> bigNumber * 2
! Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

{{math_1}}
{{math_2}}

~~~demo
> bigNumber = 9007199254745994n
< 9007199254745994n
> Math.sin(bigNumber)
! Uncaught TypeError: Cannot convert a BigInt value to a number
> Math.sin(Number(bigNumber))
< -0.9996177925388726
~~~

{{to_string}}

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

{{array_indices}}

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

### ![ico-20 icon] {{bitwize_1}}

{{bitwize_2}}

~~~demo
> bigArray[0]^bigArray[1]
< 2n
> bigArray[0]|bigArray[1]
< 9007199254740994n
~~~

___

## ![ico-25 hw] {{common.tests}}

♣♣♣♣
? {{test01Question}}

- {{test01Variant1}}
= {{test01Variant1Answer}}

+ {{test01Variant2}}
= {{test01Variant2Answer}}

- {{test01Variant3}}
= {{test01Variant3Answer}}

- {{test01Variant4}}
= {{test01Variant4Answer}}

? {{test02Question}}

- {{test02Variant1}}
= {{test02Variant1Answer}}

- {{test02Variant2}}
= {{test02Variant2Answer}}

+ {{test02Variant3}}
= {{test02Variant3Answer}}

- {{test02Variant4}}
= {{test02Variant4Answer}}

? {{test03Question}}

- {{test03Variant1}}
= {{test03Variant1Answer}}

+ {{test03Variant2}}
= {{test03Variant2Answer}}

- {{test03Variant3}}
= {{test03Variant3Answer}}

- {{test03Variant4}}
= {{test03Variant4Answer}}

? {{test04Question}}

- {{test04Variant1}}
= {{test04Variant1Answer}}

- {{test04Variant2}}
= {{test04Variant2Answer}}

+ {{test04Variant3}}
= {{test04Variant3Answer}}

- {{test04Variant4}}
= {{test04Variant4Answer}}

? {{test05Question}}

- {{test05Variant1}}
= {{test05Variant1Answer}}

- {{test05Variant2}}
= {{test05Variant2Answer}}

+ {{test05Variant3}}
= {{test05Variant3Answer}}

- {{test05Variant4}}
= {{test05Variant4Answer}}

♣♣♣♣
