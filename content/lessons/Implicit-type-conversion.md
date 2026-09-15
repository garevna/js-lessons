# ![ico-30 study] {{common.c32}}


## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

^^{{common.c156}}^^

~~~js
var res = 20 + '5'
~~~

{{s3.p3}}

{{s3.p4}}

^^{{common.c154}}^^

~~~js
var res = 20 + 10 + '5'
~~~

{{s3.p6}}

{{s3.p7}}

~~~js
var res = '3' + 20 + 10
~~~

{{s3.p8}}

{{s3.p9}}

![ico-25 cap] ** 1**

~~~js
[] + 5             //  "5"
[] + false         //  "false"
[4] + NaN          //  "4NaN"
[4, 8] + null      //  "4,8null"
null + [4, 8]      //  "null4,8"
~~~

{{s3.p10}}

~~~js
String([4, 8])
~~~

{{s3.p11}}

{{s3.p12}}

![ico-25 cap] ** 2**

~~~js
null + +[4]       // 4
+[5] + null         // 5
~~~

_____________________________________________________________________

### ![ico-20 icon] {{s4.h1}}


{{s4.p1}}

~~~js
var  x = '8' / 2
~~~

{{s4.p2}}

{{s4.p3}}

~~~js
var x = ''
var y = x / 5
~~~

{{s4.p4}}

~~~js
console.log(+'')         // 0
console.log(+[])         // 0
console.log(+[]+'')      // 0
~~~

{{s4.p5}}

~~~js
Number(undefined)   // NaN
Number(null)        // 0
~~~

{{s4.p6}}

~~~js
var a = false
var b = true
var z = a + b    //  0 + 1 --> 1
~~~

{{s4.p7}}

____________________________________________________________

![ico-25 cap] ** 3**

~~~js
a = false, b = undefined
a > b       // 0 > NaN  --> false
a < b       // 0 < NaN  --> false
a == b      // 0 == NaN --> false
~~~

![ico-25 cap] ** 4**

~~~js
a = true,  b = null
a > b       // 1 > null   --> true ( 1 > 0 )
a < b       // 1 < null   --> false
a == b      // 1 == null  --> false
~~~

______________________________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

![ico-25 cap] ** 5**

~~~js
if ('5') console.log('Yes')
~~~

{{s5.p2}}

~~~js
Boolean('5')
~~~

{{s5.p3}}

_______________________________________________

#### ![ico-20 icon] &&

^^^[{{s5.spoiler1}}]

{{s5.p4}}

{{s5.p5}}

![ico-25 cap] ** 6**

~~~js
true && false && null   //  false
true && '5' && null     //  null
true && [] && null      //  null
~~~

![ico-25 cap] ** 7**

~~~js
true && ![] && null     //  false
~~~

{{s5.p6}}

~~~js
true && true && true && true     //    true
~~~

{{s5.p7}}

^^^
__________________________________________________________________

#### ![ico-20 icon] ||

^^^[{{s5.spoiler2}}]

{{s5.p8}}

{{s5.p9}}

![ico-25 cap] ** 8**

~~~js
null || false || 5 || ''          //   5
null || '' || 0 || 4 || 10        //   4
~~~

![ico-25 cap] ** 9**

~~~js
null || false || undefined || ''  //  ""
~~~

{{s5.p10}}

{{s5.p11}}
{{s5.p12}}
{{s5.p13}}
{{s5.p14}}

{{s5.p15}}

^^^

#### ![ico-20 icon] !!

^^^[{{s5.spoiler3}}]

{{s5.p16}}

~~~js
var x = null
var y = !!x        // false
~~~

~~~js
var x = undefined
var y = !!x        // false
~~~

~~~js
!![ ]      // вернет   true
!!+[ ]     // вернет  false
~~~

^^^

{{{Implicit-type-conversion.js}}}

_____________________________

{{s5.p17}}

_____________________________________________________________________

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_infinity.asp)
[![ico-20 link] ^^Equality in JavaScript^^](https://dorey.github.io/JavaScript-Equality-Table/unified/)
