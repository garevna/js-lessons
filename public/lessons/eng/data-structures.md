# ![ico-35 study] Data Structures

Generally speaking, now we are going to study **reference data type**.
Let's try to understand what it is.

Firstly, when we talk about any **data structures**, we mean some set of data collected under one name.
For example, a list of students in a group or a list of students in a class is a data structure because it contains dozens of string values (variables of type ‘string’).
However, if you ask for a list of students in a group, you won't enumerate the contents of the list, especially since you may not know it. You would name the cipher of the group.
This is how you get a data structure.
The name is one, and there can be a lot of data stored under that name.

Why are these data of **reference data type**?

Because if you pass the name of a data structure, you do not pass its contents.
You are only passing a **reference** to the data structure.

If we pass this reference from one variable to another, we are not passing a group, but a **reference** to it.

For example, you have some data structure (such as a list of students in a group), a reference to which is stored in the variable **~group~**.

After performing the assignment:

~~~js
var students = group
~~~

variable **~students~** will contain a reference to the same data structure.
No new data structure is created, only the **reference** is passed.

@@@@
![](illustrations/reference-is-a-lockpick-eng.svg)
<br>If you have a reference to a data structure, you access the contents of that data structure by reference.<br>
@@@@

Let's take a closer look at data structures in JS. At least two of them - arrays and objects.
They differ in the way of organising access to data structure elements.
In arrays, the elements are strictly arranged in order, and they are accessed by their sequence number inside the collection.
In objects, there is no strict ordering, and instead of a sequence number, the elements of such a collection (structure) have unique identifiers by which we can find them in the collection.

_________________________________________________

## ![ico-30 icon] Arrays

**data type: ~object~**

• An array is an ordered set of variables.
• Each variable is called an **array element**.
• Array elements have an ordinal number (**_index_** of the array element).

![ico-20 warn] The indexing of array elements starts from zero, i.e. the first array element will have index ~ 0~.

Declaring an array is very simple:

~~~js
var array = [3.14, false, 'mother', null, undefined]
~~~

