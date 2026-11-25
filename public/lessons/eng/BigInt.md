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

### ![ico-20 icon] Arithmetic operations⟪Arithmetic_operations⟫

Arithmetic operations involving data of type **~bigint~** are only possible provided that both operands are of type **~bigint~**

When attempting to perform an arithmetic operation with operands of different types a **^^TypeError^^** will be raised

~~~demo
> bigNumber = 9007199254745994n
< 9007199254745994n
> bigNumber * 2
! Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
~~~

When attempting to apply functions from the Math library to data of type **~bigint~** a **^^TypeError^^** will be raised.
However, it is possible to cast data of type **~bigint~** to the standard type **~number~**.

~~~demo
> bigNumber = 9007199254745994n
< 9007199254745994n
> Math.sin(bigNumber)
! Uncaught TypeError: Cannot convert a BigInt value to a number
> Math.sin(Number(bigNumber))
< -0.9996177925388726
~~~

When cast to a string, both types (**~bigint~** and **~number~**) will return the same result:

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

Data of type **~bigint~** can be used as indices for array elements:

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

### ![ico-20 icon] Bitwise operations⟪Bitwise_operations⟫

Bitwise operations operate on data of type **~bigint~** and return a result of type **~bigint~**:

~~~demo
> bigArray[0]^bigArray[1]
< 2n
> bigArray[0]|bigArray[1]
< 9007199254740994n
~~~

___

## ![ico-25 hw] Tests⟪Tests⟫

♣♣♣♣
? What does **typeof 10n** return?

- **'number'**
= Incorrect. **BigInt** is a primitive type of its own, not a kind of **number**. That is exactly why the two cannot be mixed in one expression.

+ **'bigint'**
= That’s right! In lower case, like the other primitives: **typeof** returns **'bigint'**. The **n** suffix at the end of the literal is what declares a value of this type.

- **'object'**
= Incorrect. **BigInt** is a primitive, not an object. It is wrapped in an object only for the duration of a method call, as a string or a number is.

- **'BigInt'**
= Incorrect. **typeof** always answers with a lower-case string: **'bigint'**. The capital letter belongs to the **BigInt()** constructor.

? What happens with **10n + 5**?

- **15n**
= Incorrect. The engine does not convert **number** to **BigInt** by itself: you have to do it — **10n + BigInt(5)**.

- **15**
= Incorrect. There is no conversion to **number** either — and just as well: **BigInt** exists for the precision that **number** does not have.

+ A **TypeError**
= That’s right! **Cannot mix BigInt and other types, use explicit conversions.** Mixing the types in arithmetic is forbidden, and the conversion has to be written out.

- The string **'105'**
= Incorrect. Concatenation happens with a string — **10n + '5'** gives **'105'**. With a number there is neither addition nor concatenation.

? What do **10n == 10** and **10n === 10** return?

- Both **true**
= Incorrect. Strict comparison looks at the type first, and the types differ here — **bigint** and **number**.

+ **true** and **false**
= That’s right! Loose comparison compares the mathematical values and says **true**; strict comparison also looks at the type and says **false**. Arithmetic may not be mixed, but comparison may.

- Both **false**
= Incorrect. Loose comparison exists precisely to compare values of different types: **10n == 10** gives **true**.

- A **TypeError**
= Incorrect. The **TypeError** comes from arithmetic on mixed types; comparison works quite happily.

? What happens when **BigInt(2.5)** is called?

- **2n** — the fractional part is dropped
= Incorrect. The constructor will not round silently: a number that is not an integer it refuses to convert at all.

- **3n** — rounded as usual
= Incorrect. No rounding takes place — there will be an error.

+ A **RangeError**
= That’s right! **The number 2.5 cannot be converted to a BigInt because it is not an integer.** The constructor answers **Infinity** and **NaN** the same way. If the fractional part is to go, it goes before the call: **BigInt(Math.trunc(2.5))**.

- A **SyntaxError**
= Incorrect. The constructor throws a **SyntaxError** at a string it cannot read as a number — **BigInt('45 + 8')**. Here the number reads fine but is not an integer, and that is a **RangeError**.

? What is **7n / 2n**?

- **3.5**
= Incorrect. Dividing two **BigInt** values gives a **BigInt**, and this type holds no fractions at all.

- **3.5n**
= Incorrect. There is no such value: **BigInt** is whole numbers, and the literal **3.5n** does not even parse.

+ **3n**
= That’s right! The division is integer division: the remainder is dropped, not rounded — **7n / 2n** gives **3n**, and **-7n / 2n** gives **-3n**. The remainder, if wanted, is taken separately: **7n % 2n** is **1n**.

- **4n**
= Incorrect. There is no rounding up: the fractional part is simply dropped, which gives **3n**.

♣♣♣♣
