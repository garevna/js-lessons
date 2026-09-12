# ![ico-30 study] {{s1.h1}}

______________________________________________________

### {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

~~~js
var array = ['Nail', 'Bicycle', 'Processor', 'Disk']
var length = array.push('Program')
~~~

{{s2.p6}}

{{s2.p7}}


{{s2.p8}}

{{s2.p9}}

____________________________________________________________________

### {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

{{s3.p4}}

~~~js
var array = ['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']
var elem = array.pop()
~~~

{{s3.p5}}

{{s3.p6}}

{{s3.p7}}
{{s3.p8}}

_________________________________________________________________________

### {{s4.h1}}

{{s4.p1}}
{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

{{s4.p5}}

~~~js
var arrayOfThings = ['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']
console.log(arrayOfThings.shift())
~~~

{{s4.p6}}

{{s4.p7}}

{{s4.p8}}

{{s4.p9}}

______________________________________________________

### {{s5.h1}}

{{s5.p1}}
{{s5.p2}}

{{s5.p3}}

{{s5.p4}}

~~~js
var drinks = ['coffee', 'tea', 'juice', 'water', 'milk']
var len = drinks.unshift('beer')
~~~

{{s5.p5}}

{{s5.p6}}

{{s5.p7}}
{{s5.p8}}

___________________________________________________________________

### {{s6.h1}}

{{s6.p1}}
{{s6.p2}}
{{s6.p3}}
{{s6.p4}}

{{s6.p5}}

{{s6.p6}}

{{s6.p7}}

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 1, '*'))
~~~

{{s6.p8}}

{{s6.p9}}

{{s6.p10}}
{{s6.p11}}

_____________________________________

{{s6.p12}}

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 2, '*', '#', '$', '%'))
~~~

{{s6.p13}}


{{s6.p14}}


{{s6.p15}}
{{s6.p16}}

______________________________________

{{s6.p17}}

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 2, [7, 8, 9]))
~~~

{{s6.p18}}

{{s6.p19}}


{{s6.p20}}

{{s6.p21}}

__________________________________________________

{{s6.p22}}

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 0, 'Новый элемент'))
~~~

{{s6.p23}}

{{s6.p24}}

{{s6.p25}}

{{s6.p26}}

{{s6.p27}}

____________________________________________________________________

### {{s7.h1}}

{{s7.p1}}
{{s7.p2}}
{{s7.p3}}
{{s7.p4}}
{{s7.p5}}
{{s7.p6}}

{{s7.p7}}

{{s7.p8}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(1, 2) // ['two']
~~~

{{s7.p9}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(1, -2) // ['two', 'three']
~~~

{{s7.p10}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(-2) // ['four', 'five']
~~~

{{s7.p11}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(-4, -2) // ['two', 'three']
~~~

{{s7.p12}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(-8, 25) // ['one', 'two', 'three', 'four', 'five']
~~~

{{s7.p13}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(4, 3) // []
~~~

{{s7.p14}}

_____________________________________________________________________

### {{s8.h1}}

{{s8.p1}}
{{s8.p2}}
{{s8.p3}}

{{s8.p4}}

{{s8.p5}}

~~~js
var first = ['one', 'two', 'three']
var second = ['four', 'five']
var result = first.concat(second)
~~~

{{s8.p6}}
{{s8.p7}}

{{s8.p8}}

~~~js
var numbers = [1, 2, 3, 4]
var additional = [7, 8, 9]
var result = [11, 0, 5]

result = result.concat(numbers, additional)
~~~

{{s8.p9}}
{{s8.p10}}

{{s8.p11}}

____________________________________________________________________________

### {{s9.h1}}

{{s9.p1}}
{{s9.p2}}

{{s9.p3}}

{{s9.p4}}

~~~js
var drinks = ['coffee', 'tea', 'juice', 'water', 'milk']
var menu = drinks.join(' | ')
~~~

{{s9.p5}}

{{s9.p6}}

{{s9.p7}}

_____________________________________________________________

### {{s10.h1}}

{{s10.p1}}

{{s10.p2}}

{{s10.p3}}

{{s10.p4}}

~~~js
var users = ['Ivan', 'George', 'Stephan']

users.includes('Stephan')  // true
users.includes('Mary')     // false
~~~

_______________________________________________________________

{{s10.p5}}

{{s10.p6}}

~~~js
var users = [
  {
    name: 'Ivan',
    email: 'ivan78@gmail.com'
  },
  {
    name: 'Georg',
    email: 'georg.klep@gmail.com'
  },
  {
    name: 'Stephan',
    email: 'stephan.borg@gmail.com'
  }
]

users.includes({
  name: 'Stephan',
  email: 'stephan.borg@gmail.com'
})

//  false
~~~

______________________________________________________________

{{s10.p7}}

~~~js
var points = [[100, 20], [200, 150], [120, 50]]

points.includes([100, 20])   // false
~~~

{{s10.p8}}

_____________________________________________________________________

{{s10.p9}}
