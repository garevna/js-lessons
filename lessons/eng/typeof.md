# ![ico-35 study] Variables. Data types

## ![ico-30 icon] Operator typeof

^^Another language operator that you're getting to know today.^^

^^The first one, as you remember, is the **assignment operator**.^^

^^Next, we got familiar with two **comparison operators**.^^

Language operators always have **operands**.

For example, the assignment operator has two operands: one on the left and the other on the right.

![ico-20 warn] Operands are always separated from the operator by a space.

Depending on the number of operands, an operator can be:

| operator | number of operands | exapmples |
| unary    | 1                  | **~typeof~** |
| binary   | 2                  | **~ =~**, **~ >~**, **~ <~** |
| ternary  | 3                  | we'll look at this operator a little later |

Let's declare the variable **~num~** and assign it a value of 10:

~~~js
var num = 10
~~~

Now let's use the **~typeof~** operator to find out the data type of **~num~** variable:

~~~js
typeof num
~~~

We'll see in the console:

~~~console
'number'
~~~

Let's figure out what the engine does when it encounters a ~**typeof** num~ statement.

The engine calculates the value of this expression and replaces the ~**typeof** num~ expression with the computed value.

Let's look at another example:

~~~js
var companyName = 'Google'

typeof companyName
~~~

~~~console
'string'
~~~

![ico-25 warn] The **~typeof~** operator returns a **string**.

What does this mean?

~~~js
var boolean = false

typeof boolean
~~~

~~~console
'boolean'
~~~

This means that if the engine encounters an expression like this (devoid of any meaning other than educational - for you):

~~~js
typeof typeof boolean
~~~

then we will always get the same answer:

~~~console
'string'
~~~

Possible values ​​(strings) returned by the **~typeof~** operator:

• ~string~
• ~number~
• ~bigint~
• ~boolean~
• ~object~
• ~undefined~
• ~function~
• ~symbol~

As you can see, there are data types on this list that we haven't covered yet and that we have yet to explore.

__________________________________________________

### ![ico-30 icon] null

The value **~null~** means that the variable has no value. This value is inconsistent in the sense that such a value refers to primitive data types, while the **~typeof null~** operator returns ‘~object~’. And all data of type ‘~object~’ (except **~null~**) is of **reference type**. This bug should be kept in mind when we use the **~typeof~** operator.

Another peculiarity of **~null~** value is that if you use strict equality, then **~null~** will be equal only to itself, while non-strictly it will be equal only to **~undefined~**. This is understandable: they have different data types. But the fact that the value of **~null~** and the value of **~undefined~** are considered equal (without regard to data type) tells us that both of these values have the same meaning: no value. Both of these values are primitives, and they have one more feature in common, which we will understand a bit later, when we start studying constructors.

§§§§ Demo | var_null_template §§§§
__________________________________________________

### ![ico-30 icon] Tests

◘◘** 1**◘◘

→→→ typeof 2e-200 | 'number', 'string', 'boolean', 'undefined', 'object' | number →→→

◘◘** 2**◘◘

→→→ typeof NaN | 'number', 'string', 'boolean', 'undefined', 'object' | number →→→

◘◘** 3**◘◘

→→→ typeof 'Infinity' | 'number', 'string', 'boolean', 'undefined', 'object' | string →→→

◘◘** 4**◘◘

→→→ typeof 5 > 8 | 'number', 'string', 'boolean', 'undefined', 'object' | boolean →→→

◘◘** 5**◘◘

→→→ typeof undefined | 'number', 'string', 'boolean', 'undefined', 'object' | undefined →→→

◘◘** 6**◘◘

→→→ typeof null | 'number', 'string', 'boolean', 'undefined', 'object' | object →→→

__________________________________________________

## ![ico-30 icon] ECMAScript Specification

The current [%%%language specification%%%](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html ) defines seven data types:

<span class="tab-2" />• **Undefined Type**
<span class="tab-2" />• **Null Type**
<span class="tab-2" />• **Boolean Type**
<span class="tab-2" />• **String Type**
<span class="tab-2" />• **Symbol Type**
<span class="tab-2" />• **Numeric Types**
<span class="tab-4" />• **Number Type**
<span class="tab-4" />• **BigInt Type**
<span class="tab-2" />• **Object Type**

The **~typeof~** operator works "the old fashioned way", because if the principle of its operation were changed, then many sites created before 2015 would simply crumble.

However, when using it, it is worth remembering its "imperfection".

When comparing the data types of two variables, keep in mind that the characters are arranged in alphabetical order in the encoding table, so when comparing, the larger one will be the one which is located further from the beginning of the table.
