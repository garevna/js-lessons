# ![ico-30 study] Methods

A **method** is a property-function

In the following example, the object **obj** has two properties: **name** and **showMessage**

~~~js
var obj = {
  name: 'Иван',
  showMessage: function (message) {
    console.log(message ? message : 'Привет!')
  }
}
~~~

~~~js
typeof obj.name         // "string"
typeof obj.showMessage  // "function"
~~~

Accessing any property: ~имя объекта~ + ~.~ + ~имя свойства~

The only difference with methods is that to call a method, you need to use round brackets after its name, and if the method has formal parameters, you must list the arguments within the round brackets (input data)

~~~js
obj.showMessage('Я иду в магазин')
~~~

^^As a result of this call, the console will display  “I’m going to the shop”^^

Thus, calling a method differs from calling a regular function only in that the method name must be preceded by the name of the “owner”, separated from the method name by a full stop

All functions (and all variables) in _JS_ have an ‘owner’

Therefore, all functions in _JS_ are methods

and all variables are properties

For ordinary functions (and variables), the owner is the global object (~window~)

Anything that is not ‘privately owned’ belongs to it

If the ‘owner’ is not specified when accessing a property or calling a method, then that owner is the global object

~~~js
var year = 2019
window.year       //  вернет 2019
~~~

_________________________________________________________

### ![ico-20 file] The charCodeAt() method

The ~charCodeAt()~ method only works with strings

Т.е. любая строка является "хозяином" метода ~charCodeAt()~

This method returns the numeric code of the character at the specified position in the string

The position number of the character in the string is passed to the method as a parameter

◘◘![ico-25 cap] ** 1**◘◘

~~~js
var userName = 'Василий Алибабаевич',
userName.charCodeAt(4)                 // 1083
~~~

^^**1083** is the decimal code for the character *‘л’* – the fourth character from the start of the string ^^
^^(character numbering starts from zero)^^

_________________________________________________________________________

[![ico-20 link] w3schools](https://www.w3schools.com/jsref/jsref_charCodeAt.asp)
[![ico-20 link] Коды символов](https://www.ascii.cl/htmlcodes.htm)

___________________________________________________________________________

### ![ico-20 file] The push() method

Метод  ~push ()~  работает только с массивами

Т.е. любой массив является "хозяином" метода ~push()~

This method adds a new element to the end of the array

The new element is passed to the method as a parameter

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var users = ['John', 'Helen', 'Mary']
users.push('Henry')
~~~

The element  *‘Henry’* will be added to the end of the **users** array

В результате массив **users** будет:  ~["Jon", "Helen", "Mary", "Henry"]~

![ico-20 warn] Метод ~push ()~ возвращает новую длину массива

That is, after the operation has been carried out:

~~~js
z = users.push('Henry')
~~~

the value of the variable ** z ** will be 4

______________________________

※※※exercises https://docs.google.com/forms/d/e/1FAIpQLSfhSiifjcwm7tLhcQftjAXByl-O93y3o31i91wAMr-uvi-MzQ/viewform※※※

_________________________________________________________________

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_push.asp)
