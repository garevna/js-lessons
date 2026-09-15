# ![ico-30 study] NaN / null / Infinity


## ![ico-25 icon] The value NaN

**Data type ~number~**

Abbreviation for **Not a Number** (the result of an operation is not a number)

Can result from type casting, for example:

~~~js
5 / "a"  --> NaN
"b" * 3  --> NaN
~~~

~NaN~ is a property of the global object (~window~)

~NaN~ is also a property of the built-in object ~Number~

![ico-20 warn] ~NaN~ is not equal to anything, not even itself

~~~js
NaN === NaN            // false
NaN == NaN             // false
NaN >= NaN             // false
NaN <= NaN             // false
~~~

To determine whether ~NaN~ is the value of an expression,
you can use the methods  ~isNaN()~  and  ~Number.isNaN()~

Their behaviour is not identical

~~~js
isNaN('привет')               //  true
Number.isNaN('привет')        //  false
Number.isNaN('привет' / 10)   //  true
~~~

^^~isNaN()~  returns ~true~ if, after casting the argument to a number, the result is  ~NaN~^^

^^~Number.isNaN()~ returns ~true~ if the argument has the value ~NaN~ (no type casting occurs)^^

_____________________________________________________________

## ![ico-25 icon] The value null

**Data type ~object~**

The special value ~null~ means ‘nothing’

![ico-20 warn] ~null~ can only be equal to ~null~ or (in a non-strict comparison) ~undefined~

~~~js      
null == null              // true
null === null             // true
null == undefined         // true
null === undefined        // false
null == 0                 // false
null == NaN               // false
null == false             // false
null == ''                // false
null == []                // false
~~~

_____________________________________________________________

## ![ico-25 icon] The value Infinity

**Data type ~number~**

A value exceeding the maximum possible floating-point number

The maximum possible floating-point number:

~1.7976931348623157E+10308~

May be negative (~-Infinity~)

~Infinity~ may be the result of dividing a non-zero number by zero

~~~js
1 / 0            //  Infinity
~~~

However:

~~~js
0 / Infinity  // NaN

Infinity / Infinity  // NaN
Infinity - Infinity  // NaN

Infinity * Infinity  // Infinity
Infinity + Infinity  // Infinity
~~~

______________________________________________________________

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_infinity.asp)
