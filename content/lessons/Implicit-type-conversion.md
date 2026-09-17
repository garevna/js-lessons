# ![ico-30 study] {{common.c22}}


## ![ico-25 icon] {{p1}}

{{p2}}

### ![ico-20 icon] {{p3}}

{{p4}}

{{p5}}

~~~js
var res = 20 + '5'
~~~

{{p6}}

{{p7}}

{{p8}}

~~~js
var res = 20 + 10 + '5'
~~~

{{p9}}

{{p10}}

~~~js
var res = '3' + 20 + 10
~~~

{{p11}}

{{p12}}

![ico-25 cap] ** 1**

~~~js
[] + 5             //  "5"
[] + false         //  "false"
[4] + NaN          //  "4NaN"
[4, 8] + null      //  "4,8null"
null + [4, 8]      //  "null4,8"
~~~

{{p13}}

~~~js
String([4, 8])
~~~

{{p14}}

{{p15}}

![ico-25 cap] ** 2**

~~~js
null + +[4]       // 4
+[5] + null         // 5
~~~

_____________________________________________________________________

### ![ico-20 icon] {{p16}}


{{p17}}

~~~js
var  x = '8' / 2
~~~

{{p18}}

{{p19}}

~~~js
var x = ''
var y = x / 5
~~~

{{p20}}

~~~js
console.log(+'')         // 0
console.log(+[])         // 0
console.log(+[]+'')      // 0
~~~

{{p21}}

~~~js
Number(undefined)   // NaN
Number(null)        // 0
~~~

{{p22}}

~~~js
var a = false
var b = true
var z = a + b    //  0 + 1 --> 1
~~~

{{p23}}

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

### ![ico-20 icon] {{p24}}

{{p25}}

![ico-25 cap] ** 5**

~~~js
if ('5') console.log('Yes')
~~~

{{p26}}

~~~js
Boolean('5')
~~~

{{p27}}

_______________________________________________

#### ![ico-20 icon] &&

^^^[{{p28}}]

{{p29}}

{{p30}}

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

{{p31}}

~~~js
true && true && true && true     //    true
~~~

{{p32}}

^^^
__________________________________________________________________

#### ![ico-20 icon] ||

^^^[{{p33}}]

{{p34}}

{{p35}}

![ico-25 cap] ** 8**

~~~js
null || false || 5 || ''          //   5
null || '' || 0 || 4 || 10        //   4
~~~

![ico-25 cap] ** 9**

~~~js
null || false || undefined || ''  //  ""
~~~

{{p36}}

{{p37}}
{{p38}}
{{p39}}
{{p40}}

{{p41}}

^^^

#### ![ico-20 icon] !!

^^^[{{p42}}]

{{p43}}

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

※※※exercises ⟦f21⟧※※※

_____________________________________________________________________

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_infinity.asp)
[![ico-20 link] ^^Equality in JavaScript^^](https://dorey.github.io/JavaScript-Equality-Table/unified/)
