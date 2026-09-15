# ![ico-30 study] NaN / null / Infinity


## ![ico-25 icon] {{s1.h1}}

**{{common.c163}}**

{{s1.p2}}

{{s1.p3}}

~~~js
5 / "a"  --> NaN
"b" * 3  --> NaN
~~~

{{s1.p4}}

{{s1.p5}}

{{s1.p6}}

~~~js
NaN === NaN            // false
NaN == NaN             // false
NaN >= NaN             // false
NaN <= NaN             // false
~~~

{{s1.p7}}
{{s1.p8}}

{{s1.p9}}

~~~js
isNaN('привет')               //  true
Number.isNaN('привет')        //  false
Number.isNaN('привет' / 10)   //  true
~~~

{{s1.p10}}

{{s1.p11}}

_____________________________________________________________

## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

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

## ![ico-25 icon] {{s3.h1}}

**{{common.c163}}**

{{s3.p2}}

{{s3.p3}}

~1.7976931348623157E+10308~

{{s3.p4}}

{{s3.p5}}

~~~js
1 / 0            //  Infinity
~~~

{{s3.p6}}

~~~js
0 / Infinity  // NaN

Infinity / Infinity  // NaN
Infinity - Infinity  // NaN

Infinity * Infinity  // Infinity
Infinity + Infinity  // Infinity
~~~

______________________________________________________________

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_infinity.asp)
