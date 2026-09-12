# ![ico-30 study] {{s1.h1}}


## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

~~~js
var res = 20 + '5'
~~~

{{s3.p3}}

{{s3.p4}}

{{s3.p5}}

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

{{s3.p10}}

~~~js
[] + 5             //  "5"
[] + false         //  "false"
[4] + NaN          //  "4NaN"
[4, 8] + null      //  "4,8null"
null + [4, 8]      //  "null4,8"
~~~

{{s3.p11}}

~~~js
String([4, 8])
~~~

{{s3.p12}}

{{s3.p13}}

{{s3.p14}}

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

{{s4.p8}}

~~~js
a = false, b = undefined
a > b       // 0 > NaN  --> false
a < b       // 0 < NaN  --> false
a == b      // 0 == NaN --> false
~~~

{{s4.p9}}

~~~js
a = true,  b = null
a > b       // 1 > null   --> true ( 1 > 0 )
a < b       // 1 < null   --> false
a == b      // 1 == null  --> false
~~~

______________________________________________________

### ![ico-20 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}

~~~js
if ('5') console.log('Yes')
~~~

{{s5.p3}}

~~~js
Boolean('5')
~~~

{{s5.p4}}

_______________________________________________

#### ![ico-20 icon] {{s6.h1}}

^^^[{{s6.spoiler1}}]

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}

~~~js
true && false && null   //  false
true && '5' && null     //  null
true && [] && null      //  null
~~~

{{s6.p4}}

~~~js
true && ![] && null     //  false
~~~

{{s6.p5}}

~~~js
true && true && true && true     //    true
~~~

{{s6.p6}}

^^^
__________________________________________________________________

#### ![ico-20 icon] {{s7.h1}}

^^^[{{s7.spoiler1}}]

{{s7.p1}}

{{s7.p2}}

{{s7.p3}}

~~~js
null || false || 5 || ''          //   5
null || '' || 0 || 4 || 10        //   4
~~~

{{s7.p4}}

~~~js
null || false || undefined || ''  //  ""
~~~

{{s7.p5}}

{{s7.p6}}
{{s7.p7}}
{{s7.p8}}
{{s7.p9}}

{{s7.p10}}

^^^

#### ![ico-20 icon] {{s8.h1}}

^^^[{{s8.spoiler1}}]

{{s8.p1}}

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

{{s8.p2}}

_____________________________________________________________________

{{s8.p3}}
{{s8.p4}}
