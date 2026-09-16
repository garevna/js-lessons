# ![ico-30 study] {{common.c22}}

______________________________________

## ![ico-25] {{s2.h1}}

{{s2.p1}}

![ico-25 cap] ** 1**

~~~js
var x = '10'
Number(x)    // 10
~~~

{{s2.p2}}

![ico-25 cap] ** 2 **

~~~js
Number('туман')
~~~

{{s2.p3}}

{{s2.p4}}

![ico-25 cap] ** 3**

~~~js
String(50)   // "50"
~~~

{{s2.p5}}

![ico-25 cap] ** 4 **

~~~js
Boolean('50')  // true
~~~

{{s2.p6}}

___________________________________________________________________

### ![ico-20 icon] {{s3.h1}}

{{s3.p1}}

~~~js
Number(null)    // 0
Number(false)   // 0
Number('')      // 0
Number(' ')     // 0
Number([])      // 0
Number('\n')    // 0
Number('\t')    // 0
~~~

{{s3.p2}}

~~~js
Number(String.fromCharCode(9))   // 0
Number(String.fromCharCode(10))  // 0
Number(String.fromCharCode(11))  // 0
Number(String.fromCharCode(12))  // 0
Number(String.fromCharCode(13))  // 0
~~~

{{s3.p3}}

{{s3.p4}}

{{s3.p5}}

![ico-25 cap] ** 5 **

~~~js
Number(undefined)   // NaN
Number(' 12s ')     // NaN
Number('4+8')       // NaN
Number([5, 7, 4])   // NaN
Number(NaN)         // NaN
Number({})          // NaN
~~~

{{s3.p6}}

![ico-25 cap] ** 6 **

~~~js
Number(57)            // вернет 57
Number(4 * '8')       // вернет 32
Number([5])           // вернет 5
Number([5] + [8])     // вернет 58
Number(null - true)   // вернет -1
~~~

______________________________

#### ![ico-20 icon] parseInt & parseFloat

{{s3.p7}}
{{s3.p8}}

~~~js
Number('3.14abc')      // NaN
parseFloat('3.14abc')  // 3.14
parseInt('3.14abc')    // 3

Number('3.14/5')        // NaN
parseFloat('3.14/5')    // 3.14
~~~

{{s3.p9}}

____________________________________________________________________

### ![ico-20 icon] {{s4.h1}}

{{s4.p1}}

~~~js
Boolean('')
Boolean(0)     
Boolean(-0)  
Boolean(NaN)
Boolean(null)
Boolean(undefined)
Boolean(false)
~~~

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

____________________________________________________________________

### ![ico-20 icon] {{s5.h1}}


~~~js
var str = String(5 + 8 + false)  //  "13"

var object = {}
String(object)  //  "[object Object]"

var array = [5, true, 'hello', 11]
String(array)  //  "5,true,hello,11"
~~~

{{s5.p1}}
{{s5.p2}}
{{s5.p3}}

~~~js
Number(2).toString(2)    // "10"
Number(58).toString(2)   // "111010"
Number(8).toString(8)    // "10"
Number(58).toString(8)   // "72"
Number(16).toString(16)  // "10"
Number(58).toString(16)  // "3a"
~~~

____________________________________________________________________

### ![ico20] {{s6.h1}}

~~~js
Object(5 + 8 + false)
~~~

~~~console
▼ Number {13}
  ► __proto__: Number
    [[PrimitiveValue]]: 13
~~~

~~~js
var num = 10
Object(num)
~~~

~~~console
▼ Number {10}
  ► __proto__: Number
    [[PrimitiveValue]]: 10
~~~

~~~js
var array = [5, true, 'hello', 11]
Object(array)
~~~

{{s6.p1}}

____________________________________________________________________

※※※exercises ⟦f20⟧※※※

____________________________________________________________________

[![ico-20 link] ^^Infinity^^](external/w3-infinity)

[![ico-20 link] ^^JavaScript Equality Table^^](external/equality-in-table)
