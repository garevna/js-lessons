# ![ico-30 study] {{common.c22}}

______________________________________

## ![ico-25] {{p1}}

{{p2}}

![ico-25 cap] ** 1**

~~~js
var x = '10'
Number(x)    // 10
~~~

{{p3}}

![ico-25 cap] ** 2 **

~~~js
Number('туман')
~~~

{{p4}}

{{p5}}

![ico-25 cap] ** 3**

~~~js
String(50)   // "50"
~~~

{{p6}}

![ico-25 cap] ** 4 **

~~~js
Boolean('50')  // true
~~~

{{p7}}

___________________________________________________________________

### ![ico-20 icon] {{p8}}

{{p9}}

~~~js
Number(null)    // 0
Number(false)   // 0
Number('')      // 0
Number(' ')     // 0
Number([])      // 0
Number('\n')    // 0
Number('\t')    // 0
~~~

{{p10}}

~~~js
Number(String.fromCharCode(9))   // 0
Number(String.fromCharCode(10))  // 0
Number(String.fromCharCode(11))  // 0
Number(String.fromCharCode(12))  // 0
Number(String.fromCharCode(13))  // 0
~~~

{{p11}}

{{p12}}

{{p13}}

![ico-25 cap] ** 5 **

~~~js
Number(undefined)   // NaN
Number(' 12s ')     // NaN
Number('4+8')       // NaN
Number([5, 7, 4])   // NaN
Number(NaN)         // NaN
Number({})          // NaN
~~~

{{p14}}

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

{{p15}}
{{p16}}

~~~js
Number('3.14abc')      // NaN
parseFloat('3.14abc')  // 3.14
parseInt('3.14abc')    // 3

Number('3.14/5')        // NaN
parseFloat('3.14/5')    // 3.14
~~~

{{p17}}

____________________________________________________________________

### ![ico-20 icon] {{p18}}

{{p19}}

~~~js
Boolean('')
Boolean(0)     
Boolean(-0)  
Boolean(NaN)
Boolean(null)
Boolean(undefined)
Boolean(false)
~~~

{{p20}}

{{p21}}

{{p22}}

____________________________________________________________________

### ![ico-20 icon] {{p23}}


~~~js
var str = String(5 + 8 + false)  //  "13"

var object = {}
String(object)  //  "[object Object]"

var array = [5, true, 'hello', 11]
String(array)  //  "5,true,hello,11"
~~~

{{p24}}
{{p25}}
{{p26}}

~~~js
Number(2).toString(2)    // "10"
Number(58).toString(2)   // "111010"
Number(8).toString(8)    // "10"
Number(58).toString(8)   // "72"
Number(16).toString(16)  // "10"
Number(58).toString(16)  // "3a"
~~~

____________________________________________________________________

### ![ico20] {{p27}}

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

{{p28}}

____________________________________________________________________

※※※exercises ⟦f20⟧※※※

____________________________________________________________________

[![ico-20 link] ^^Infinity^^](external/w3-infinity)

[![ico-20 link] ^^JavaScript Equality Table^^](external/equality-in-table)
