# ![ico-30 study] {{s1.h1}}

______________________________________________________

### {{s2.h1}}

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}

^^^[{{s2.spoiler1}}]

{{s2.p4}}

~~~js
var array = ['Nail', 'Bicycle', 'Processor', 'Disk']
var length = array.push('Program')
~~~

{{s2.p5}}

{{s2.p6}}


{{s2.p7}}

^^^

____________________________________________________________________

### {{s3.h1}}

^^^[{{s3.spoiler1}}]

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

~~~js
var array = ['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']
var elem = array.pop()
~~~

{{s3.p4}}

{{s3.p5}}

{{s3.p6}}
^^^

_________________________________________________________________________

### {{s4.h1}}

{{s4.p1}}
{{s4.p2}}

^^^[{{s4.spoiler1}}]

{{s4.p3}}

{{s4.p4}}

~~~js
var arrayOfThings = ['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']
console.log(arrayOfThings.shift())
~~~

{{s4.p5}}

{{s4.p6}}

{{s4.p7}}

^^^

______________________________________________________

### {{s5.h1}}

{{s5.p1}}
{{s5.p2}}

^^^[{{s5.spoiler1}}]

{{s5.p3}}

~~~js
var drinks = ['coffee', 'tea', 'juice', 'water', 'milk']
var len = drinks.unshift('beer')
~~~

{{s5.p4}}

{{s5.p5}}

{{s5.p6}}
^^^

___________________________________________________________________

### {{s6.h1}}

{{s6.p1}}
{{s6.p2}}
{{s6.p3}}
{{s6.p4}}

^^^[{{s6.spoiler1}}]

{{s6.p5}}

{{s6.p6}}

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 1, '*'))
~~~

{{s6.p7}}

••[1, 2, '*', 4, 5]••

{{s6.p8}}
{{s6.p9}}

_____________________________________

{{s6.p10}}

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 2, '*', '#', '$', '%'))
~~~

{{s6.p11}}


••[1, 2, '*', '#', '$', '%', 5]••


{{s6.p12}}
{{s6.p13}}

______________________________________

{{s6.p14}}

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 2, [7, 8, 9]))
~~~

{{s6.p15}}

{{s6.p16}}


{{s6.p17}}

{{s6.p18}}

__________________________________________________

{{s6.p19}}

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 0, 'Новый элемент'))
~~~

{{s6.p20}}

{{s6.p21}}

{{s6.p22}}

{{s6.p23}}

^^^

____________________________________________________________________

### {{s7.h1}}

{{s7.p1}}
{{s7.p2}}
{{s7.p3}}
{{s7.p4}}
{{s7.p5}}
{{s7.p6}}

^^^[{{s7.spoiler1}}]

{{s7.p7}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(1, 2) // ['two']
~~~

{{s7.p8}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(1, -2) // ['two', 'three']
~~~

{{s7.p9}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(-2) // ['four', 'five']
~~~

{{s7.p10}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(-4, -2) // ['two', 'three']
~~~

{{s7.p11}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(-8, 25) // ['one', 'two', 'three', 'four', 'five']
~~~

{{s7.p12}}

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(4, 3) // []
~~~

^^^

_____________________________________________________________________

### {{s8.h1}}

{{s8.p1}}
{{s8.p2}}
{{s8.p3}}

^^^[{{s8.spoiler1}}]

{{s8.p4}}

~~~js
var first = ['one', 'two', 'three']
var second = ['four', 'five']
var result = first.concat(second)
~~~

{{s8.p5}}
{{s8.p6}}

{{s8.p7}}

~~~js
var numbers = [1, 2, 3, 4]
var additional = [7, 8, 9]
var result = [11, 0, 5]

result = result.concat(numbers, additional)
~~~

{{s8.p8}}
••► (10) [11, 0, 5, 1, 2, 3, 4, 7, 8, 9]••

^^^

____________________________________________________________________________

### {{s9.h1}}

{{s9.p1}}
{{s9.p2}}

^^^[{{s9.spoiler1}}]

{{s9.p3}}

~~~js
var drinks = ['coffee', 'tea', 'juice', 'water', 'milk']
var menu = drinks.join(' | ')
~~~

{{s9.p4}}

{{s9.p5}}

^^^

_____________________________________________________________

### {{s10.h1}}

{{s10.p1}}

{{s10.p2}}

^^^[{{s10.spoiler1}}]

{{s10.p3}}

~~~js
var users = ['Ivan', 'George', 'Stephan']

users.includes('Stephan')  // true
users.includes('Mary')     // false
~~~

_______________________________________________________________

{{s10.p4}}

{{s10.p5}}

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

{{s10.p6}}

~~~js
var points = [[100, 20], [200, 150], [120, 50]]

points.includes([100, 20])   // false
~~~

^^^

_____________________________________________________________________

{{s10.p7}}