What you see on the right side of the assignment statement is an **expression**.
Before performing an assignment, the engine always evaluates the expression on the right side of the assignment operator.
And on the right side of the assignment operator, the engine sees square brackets with a comma enumeration of the values inside the square brackets.
The engine understands that we want to create an array and creates an array (or rather, it calls a special constructor for this purpose, but we'll talk about that later).
We will never know where the engine placed the created data structure (array), because it only returned a **reference** to the array.
It is this reference that is placed in the **~array~** variable.
![ico-25 warn] Not an array, but a **reference** to an array.

Now the contents of the array can be accessed as follows:

~~~js
array[2]
~~~

i.e. we use the array name, followed by the **index** of the element in square brackets.
The index is an ordinal number starting from zero:

| 0    | 1     | 2        | 3    | 4         |
| 3.14 | false | 'mother' | null | undefined |

As a result, we get the value of the array element:

~~~console
'mother'
~~~

We have more than read-only access to the array elements.
The following assignment will change the value of the last array element:

~~~js
array[4] = 'father'
~~~

After this assignment, our array will be like this:

~~~console
► (5) [3.14, false, 'mother', null, 'father']
~~~

___________________________________

If we now perform the following assignment:

~~~js
var collection = array
~~~

then the variable **~collection~~** will contain a reference to the same array.

Shall we check?

Let's change an element of the array **~collection~~**:

~~~js
collection[3] = 'brother'
~~~

and look at the array **~array~**:

~~~js
array
~~~

~~~console
► (5) [3.14, false, 'mother', 'brother', 'father']
~~~

As you can see, the changes we made (by reference!) to the **~collection~** array are reflected in the **~array~** array.
This is because both the **~collection~** variable and the **~array~** variable are **references to the same array**.

### ![ico-25 icon] length

Arrays, like strings, have a property **~length~** (the length of the array, or the number of array elements).

This property can be accessed in **dot notation** (with a dot after the array name):

~~~js
collection.length
~~~

~~~console
5
~~~

_________________________________________

### ![ico-25 hw] Tests

◘◘![ico-20 hw] 1◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
~~~

→→→ students[1] | 'Piter', 'Madelin', 'Gregory', null, undefinded | Madelin →→→

◘◘![ico-20 hw] 2◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
~~~

→→→ students[3] | 'Piter', 'Madelin', 'Gregory', null, undefinded | undefinded →→→

◘◘![ico-20 hw] 3◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = students
group[3] = 'Frodo'
~~~

→→→ students[3] | 'Piter', 'Madelin', 'Gregory', 'Frodo', null, undefinded | Frodo →→→

◘◘![ico-20 hw] 4◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = []
group[3] = students[0]
~~~

→→→ group.length | 0, 1, 2, 3, 4, undefinded | 4 →→→

◘◘![ico-20 hw] 5◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = []
group[0] = students
~~~

→→→ group.length | 0, 1, 2, 3 | 1→→→

◘◘![ico-20 hw] 6◘◘

~~~js
var  students = ['Frodo', 'Stephan', 'Madelin', 'Helen']
var hello = 'Hi ' + students[1] + '!'
~~~

→→→ hello | 'Hi !', 'Hi Frodo!', 'Hi Stephan!', 'Hi Madelin!', 'Hi Helen!' | Hi Stephan!→→→

_____________________________________________________________

## ![ico-25 icon] Objects

**data type: ~object~**

If we created arrays using square brackets, we will use curly braces ~{}~ to create objects.
We listed the contents of the array inside the square brackets using commas.
The indexes of the elements in the array were determined automatically based on the order in which they were listed.
The contents of the object will also be listed in commas, but there is a nuance: **object is not an ordered set of elements**.
The data that will be stored in the object will not have indexes, and instead of indexes we will use keys, i.e. text strings (type ‘string’).
And while we called the data in the array **array elements**, we will call the data in the object **object properties**.
Each property of an object has a **name** and a **value**.

This is how an **~human~** object with three properties is defined: **~name~**, **~age~**, and **~employed~**:

◘◘![ico-25 cap] 5◘◘

~~~js
var human = {
  name: 'Frodo',
  age: 35,
  employed: true
}
~~~

For the engine to understand you correctly, the enumerated properties of an object inside curly braces must be the expression ~name: value~.

The property name is the **key** to access the value of the property, just as the index of an array element is the key to access an array element.
We can use **dot notation** to access the properties of an object:

~~~js
human.name
~~~

~~~console
'Frodo'
~~~

However, you can also use square brackets notation like arrays, only instead of integer indices inside square brackets you specify keys, i.e. strings:

~~~js
human['name']
~~~

~~~console
'Frodo'
~~~

Why is this notation more convenient than dot notation?

Suppose that the key name is in a variable:

~~~js
var propName = 'name'
~~~

Then we can retrieve the value of the object property by the key stored in the **~propName~** variable:

~~~js
human[propName]
~~~

~~~console
'Frodo'
~~~

We can add properties to an object quite easily by ordinary assignment:

~~~js
human.hobby = ['sport', 'reading']
~~~

After this assignment, the **~human~** object will look like this in the console:

~~~console
▼ {name: 'Frodo', age: 35, employed: true, hobby: Array(2)}
    age: 35
    employed: true
    hobby: (2) ['sport', 'reading']
    name: "Frodo"
  ► [[Prototype]]: Object
~~~

Later, you and I will find out what it is about the property ~[[[Prototype]]: Object~, which you and I did not add to the object, but which will be present in any object.

To remove properties, you must use the **~delete~** operator:

~~~js
delete human.hobby
~~~

This operator applies only to object properties, and returns the boolean value ~true~ or ~false~ depending on whether deletion has occurred or not.

________________________________________________________

### ![ico-25 hw] Tests

◘◘![ico-20 hw] 1◘◘

~~~js
var memo = [1, false, 4.8, 'Google', [0, 1]]
~~~

→→→ typeof memo[4] | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 2◘◘

~~~js
var memo = [1, false, 4.8, 'Google', { name: 'Figaro' }]
~~~

→→→ typeof memo[4] | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 3◘◘

~~~js
var memo = [1, false, 4.8, 'Google', { name: 'Figaro' }]
~~~

→→→ typeof memo[4].name | 'string', 'number', 'boolean', 'object', undefinded | string →→→

◘◘![ico-20 hw] 4◘◘

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ typeof list | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 5◘◘

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ typeof list[0] | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 5◘◘

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ typeof list[0].name | 'string', 'number', 'boolean', 'object', undefinded | string →→→

◘◘![ico-20 hw] 6◘◘

~~~js
var  students = {
  group: 'Dev-05',
  course: 'Programming',
  names: [
    'Piter Clark',
    'Helen Surmot',
    'Pavel Farios',
    'Alex Figa',
    'Gregory Trump'
  ]
}
~~~

→→→ students.group | 'Dev-05', 'Programming', 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | Dev-05 →→→

◘◘![ico-20 hw] 7◘◘

~~~js
var  students = {
  group: 'Dev-05',
  course: 'Programming',
  names: [
    'Piter Clark',
    'Helen Surmot',
    'Pavel Farios',
    'Alex Figa',
    'Gregory Trump'
  ]
}
~~~

→→→ students[1] | 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | undefinded →→→

◘◘![ico-20 hw] 8◘◘

~~~js
var  students = {
  group: 'Dev-05',
  course: 'Programming',
  names: [
    'Piter Clark',
    'Helen Surmot',
    'Pavel Farios',
    'Alex Figa',
    'Gregory Trump'
  ]
}
~~~

→→→ students.names[1] | 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | Helen Surmot →→→

◘◘![ico-20 hw] 9◘◘

~~~js
var  students = [
  {
    name: 'Piter Clark',
    homeworks: [10, 7, 8, 5, 9, 6, 4, 8, 7]
  },
  {
    name: 'Helen Surmot',
    homeworks: [5, 4, 7, 6, 8, 7, 7, 6, 8]
  },
  {
    name: 'Pavel Farios',
    homeworks: [9, 8, 9, 10, 7, 7, 8, 6, 8]
  },
  {
    name: 'Alex Figa',
    homeworks: [4, 5, 4, 6, 7, 5, 6, 7, 8]
  },
  {
    name: 'Gregory Trump',
    homeworks: [3, 5, 4, 6, 5, 7, 6, 6, 7]
  }
]
~~~

→→→ students[4].name | 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | Gregory Trump →→→

◘◘![ico-20 hw] 10◘◘

~~~js
var  students = [
  {
    name: 'Piter Clark',
    homeworks: [10, 7, 8, 5, 9, 6, 4, 8, 7]
  },
  {
    name: 'Helen Surmot',
    homeworks: [5, 4, 7, 6, 8, 7, 7, 6, 8]
  },
  {
    name: 'Pavel Farios',
    homeworks: [9, 8, 9, 10, 7, 7, 8, 6, 8]
  },
  {
    name: 'Alex Figa',
    homeworks: [4, 5, 4, 6, 7, 5, 6, 7, 8]
  },
  {
    name: 'Gregory Trump',
    homeworks: [3, 5, 4, 6, 5, 7, 6, 6, 7]
  }
]
~~~

→→→ students[4].homeworks[1] | 7, 10, 8, 4, 5, 9, undefinded | 5 →→→

________________________________________________________

[![ico-20 link] MDN](external/mdn-data-structures)
