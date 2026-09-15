# ![ico-30 study] {{s1.h1}}

______________________________________________________

### push

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}

^^^[push()]

![ico-25 cap] ** 1**

~~~js
var array = ['Nail', 'Bicycle', 'Processor', 'Disk']
var length = array.push('Program')
~~~

{{s1.p4}}

••['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']••


{{s1.p5}}

^^^

____________________________________________________________________

### pop

^^^[pop()]

{{s1.p6}}

{{s1.p7}}

![ico-25 cap] ** 1**

~~~js
var array = ['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']
var elem = array.pop()
~~~

{{s1.p8}}

••['Nail', 'Bicycle', 'Processor', 'Disk']••

{{s1.p9}}
^^^

_________________________________________________________________________

### shift

{{s1.p10}}
{{s1.p11}}

^^^[shift()]

![ico-25 cap] ** 1**

^^{{common.c21}}^^

~~~js
var arrayOfThings = ['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']
console.log(arrayOfThings.shift())
~~~

{{s1.p13}}

{{s1.p14}}

••['Bicycle', 'Processor', 'Disk', 'Program']••

^^^

______________________________________________________

### unshift

{{s1.p15}}
{{s1.p16}}

^^^[unshift()]

![ico-25 cap] ** 1**

~~~js
var drinks = ['coffee', 'tea', 'juice', 'water', 'milk']
var len = drinks.unshift('beer')
~~~

{{s1.p17}}

••['beer', 'coffee', 'tea', 'juice', 'water', 'milk']••

{{s1.p18}}
^^^

___________________________________________________________________

### splice

{{s1.p19}}
{{s1.p20}}
{{s1.p21}}
{{s1.p22}}

^^^[splice()]

{{s1.p23}}

![ico-25 cap] ** 1**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 1, '*'))
~~~

^^{{common.c50}}^^

••[1, 2, '*', 4, 5]••

{{s1.p25}}
{{s1.p26}}

_____________________________________

![ico-25 cap] ** 2**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 2, '*', '#', '$', '%'))
~~~

^^{{common.c50}}^^


••[1, 2, '*', '#', '$', '%', 5]••


^^{{common.c51}}^^
{{s1.p29}}

______________________________________

![ico-25 cap] ** 3**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 2, [7, 8, 9]))
~~~

{{s1.p30}}

••[1, 2, Array(3), 5]••


^^{{common.c51}}^^

{{s1.p32}}

__________________________________________________

![ico-25 cap] ** 4**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 0, 'Новый элемент'))
~~~

{{s1.p33}}

{{s1.p34}}

{{s1.p35}}

{{s1.p36}}

^^^

____________________________________________________________________

### slice

{{s1.p37}}
{{s1.p38}}
{{s1.p39}}
{{s1.p40}}
{{s1.p41}}
{{s1.p42}}

^^^[slice()]

![ico-25 cap] ** 1**

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(1, 2) // ['two']
~~~

![ico-25 cap] ** 2**

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(1, -2) // ['two', 'three']
~~~

![ico-25 cap] ** 3**

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(-2) // ['four', 'five']
~~~

![ico-25 cap] ** 4**

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(-4, -2) // ['two', 'three']
~~~

![ico-25 cap] ** 5**

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(-8, 25) // ['one', 'two', 'three', 'four', 'five']
~~~

![ico-25 cap] ** 6**

~~~js
var array = ['one', 'two', 'three', 'four', 'five']
var result = array.slice(4, 3) // []
~~~

^^^

_____________________________________________________________________

### concat

{{s1.p43}}
{{s1.p44}}
{{s1.p45}}

^^^[concat()]

![ico-25 cap] ** 1**

~~~js
var first = ['one', 'two', 'three']
var second = ['four', 'five']
var result = first.concat(second)
~~~

^^**result**:^^
••['one', 'two', 'three', 'four', 'five']••

![ico-25 cap] ** 1**

~~~js
var numbers = [1, 2, 3, 4]
var additional = [7, 8, 9]
var result = [11, 0, 5]

result = result.concat(numbers, additional)
~~~

^^**result**:^^
••► (10) [11, 0, 5, 1, 2, 3, 4, 7, 8, 9]••

^^^

____________________________________________________________________________

### join

{{s1.p46}}
{{s1.p47}}

^^^[join()]

![ico-25 cap] ** 1**

~~~js
var drinks = ['coffee', 'tea', 'juice', 'water', 'milk']
var menu = drinks.join(' | ')
~~~

^^**menu**:^^

••'coffee | tea | juice | water | milk'••

^^^

_____________________________________________________________

### includes

**ES 2016**

{{s1.p48}}

^^^[includes()]

![ico-25 cap] ** 1**

~~~js
var users = ['Ivan', 'George', 'Stephan']

users.includes('Stephan')  // true
users.includes('Mary')     // false
~~~

_______________________________________________________________

![ico-25 cap] ** 2**

{{s1.p49}}

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

![ico-25 cap] ** 3**

~~~js
var points = [[100, 20], [200, 150], [120, 50]]

points.includes([100, 20])   // false
~~~

^^^

_____________________________________________________________________

{{s1.p50}}
