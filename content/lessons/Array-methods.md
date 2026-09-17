# ![ico-30 study] {{p1}}

______________________________________________________

### push

{{p2}}
{{p3}}
{{p4}}

^^^[push()]

![ico-25 cap] ** 1**

~~~js
var array = ['Nail', 'Bicycle', 'Processor', 'Disk']
var length = array.push('Program')
~~~

{{p5}}

••['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']••


{{p6}}

^^^

____________________________________________________________________

### pop

^^^[pop()]

{{p7}}

{{p8}}

![ico-25 cap] ** 1**

~~~js
var array = ['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']
var elem = array.pop()
~~~

{{p9}}

••['Nail', 'Bicycle', 'Processor', 'Disk']••

{{p10}}
^^^

_________________________________________________________________________

### shift

{{p11}}
{{p12}}

^^^[shift()]

![ico-25 cap] ** 1**

^^{{common.c15}}^^

~~~js
var arrayOfThings = ['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']
console.log(arrayOfThings.shift())
~~~

{{p13}}

{{p14}}

••['Bicycle', 'Processor', 'Disk', 'Program']••

^^^

______________________________________________________

### unshift

{{p15}}
{{p16}}

^^^[unshift()]

![ico-25 cap] ** 1**

~~~js
var drinks = ['coffee', 'tea', 'juice', 'water', 'milk']
var len = drinks.unshift('beer')
~~~

{{p17}}

••['beer', 'coffee', 'tea', 'juice', 'water', 'milk']••

{{p18}}
^^^

___________________________________________________________________

### splice

{{p19}}
{{p20}}
{{p21}}
{{p22}}

^^^[splice()]

{{p23}}

![ico-25 cap] ** 1**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 1, '*'))
~~~

{{p24}}

••[1, 2, '*', 4, 5]••

{{p25}}
{{p26}}

_____________________________________

![ico-25 cap] ** 2**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 2, '*', '#', '$', '%'))
~~~

{{p27}}


••[1, 2, '*', '#', '$', '%', 5]••


{{p28}}
{{p29}}

______________________________________

![ico-25 cap] ** 3**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 2, [7, 8, 9]))
~~~

{{p30}}

••[1, 2, Array(3), 5]••


{{p31}}

{{p32}}

__________________________________________________

![ico-25 cap] ** 4**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 0, 'Новый элемент'))
~~~

{{p33}}

{{p34}}

{{p35}}

{{p36}}

^^^

____________________________________________________________________

### slice

{{p37}}
{{p38}}
{{p39}}
{{p40}}
{{p41}}
{{p42}}

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

{{p43}}
{{p44}}
{{p45}}

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

{{p46}}
{{p47}}

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

{{p48}}

^^^[includes()]

![ico-25 cap] ** 1**

~~~js
var users = ['Ivan', 'George', 'Stephan']

users.includes('Stephan')  // true
users.includes('Mary')     // false
~~~

_______________________________________________________________

![ico-25 cap] ** 2**

{{p49}}

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

※※※tests ⟦f10⟧※※※
