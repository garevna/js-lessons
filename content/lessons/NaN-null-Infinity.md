# ![ico-30 study] NaN / null / Infinity


## ![ico-25 icon] {{p1}}

{{p2}}

{{p3}}

{{p4}}

~~~js
5 / "a"  --> NaN
"b" * 3  --> NaN
~~~

{{p5}}

{{p6}}

{{p7}}

~~~js
NaN === NaN            // false
NaN == NaN             // false
NaN >= NaN             // false
NaN <= NaN             // false
~~~

{{p8}}
{{p9}}

{{p10}}

~~~js
isNaN('привет')               //  true
Number.isNaN('привет')        //  false
Number.isNaN('привет' / 10)   //  true
~~~

{{p11}}

{{p12}}

_____________________________________________________________

## ![ico-25 icon] {{p13}}

{{p14}}

{{p15}}

{{p16}}

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

## ![ico-25 icon] {{p17}}

{{p18}}

{{p19}}

{{p20}}

~1.7976931348623157E+10308~

{{p21}}

{{p22}}

~~~js
1 / 0            //  Infinity
~~~

{{p23}}

~~~js
0 / Infinity  // NaN

Infinity / Infinity  // NaN
Infinity - Infinity  // NaN

Infinity * Infinity  // Infinity
Infinity + Infinity  // Infinity
~~~

______________________________________________________________

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_infinity.asp)
