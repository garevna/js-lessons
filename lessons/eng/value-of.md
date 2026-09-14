# ![ico-30 study] valueOf

The method  **_~valueOf()~_**  is inherited by all objects from **~Object~**

This method is called automatically when the primitive value of an object needs to be returned

For example, if an object is compared with a number

~~~js
var obj = {
  num: 5,
  val: 10,
  x: 11,
  valueOf: function () {
    return this.num + this.val - this.x
  }
}
~~~

If we now perform the comparison:

~~~js
obj == 4
~~~

we will obtain  _~true~_

When the comparison is performed, the primitive value of the object will be computed, i.e. the method **~valueOf()~** will be called

If the primitive value of the object cannot be computed, the object itself will be returned

**~valueOf ()~** – the **_inherited_** method of any object

But this does not mean that we cannot override it

◘◘![ico-25 cap] ** 1 **◘◘

~~~js
var human = {
  name: 'Ivan',
  age: 25,
  valueOf: function () {
    return this.name + ': ' + this.age
  }
}

console.info(human + '!') // Ivan: 25!
~~~

___________________

Of course, you shouldn’t do this, but it’s still interesting ![ico-20 smile]

As a result of executing the following code:


◘◘![ico-25 cap] ** 2 **◘◘


~~~js
Object.prototype.valueOf = function () {
  return 'Это объект, блин, а не игрушка!'
}
~~~

all native JS objects will ‘throw an error’ accordingly when attempting to retrieve their primitive value

~~~js
console.info(Number + '')
~~~

~~~console
Это объект, блин, а не игрушка!
~~~

__________

◘◘![ico-25 cap] ** 3 **◘◘

~~~js
const test = {
  num: 0,
  valueOf: function () {
    return this.num += 1
  }
}
~~~

![ico-25 question] What will the expression return:

~~~js
test == 1 && test == 2 && test == 3
~~~

____________________

[![ico-30 hw] **Tests**](https://garevna.github.io/js-quiz/#valueOf)
