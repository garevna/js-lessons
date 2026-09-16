# ![ico-30 study] Array methods

______________________________________________________

### push

This method adds a new element to the end of the array.
The argument passed to the method when it is called is the element to be added.
The method returns the new length of the array.

^^^[push()]

![ico-25 cap] ** 1**

~~~js
var array = ['Nail', 'Bicycle', 'Processor', 'Disk']
var length = array.push('Program')
~~~

^^After executing this code, the **array** will contain the following elements:^^

••['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']••


^^and the value of the variable **~length~** will be 5^^

^^^

____________________________________________________________________

### pop

^^^[pop()]

This method removes the last element of the array and returns the removed element

The method has no parameters (arguments).

![ico-25 cap] ** 1**

~~~js
var array = ['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']
var elem = array.pop()
~~~

^^After executing this code, the **array** will contain:^^

••['Nail', 'Bicycle', 'Processor', 'Disk']••

^^and the value of the variable  ~elem~  will be  “Program”^^
^^^

_________________________________________________________________________

### shift

This method removes the first element from the array.
The return value is the removed element.

^^^[shift()]

![ico-25 cap] ** 1**

^^For example, as a result of executing the following code:^^

~~~js
var arrayOfThings = ['Nail', 'Bicycle', 'Processor', 'Disk', 'Program']
console.log(arrayOfThings.shift())
~~~

^^The console will display:  _Nail_^^

^^and the array **arrayOfThings** will contain the following values:^^

••['Bicycle', 'Processor', 'Disk', 'Program']••

^^^

______________________________________________________

### unshift

This method adds a new element to the beginning of the array.
The return value is the new length of the array.

^^^[unshift()]

![ico-25 cap] ** 1**

~~~js
var drinks = ['coffee', 'tea', 'juice', 'water', 'milk']
var len = drinks.unshift('beer')
~~~

^^As a result, the array **drinks** will contain the following elements:^^

••['beer', 'coffee', 'tea', 'juice', 'water', 'milk']••

^^and the variable ~len~ will take the value 6^^
^^^

___________________________________________________________________

### splice

The first argument (a number) specifies the position (index) where the new elements will be inserted.
The second argument (a number) specifies how many elements (starting from the insertion position) should be removed from the array.
The third (fourth, fifth, etc.) arguments are the elements to be inserted into the array.
The method returns the removed elements of the array (an array).

^^^[splice()]

Using the ~splice()~ method, you can replace elements in the array:

![ico-25 cap] ** 1**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 1, '*'))
~~~

^^As a result, the **myArray** array will be:^^

••[1, 2, '*', 4, 5]••

^^and the following will be printed to the console: ~[3]~^^
^^(an array of elements that have been replaced with “*”)^^

_____________________________________

![ico-25 cap] ** 2**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 2, '*', '#', '$', '%'))
~~~

^^As a result, the array **myArray** will be:^^


••[1, 2, '*', '#', '$', '%', 5]••


^^and the following will be printed to the console: ~[3, 4]~^^
^^(elements that have been replaced with “*”, “#”, “$”, “%”)^^

______________________________________

![ico-25 cap] ** 3**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 2, [7, 8, 9]))
~~~

^^As a result, the array **myArray** will consist of four elements:^^

••[1, 2, Array(3), 5]••


^^and the following will be printed to the console: ~[3, 4]~^^

^^(elements that have been replaced by the array [7, 8, 9])^^

__________________________________________________

![ico-25 cap] ** 4**

~~~js
var myArray = [1, 2, 3, 4, 5]
console.log(myArray.splice(2, 0, 'Новый элемент'))
~~~

^^As a result, the array **myArray** will consist of four elements:^^

••[1, 2, 'Новый элемент', 3, 4, 5]••

^^and an empty array will be printed to the console: ~[]~^^

^^(no elements were removed from the array, as the second argument of the method is zero)^^

^^^

____________________________________________________________________

### slice

The method creates a new array containing a substring of the original array.
The original array remains unchanged.
The return value is the new array, which is a segment of the original array.
The first argument (a number) is the index of the element in the original array at which the segment begins.
The second argument (a number) is the index of the element in the source array up to which the fragment extends.
If the second argument is omitted, the segment will extend to the end of the source array.

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

The method merges two or more arrays into a single array.
The return value is a new array.
The source arrays remain unchanged.

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

Concatenates all elements of the array into a string.
The argument is the delimiter character.

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

The method **~includes()~** returns ~true~ if the value passed as an argument is contained in the array, or ~false~ otherwise.

^^^[includes()]

![ico-25 cap] ** 1**

~~~js
var users = ['Ivan', 'George', 'Stephan']

users.includes('Stephan')  // true
users.includes('Mary')     // false
~~~

_______________________________________________________________

![ico-25 cap] ** 2**

![ico-20 warn] If the array elements are objects, the method will not work, as arrays and objects are reference data types.

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

※※※tests quiz/arrayMethods※※※
