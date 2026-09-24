## ![ico-25 icon] The length property⟪The_length_property⟫

Arrays and strings have a **~length~** property. This property indicates the length of an array or string, i.e. the number of elements in the array or the number of characters in the string.

~~~js
[5, 8, 7, 4, 1, 0].length  // 6
'Hi, students!'.length  // 13
~~~

~~~js
var names = ['John', 'Henry', 'Piter']
names.length  // 3
~~~

~~~js
var userName = 'Gregory'
userName.length // 7
~~~

This property plays a key role in **iterating** over arrays and strings, which we will explore in more detail when we study **loops**.

Arrays and strings are the simplest examples of **~iterable objects~**, i.e. data structures for which an iteration protocol exists.

••Take, for example, the pupils in a class. In the teacher’s register, they are usually listed in alphabetical order. When the teacher takes the register, they are effectively **iterating** through the array of pupils, and this process takes place strictly in the order in which the pupils’ surnames appear in the register.••

For the two simplest iterable objects (arrays and strings), the iteration protocol is very simple: the elements of an array are traversed strictly in accordance with their indices in ascending order. The characters in a string are also strictly ordered, and any character can be retrieved from the string by its index, just like an array element.

~~~js
'Arrays'[5] // 's'
~~~

~~~js
var userName = 'Gregory'
userName[4] // 'o'
~~~

You might well ask: why do we need this property if we can already see that the array contains 3 elements?

However, whilst an application is running, arrays may, firstly, be very large (containing a huge number of elements), and **dynamic** (i.e. the number of elements in the array may change over time). In the case of dynamic arrays, the value of the **~length~** property will be automatically updated, affecting the iteration process.

••Let’s return to our example with the class. Suppose a group of schoolchildren have been taken on a trip to a museum. At the museum entrance, a strict lady checks the length of the list of pupils who are to be admitted and counts those who have actually turned up at the museum. If the number of those present is greater than the number on the list, it is unlikely that the ticket inspector will let in those who are not on the list.••

____________________________

![ico-30 hw] **Exercises**

◘◘**1**◘◘

~~~js
var numbers = [5, 8, 11, 7]
~~~

→→→ people.length | 3, 4, 5 | 4 →→→

◘◘**2**◘◘

~~~js
var items = [null, undifined, '*', false, true]
~~~

→→→ people.length | 3, 4, 5 | 5 →→→

◘◘**3**◘◘

~~~js
var userName = 'Robert'
~~~

→→→ userName[2] | 'R', 'o', 'b', 'e', 'r', 't' | b →→→

◘◘**4**◘◘

→→→ userName.length | 4, 5, 6, 7, 8 | 6 →→→
